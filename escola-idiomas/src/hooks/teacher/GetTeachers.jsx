import { useEffect, useState } from "react";

function useTeachers(){
    const API_URL = 'http://localhost:8080/teacher/';
    const [teachers, setTeachers] = useState([]);
    const [error, setError] = useState('');

    const fetchTeachers = async() => {
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
            });

            if(response.ok){
                const data = await response.json();
                setTeachers(data)
                setError('');
            }else{
                setError('Error fetching teachers');
            }
        } catch (error) {
            setError('Error fetching teachers');
        }
    };

    useEffect(() => {
        fetchTeachers();
    });

    return { teachers, error, fetchTeachers };
}

export default useTeachers;