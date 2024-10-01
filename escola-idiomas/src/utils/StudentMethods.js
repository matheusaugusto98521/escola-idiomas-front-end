
export const deleteStudent = async ({ idStudent }) => {
    const API_URL = `http://localhost:8080/student/delete?idStudent=${idStudent}`;
    try {
        const response = await fetch(API_URL, {
            method: 'DELETE',
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Error ao deletar aluno com o id: ', idStudent);
        }
    } catch (error) {
        return error;
    }
}

export const updateStudent = async ({ idStudent, updatedData }) => {
    const API_URL = `http://localhost:8080/student/update?idStudent=${idStudent}`;
    try {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Error ao atualizar aluno com o id: ', idStudent);
        }
    } catch (error) {
        return error;
    }
};

export const getStudentById = async ({ idStudent }) => {
    const API_URL = `http://localhost:8080/student/get-by-id?idStudent=${idStudent}`;
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Error ao buscar aluno com o id: ', idStudent);
        }
    } catch (error) {
        return error;
    }
};