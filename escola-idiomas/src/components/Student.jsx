import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStudents from "../hooks/student/GetStudents";
import '../styles/styles.css';
import { deleteStudent, getStudentById, updateStudent } from "../utils/StudentMethods";
import ButtonCloseModal from "./ButtonCloseModal";
import Header from "./Header";

function Student(){
    const {students, error, fetchStudents} = useStudents();
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [idStudent, setIdStudent] = useState('');
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        id: '',
        name: '',
        birthDate: '',
        address: '',
        cpf: ''
    });

    useEffect(() => {
        if(idStudent){
            getStudentById({ idStudent }).then(response => {
                setStudent(response);
            });
        }
    }, [idStudent]);

    const handleCreate = () => {
        navigate('/student/register');
    }
    const handleChangeModal = () => {
        setIsModalUpdateOpen(!isModalUpdateOpen);
    }

    const closeModal = () => {
        setIsModalUpdateOpen(!isModalUpdateOpen);
    }

    const handleDelete = (idStudent) => {
        deleteStudent({ idStudent });
        fetchStudents();
    }

    const handleUpdate = (idStudent) => {
        handleChangeModal();
        setIdStudent(idStudent);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdateStudent = (e) => {
        e.preventDefault();
        try {
            const response = updateStudent({idStudent: idStudent, updatedData: student});
            console.log('Feito: ' ,response);
            alert('Aluno alterado com sucesso!');
            fetchStudents();
            handleChangeModal();
        } catch (error) {
            alert('Erro ao atualizar aluno: ', error.message);
        }
    }
    return(
        <>
            <Header button={<button onClick={handleCreate}>Cadastrar novo aluno</button>}/>
            <div className="container">

                <div className="list">
                    <h2>Alunos cadastrados:</h2>
                    <ul>
                        {students.length > 0 ? students.map(student => (
                            <li key={student.id} className="item">
                                {student.name} - {student.cpf}
                                <span className="actions">
                                    <button className="btn-delete" onClick={() => handleDelete(student.id)}>Apagar</button>
                                    <button className="btn-update" onClick={() => handleUpdate(student.id)}>Alterar</button>
                                </span>
                            </li>
                        )) : (
                            <h3>Nenhum aluno encontrado</h3>
                        )}
                    </ul>

                    {error && <p className="error-message">{error.message}</p>}
                </div>

                {isModalUpdateOpen && (
                    <div className="modal">
                        <div className="modal-content">
                        <ButtonCloseModal funcClick={closeModal}/>
                            <h3>Alterar informações do aluno</h3>
                            <form onSubmit={handleUpdateStudent}>
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

                                <button className="btn-submit" type="submit">Alterar informações</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Student;
