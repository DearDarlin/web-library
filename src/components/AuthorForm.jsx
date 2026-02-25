import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7207'; 

const AuthorForm = () => {
    const [author, setAuthor] = useState({
        firstName: '',
        lastName: '',
        birthDate: ''
    });

    const handleChange = (e) => {
        setAuthor({ ...author, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/api/Authors/author`, author);
            alert(response.data.message || "Автор успешно добавлен!");
            setAuthor({ firstName: '', lastName: '', birthDate: '' }); // Очистка
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Ошибка при добавлении автора");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h3>Author Registration</h3>
            <input style={styles.input} name="firstName" placeholder="Ім'я" value={author.firstName} onChange={handleChange} required />
            <input style={styles.input} name="lastName" placeholder="Прізвище" value={author.lastName} onChange={handleChange} required />
            <input style={styles.input} type="date" name="birthDate" value={author.birthDate} onChange={handleChange} required />
            <button style={styles.button} type="submit">Зареєструвати</button>
        </form>
    );
};

const styles = {
    form: { display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' },
    input: { padding: '8px', borderRadius: '4px', border: '1px solid #ddd' },
    button: { padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default AuthorForm;