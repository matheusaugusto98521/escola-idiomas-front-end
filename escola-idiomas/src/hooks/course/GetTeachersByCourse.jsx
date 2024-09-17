import { useEffect, useState } from "react";

function useTeachersByCourse({ idCourse }){
    const API_URL = 'http://localhost:8080/course/teachers-by-course?idCourse=';
    const [teachers, setTeachers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const getTeachers = async() => {
            try {
                const response = await fetch(API_URL + idCourse, {
                    method: 'GET',
                });
    
                if(response.ok){
                    const data = await response.json();
                    setTeachers(data);
                    setError('');
                }else{
                    setError('Erro ao obter profesores');
                }
            } catch (error) {
                setError('Erro ao obter professores: ' + error.message);
            }
        };

        if(idCourse){
            getTeachers();
        }
    }, [idCourse, API_URL]);

    return {teachers, error};

}

export default useTeachersByCourse;