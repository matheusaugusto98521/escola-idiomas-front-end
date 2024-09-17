export const deleteClass = async({ idClass }) => {
    const API_URL = `http://localhost:8080/class/delete?idClass=${idClass}`;
    try {
        const response = await fetch(API_URL, {
            method: 'DELETE'
        });

        if(response.ok){
            return await response.json();
        }else{
            throw new Error("Erro ao deletar turma");
        }
    } catch (error) {
        return error;
    }
};

export const updateClass = async({ idClass, updatedData}) => {
    const API_URL = `http://localhost:8080/class/update?idClass=${idClass}`;
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
            throw new Error("Erro ao alterar turma");
        }
    } catch (error) {
        return error;
    }
};

export const getClassById = async({ idClass }) => {
    const API_URL = `http://localhost:8080/class/get-by-id?idClass=${idClass}`;
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
        });

        if(response.ok){
            return await response.json();
        }else{
            throw new Error('Error ao buscar turma com o id: ', idClass);
        }
    } catch (error) {
        return error;
    }
};

export const getStudentsByClass = async({ idClass }) => {
    const API_URL = `http://localhost:8080/class/get-students-by-class?idClass=${idClass}`;
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
        });

        if(response.ok){
            return await response.json();
        }else{
            throw new Error('Error ao buscar turma com o id: ', idClass);
        }
    } catch (error) {
        return error;
    }
};