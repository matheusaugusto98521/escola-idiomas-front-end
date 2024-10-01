import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStudents from "../hooks/student/GetStudents";
import '../styles/styles.css';
import { deleteStudent, getStudentById, updateStudent } from "../utils/StudentMethods";
import ButtonCloseModal from "./ButtonCloseModal";
import Header from "./Header";
import Modal from "./modal";

function Student() {
    const { students, error, fetchStudents } = useStudents();
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
        if (idStudent) {
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

    const handleDelete = async (idStudent) => {
        try {
            await deleteStudent({ idStudent });
            await fetchStudents();
        } catch (error) {
            console.error("Erro ao deletar o estudante", error);
        }
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

    const handleUpdateStudent = async (e) => {
        e.preventDefault();
        try {
            const response = await updateStudent({ idStudent: idStudent, updatedData: student });
            console.log('Feito: ', response);
            await fetchStudents();
            handleChangeModal();
        } catch (error) {
            alert('Erro ao atualizar aluno: ', error.message);
        }
    }
    return (
        <>
            <Header button={<button onClick={handleCreate}>Cadastrar novo aluno</button>} />
            <div className="container">

                <div className="list">
                    <h2>Alunos cadastrados:</h2>
                    <ul>
                        {students.length > 0 ? students.map(student => (
                            <li key={student.id} className="item">
                                <div className="card">
                                    <strong>Nome:</strong> {student.name} <br />
                                    <strong>CPF:</strong> {student.cpf} <br />
                                    <strong>Endereço:</strong> {student.address} <br />
                                    <strong>Data de Nascimento:</strong> {student.birthDate} <br />
                                    <strong>Idade:</strong> {student.age} anos
                                </div>
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
                {isModalUpdateOpen && <Modal>
                    <ButtonCloseModal funcClick={closeModal} />
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
                </Modal>
                }
            </div>
        </>
    );
};

export default Student;
