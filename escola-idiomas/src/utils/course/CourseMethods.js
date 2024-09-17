
export const updateCourse = async({ idCourse, updatedData}) => {
    const API_URL = `http://localhost:8080/course/update?idCourse=${idCourse}`;
    try {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if(response.ok){
            return await response.json();
        }else{
            throw new Error('Erro ao atualizar o curso com id: ', idCourse);
        }
    } catch (error) {
        console.error(error);
    }
};

export const getCourseById = async({ idCourse }) => {
    const API_URL = `http://localhost:8080/course/get-by-id?idCourse=${idCourse}`;
    try {
        const response = await fetch(API_URL, {
            method: 'GET'
        });

        if(response.ok){
            return await response.json();
        }else{
            throw new Error(await response.text);
        }
    } catch (error) {
        return error;
    }
};

export const deleteCourse = async({ idCourse }) => {
    const API_URL = `http://localhost:8080/course/delete?idCourse=${idCourse}`;
    try {
        const response = await fetch(API_URL, {
            method: 'DELETE'
        });

        if(response.ok){
            return await response.json();
        }else{
            throw new Error(await response.text)
        }
    } catch (error) {
        return error;
    }

}