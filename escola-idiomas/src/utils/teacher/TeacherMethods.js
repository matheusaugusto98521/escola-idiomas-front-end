export const deleteTeacher = async({ idTeacher}) => {
    const API_URL = `http://localhost:8080/teacher/delete?idTeacher=${idTeacher}`;

    try {
        const response = await fetch(API_URL, {
            method: 'DELETE',
        });

        if(response.ok){
            return await response.json();
        }else{
            throw new Error('Error al eliminar el profesor');
        }
    } catch (error) {
        throw error;
    }
};

export const updateTeacher = async({ idTeacher, updatedData }) => {
    const API_URL = `http://localhost:8080/teacher/update?idTeacher=${idTeacher}`;
    try {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if(response.ok){
            return await response.json();
        }else{
            throw new Error('Error ao atualizar professor com o id: ', idTeacher);
        }
    } catch (error) {
        throw error;
    }
};

export const getTeacherById = async({ idTeacher }) => {
    const API_URL = `http://localhost:8080/teacher/get-by-id?idTeacher=${idTeacher}`;
    try {
        const response = await fetch(API_URL, {
            method: 'GET'
        });

        if(response.ok){
            return await response.json();
        }else{
            throw new Error(await response.text());
        }
    } catch (error) {
        throw error;
    }
};