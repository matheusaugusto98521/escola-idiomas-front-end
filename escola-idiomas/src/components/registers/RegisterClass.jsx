import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCourses from "../../hooks/course/GetCourses";
import useTeachersByCourse from "../../hooks/course/GetTeachersByCourse";
import '../../styles/formStyles.css';
import Header from "../Header";

function RegisterClass() {
    const API_URL = 'http://localhost:8080/class/register';
    const [classStudents, setClassStudents] = useState({
        idClass: '',
        description: ''
    });
    const [idCourse, setIdCourse] = useState('');
    const [idTeacher, setIdTeacher] = useState('');
    const { courses, error: errorCourses } = useCourses();
    const { teachers, error: errorTeachers } = useTeachersByCourse({ idCourse });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClassStudents({ ...classStudents, [name]: value });
    };

    const handleCourseChange = (e) => {
        setIdCourse(e.target.value);
        console.log('Id curso: ', idCourse)
    };

    const handleTeacherChange = (e) => {
        setIdTeacher(e.target.value);
    };

    const handleRegisterClass = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}?idCourse=${idCourse}&idTeacher=${idTeacher}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(classStudents)
            });

            if (response.ok) {
                const data = response.json();
                setClassStudents({
                    idClass: '',
                    description: ''
                });
                console.log("Turma criada: ", data);
                navigate('/class/');
            } else {
                console.log("Erro ao criar turma: ", response.status);
            }
        } catch (error) {
            console.log("Erro ao criar turma: ", error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="form-container">
                <h1>Cadastrar Turma</h1>
                <form onSubmit={handleRegisterClass}>
                    <label htmlFor="description">Descrição</label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        value={classStudents.description}
                        onChange={handleChange}
                    />

                    <label htmlFor="course">Curso: </label>
                    <select
                        name="course"
                        id="course"
                        value={idCourse}
                        onChange={handleCourseChange}
                    >
                        <option value="">Selecione o curso desejado:</option>
                        {courses.length > 0 ? courses.map(course => (
                            <option key={course.id} value={course.id}>
                                {course.description}
                            </option>
                        )) : (
                            <option disabled>Carregando cursos....</option>
                        )}
                    </select>

                    <label htmlFor="teacher">Professores:</label>
                    <select
                        name="teacher"
                        id="teacher"
                        value={idTeacher}
                        onChange={handleTeacherChange}
                        disabled={!idCourse}
                    >
                        <option value="">Selecione o professor desejado:</option>
                        {teachers.length > 0 ? teachers.map(teacher => (
                            <option key={teacher.id} value={teacher.id}>
                                {teacher.name}
                            </option>
                        )) : (
                            <option disabled>Carregando professores....</option>
                        )}
                    </select>

                    <button type="submit">Cadastrar</button>
                </form>

                {errorCourses && <p className="error-message">{errorCourses}</p>}
                {errorTeachers && <p className="error-message">{errorTeachers}</p>}
            </div>
        </>
    );
}


export default RegisterClass;