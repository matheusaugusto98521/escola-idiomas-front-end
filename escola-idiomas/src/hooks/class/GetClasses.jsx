import { useEffect, useState } from "react";

function useClasses(){
    const API_URL = 'http://localhost:8080/class/';
    const [classes, setClasses] = useState([]);
    const [error, setError] = useState('');

    const fetchClasses = async() => {
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
            });

            if(response.ok){
                const data = await response.json();
                setClasses(data);
                setError('');
            }else{
                setError('Failed to fetch classes');
            }
        } catch (error) {
            setError('Failed to fetch classes: ' + error.message);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    return { classes, error, fetchClasses }
}

export default useClasses;