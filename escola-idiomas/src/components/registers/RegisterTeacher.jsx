import { useState } from "react";
import useCourses from "../../hooks/course/GetCourses";
import '../../styles/formStyles.css';
import Header from "../Header";

function RegisterTeacher(){
    const API_URL = 'http://localhost:8080/teacher/register?idCourse=';
    const { courses, error } = useCourses();
    const [idCourse, setIdCourse] = useState('');
    const [errorTeacher, setErrorTeacher] = useState('');
    const [teacher, setTeacher] = useState({
        id: '',
        name: '',
        birthDate: '',
        cpf: '',
        degree: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeacher({ ...teacher, [name] : value});
    }

    const handleCourseChange = (e) => {
        setIdCourse(e.target.value);
        console.log("Curso selecionado (id):", e.target.value);
    }
    

    const handleRegisterTeacher = async(e) => {
        e.preventDefault();
        if(!idCourse){
            setErrorTeacher('Selecione um curso!');
            return;
        }

        try {
            const response = await fetch(API_URL + idCourse, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(teacher)
            });

            if(response.ok){
                const data = response.json();
                setTeacher({
                    id: '',
                    name: '',
                    birthDate: '',
                    cpf: '',
                    degree: ''
                });
                console.log("Professor cadastrado: ", data);
                setErrorTeacher('');
            }else{
                setErrorTeacher('Erro ao cadastrar professor!');
                console.error('Erro: ', response.status);
            }
        } catch (error) {
            setErrorTeacher('Erro ao conectar-se com o servidor!');
            console.error('Erro: ', error);
        }
    };
    

    return(
        <>
            <Header />
            <div className="form-container">
                <h1>Cadastrar professor</h1>
                <form onSubmit={handleRegisterTeacher}>
                    <label htmlFor="name">Nome: </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={teacher.name}
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

                    <label htmlFor="cpf">CPF: </label>
                    <input
                        type="text"
                        name="cpf"
                        id="cpf"
                        value={teacher.cpf}
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

                    <label htmlFor="idCourse">Escolha o curso:</label>
                    <select
                        name="idCourse"
                        id="idCourse"
                        value={idCourse}
                        onChange={handleCourseChange}
                    >
                        <option value="">Selecione um curso:</option>
                        {courses.length > 0 ? (
                            courses.map(course => (
                                <option key={course.id} value={course.id}>
                                    {course.description}
                                </option>
                            ))
                        ): (
                            <option disabled>Carregando cursos....</option>
                        )};
                    </select>

                    <button type="submit">Cadastrar</button>
                </form>

                {errorTeacher && <p style={{ color: 'red' }}>{errorTeacher}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </>
    );
}

export default RegisterTeacher;