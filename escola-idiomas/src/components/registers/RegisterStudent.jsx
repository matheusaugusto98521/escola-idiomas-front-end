import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useClasses from "../../hooks/class/GetClasses";
import '../../styles/formStyles.css';
import Header from "../Header";

function RegisterStudent() {
    const API_URL = 'http://localhost:8080/student/register?idClass=';
    const { classes, error: errorClasses } = useClasses();
    const [idClass, setIdClass] = useState('');
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        id: '',
        name: '',
        birthDate: '',
        address: '',
        cpf: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleSetIdClassChange = (e) => {
        setIdClass(e.target.value);
    };

    const handleRegisterStudent = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API_URL + idClass, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(student)
            });

            if (response.ok) {
                const data = response.json();
                setStudent({
                    id: '',
                    name: '',
                    birthDate: '',
                    address: '',
                    cpf: ''
                });
                console.log("Aluno criado: ", data);
                navigate('/student/');
            } else {
                console.log("Erro ao criar aluno: ", response.status);
            }
        } catch (error) {
            console.log("Erro ao criar aluno: ", error);
        }
    };

    return (
        <>
            <Header />
            <div className="form-container">
                <h1>Cadastro de Aluno</h1>
                <form onSubmit={handleRegisterStudent}>
                    <label htmlFor="name">Nome: </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={student.name}
                        onChange={handleChange}
                    />

                    <label htmlFor="birthDate">Data de nascimento: </label>
                    <input
                        type="text"
                        name="birthDate"
                        id="birthDate"
                        value={student.birthDate}
                        onChange={handleChange}
                    />

                    <label htmlFor="address">Endereço: </label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        value={student.address}
                        onChange={handleChange}
                    />

                    <label htmlFor="cpf">CPF: </label>
                    <input
                        type="text"
                        name="cpf"
                        id="cpf"
                        value={student.cpf}
                        onChange={handleChange}
                    />


                    <select
                        name="classes"
                        id="classes"
                        value={idClass}
                        onChange={handleSetIdClassChange}
                    >
                        <option value="">Selecione a turma</option>
                        {classes.length > 0 ? (
                            classes.map(classStudent => (
                                <option key={classStudent.id} value={classStudent.id}>
                                    {classStudent.description}
                                </option>
                            ))
                        ) : (
                            <option disabled>Carregando turmas....</option>
                        )}
                    </select>

                    <button type="submit">Cadastrar</button>
                </form>

                {errorClasses && <p className="error-message">{errorClasses}</p>}
            </div>
        </>
    );
}

export default RegisterStudent;