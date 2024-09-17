import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCourses from "../hooks/course/GetCourses";
import { deleteCourse, getCourseById, updateCourse } from "../utils/course/CourseMethods";
import ButtonCloseModal from "./ButtonCloseModal";
import Header from "./Header";

function Course(){
    const navigate = useNavigate();
    const { courses, error, fetchCourses } = useCourses();
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [idCourse, setIdCourse] = useState('');
    const [course, setCourse] = useState({
        id: '',
        description: '',
        fullLoad: ''
    });

    useEffect(() => {
        if(idCourse){
            getCourseById({ idCourse: idCourse }).then(response => {
                setCourse(response);
            });
        }
    }, [idCourse]);

    const handleCreate = () => {
        navigate('/course/register');
    };

    const closeModal = () => {
        setIsModalUpdateOpen(!isModalUpdateOpen);
    }

    const handleDelete = (idCourse) => {
        deleteCourse({ idCourse });
    };

    const handleChangeModal = () => {
        setIsModalUpdateOpen(!isModalUpdateOpen);
    };

    const handleUpdate = (idCourse) => {
        handleChangeModal();
        setIdCourse(idCourse);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdateCourse = (e) => {
        e.preventDefault();
        try {
            const response = updateCourse({idCourse: idCourse, updatedData: course});
            console.log('Feito: ', response);
            alert('Curso alterado com sucesso');
            fetchCourses();
            setIsModalUpdateOpen(false);
        } catch (error) {
            alert('Erro ao atualizar curso: ', error.message);
        }
    };

    return(
        <>
            <Header button={<button className="btn-add" onClick={() => handleCreate()}>Cadastrar novo curso</button>} />
            <div className="container">
                <div className="list">
                    <h2>Cursos cadastrados:</h2>
                    <ul>
                        {courses.length > 0 ? courses.map(course => (
                            <li key={course.id} className="item">
                                {course.description} - {course.fullLoad}
                                <span className="actions">
                                    <button className="btn-delete" onClick={() => handleDelete(course.id)}>Apagar</button>
                                    <button className="btn-update" onClick={() => handleUpdate(course.id)}>Alterar</button>
                                </span>
                            </li>
                        )) : (
                            <h3>Nenhum curso encontrado</h3>
                        )}
                    </ul>

                    {error && <p className="error-message">{error.message}</p>}
                </div>

                {isModalUpdateOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <ButtonCloseModal funcClick={closeModal}/>
                            <h3>Alterar informações do curso</h3>
                            <form onSubmit={handleUpdateCourse}>
                                <label htmlFor="description">Descrição: </label>
                                <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    value={course.description}
                                    onChange={handleChange}
                                />

                                <label htmlFor="fullLoad">Carga Horária: </label>
                                <input
                                    type="text"
                                    name="fullLoad"
                                    id="fullLoad"
                                    value={course.fullLoad}
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
}

export default Course;