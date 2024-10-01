import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTeachers from "../hooks/teacher/GetTeachers";
import { deleteTeacher, getTeacherById, updateTeacher } from "../utils/teacher/TeacherMethods";
import ButtonCloseModal from "./ButtonCloseModal";
import Header from "./Header";
import Modal from "./modal";

function Teacher() {
    const navigate = useNavigate();
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [idTeacher, setIdTeacher] = useState('');
    const { teachers, error, fetchTeachers } = useTeachers();
    const [teacher, setTeacher] = useState({
        id: '',
        name: '',
        cpf: '',
        birthDate: '',
        degree: ''
    });

    useEffect(() => {
        if (idTeacher) {
            getTeacherById({ idTeacher: idTeacher }).then(response => {
                setTeacher(response);
            });
        }


    }, [idTeacher]);


    const handleCreate = () => {
        navigate('/teacher/register');
    };

    const handleDelete = async (idTeacher) => {
        try {
            await deleteTeacher({ idTeacher: idTeacher });
            await fetchTeachers();
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangeModal = () => {
        setIsModalUpdateOpen(!isModalUpdateOpen);
    };

    const closeModal = () => {
        setIsModalUpdateOpen(!isModalUpdateOpen);
    }

    const handleUpdate = (idTeacher) => {
        handleChangeModal();
        setIdTeacher(idTeacher);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeacher(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdateTeacher = async (e) => {
        e.preventDefault();
        try {
            const response = await updateTeacher({ idTeacher: idTeacher, updatedData: teacher });
            console.log('Feito: ', response);
            await fetchTeachers();
            setIsModalUpdateOpen(false);
        } catch (error) {
            alert('Erro ao atualizar curso: ', error.message);
        }
    };

    return (
        <>
            <Header button={<button className="btn-add" onClick={() => handleCreate()}>Cadastrar novo professor</button>} />
            <div className="container">
                <div className="list">
                    <h2>Professores cadastrados:</h2>
                    <ul>
                        {teachers.length > 0 ? teachers.map(teacher => (
                            <li key={teacher.id} className="item">
                                <div className="card">
                                    <strong>Nome:</strong> {teacher.name} <br />
                                    <strong>CPF:</strong> {teacher.cpf} <br />
                                    <strong>Formação:</strong> {teacher.degree}
                                </div>

                                <span className="actions">
                                    <button className="btn-delete" onClick={() => handleDelete(teacher.id)}>Apagar</button>
                                    <button className="btn-update" onClick={() => handleUpdate(teacher.id)}>Alterar</button>
                                </span>
                            </li>
                        )) : (
                            <h3>Nenhum professor encontrado</h3>
                        )}
                    </ul>

                    {error && <p className="error-message">{error.message}</p>}
                </div>

                {isModalUpdateOpen && <Modal>
                    <ButtonCloseModal funcClick={closeModal} />
                    <h3>Alterar informações do professor</h3>
                    <form onSubmit={handleUpdateTeacher}>
                        <label htmlFor="name">Nome: </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={teacher.name}
                            onChange={handleChange}
                        />

                        <label htmlFor="cpf">CPF: </label>
                        <input
                            type="text"
                            name="cpf"
                            id="cpf"
                            value={teacher.cpf}
                            onChange={handleChange}
                        />

                        <label htmlFor="birthDate">Data de nascimento: </label>
                        <input
                            type="text"
                            name="birthDate"
                            id="birthDate"
                            value={teacher.birthDate}
                            onChange={handleChange}
                        />

                        <label htmlFor="degree">Formação: </label>
                        <input
                            type="text"
                            name="degree"
                            id="degree"
                            value={teacher.degree}
                            onChange={handleChange}
                        />

                        <button className="btn-submit" type="submit">Alterar informações</button>
                    </form>
                </Modal>
                }
            </div>
        </>

    );
}

export default Teacher;