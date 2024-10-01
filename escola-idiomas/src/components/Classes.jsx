import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useClasses from "../hooks/class/GetClasses";
import '../styles/styles.css';
import { deleteClass, getClassById, getStudentsByClass, updateClass } from "../utils/class/ClassMethods";
import ButtonCloseModal from "./ButtonCloseModal";
import Header from "./Header";
import Modal from "./modal";

function Classes() {
    const navigate = useNavigate();
    const { classes, error, fetchClasses } = useClasses();
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [idClass, setIdClass] = useState('');
    const [classStudent, setClassStudent] = useState({
        id: '',
        description: ''
    });
    const [students, setStudents] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState(null);

    useEffect(() => {
        if (idClass) {
            getClassById({ idClass: idClass }).then(response => {
                setClassStudent(response);
            });
            handleGetStudents(idClass);
        }
    }, [idClass]);

    const handleCreate = () => {
        navigate('/class/register');
    };

    const closeModal = () => {
        setIsModalUpdateOpen(!isModalUpdateOpen);
    }

    const handleDelete = async (idClass) => {
        try {
            await deleteClass({ idClass: idClass });
            await fetchClasses();
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangeModal = () => {
        setIsModalUpdateOpen(!isModalUpdateOpen);
    };

    const handleUpdate = (idClass) => {
        handleChangeModal();
        setIdClass(idClass);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClassStudent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdateClass = async (e) => {
        e.preventDefault();
        try {
            const response = await updateClass({ idClass: idClass, updatedData: classStudent });
            console.log('Feito: ', response);
            await fetchClasses();
            setIsModalUpdateOpen(false);
        } catch (error) {
            alert('Erro ao atualizar curso: ', error.message);
        }
    };

    const handleGetStudents = async (idClass) => {
        getStudentsByClass({ idClass: idClass }).then(response => {
            setStudents(response);
            console.log(response);
        });
    };

    const handleShowStudents = (idClass) => {
        setSelectedClassId(selectedClassId === idClass ? null : idClass);
        if (selectedClassId !== idClass) {
            const data = handleGetStudents(idClass);
            console.log("Data: ", data);
        }
    };

    return (
        <>
            <Header button={<button className="btn-add" onClick={() => handleCreate()}>Cadastrar nova turma</button>} />
            <div className="container">
                <div className="list">
                    <h2>Turmas cadastradas:</h2>
                    <ul>
                        {classes.length > 0 ? classes.map(classStudent => (
                            <li key={classStudent.id} className="item">
                                <div className="card">
                                    <strong>{classStudent.description}</strong>
                                </div>
                                <span className="actions">
                                    <button className="btn-delete" onClick={() => handleDelete(classStudent.id)}>Apagar</button>
                                    <button className="btn-update" onClick={() => handleUpdate(classStudent.id)}>Alterar</button>
                                    <button className="btn-view" onClick={() => handleShowStudents(classStudent.id)}>
                                        {selectedClassId === classStudent.id ? 'Ocultar alunos' : 'Ver alunos matriculados'}
                                    </button>
                                </span>
                                {selectedClassId === classStudent.id && (
                                    <div className="student-list">
                                        <h4>Alunos matriculados na {classStudent.description}</h4>
                                        <ul>
                                            {students.length > 0 ? students.map(student => (
                                                <li key={student.id} className="student-item">
                                                    <strong>Nome:</strong> {student.name} <br />
                                                    <strong>CPF:</strong> {student.cpf} <br />
                                                    <strong>Idade:</strong> {student.age}
                                                </li>
                                            )) : (
                                                <h3 className="error-message">Nenhum aluno encontrado</h3>
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        )) : (
                            <h3>Nenhuma turma encontrada</h3>
                        )}
                    </ul>

                    {error && <p className="error-message">{error.message}</p>}
                </div>

                {isModalUpdateOpen && <Modal>
                    <ButtonCloseModal funcClick={closeModal} />
                    <h3>Alterar informações da turma</h3>
                    <form onSubmit={handleUpdateClass}>
                        <label htmlFor="description">Descrição: </label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            value={classStudent.description}
                            onChange={handleChange}
                        />

                        <button className="btn-submit" type="submit">Alterar informações</button>
                    </form>
                </Modal>}
            </div>
        </>
    );
}

export default Classes;