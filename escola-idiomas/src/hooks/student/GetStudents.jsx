import { useEffect, useState } from "react";

function useStudents(){
    const API_URL = 'http://localhost:8080/student/';
    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');

    const fetchStudents = async() => {
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
            });

            if(response.ok){
                const data = await response.json();
                setStudents(data);
                setError('');
            }else{
                setError('Error fetching students');
            }
        } catch (error) {
            setError('Error fetching students 500');
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return { students, error, fetchStudents };
}

export default useStudents;