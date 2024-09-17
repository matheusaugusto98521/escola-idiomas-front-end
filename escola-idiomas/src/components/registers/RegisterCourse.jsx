import { useState } from "react";
import '../../styles/formStyles.css';
import Header from "../Header";

function RegisterCourse(){

    const API_URL = 'http://localhost:8080/course/register';
    const [error, setError] = useState('');
    const [course, setCourse] = useState({
        id: '',
        description: '',
        fullLoad: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse({ ...course, [name] : value});
    }

    const handleRegisterCourse = async(e) => {
        e.preventDefault();
        try{
            const response = await fetch(API_URL, {
                method: 'POST',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(course),
            });

            if(response.ok){
                const data = await response.json();
                setCourse({
                    id: '',
                    description: '',
                    fullLoad: ''
                });
                console.log(data);
            }else{
                const errorText = await response.text();
                console.error('Erro ao criar novo curso: ', response.status, errorText);
                setError(`Erro: ${response.status} - ${errorText}`);
            }

        }catch(error){
            console.error("Erro interno ao criar curso: ", error);
            setError('Erro ao conectar-se ao servidor.');
        }
    };

    return(
        <>
            <Header />
            <div className="form-container">
                <h1>Cadastrar novo curso</h1>
                <form onSubmit={handleRegisterCourse}>
                    <label htmlFor="description">Descrição:</label>
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

                    <button type="submit">Cadastrar</button>
                </form>

                {error && <p className="error-message">{error}</p>}
            </div>
        </>
    );
}

export default RegisterCourse;