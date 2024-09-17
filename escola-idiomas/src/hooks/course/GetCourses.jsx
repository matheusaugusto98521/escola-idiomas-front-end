import { useEffect, useState } from "react";

function useCourses() {
    const API_URL = 'http://localhost:8080/course/';
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState('');

    const fetchCourses = async() => {
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
            });

            if(response.ok){
                const data = await response.json();
                setCourses(data);
            }else{
                setError('Erro ao obter cursos!');
            }
        } catch (error) {
            console.error("Erro ao buscar cursos: ", error);
            setError('Erro ao conectar-se ao servidor.');
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return { courses, error, fetchCourses };
}

export default useCourses;

