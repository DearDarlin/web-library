import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7207'; 

const AuthorForm = () => {
    const [author, setAuthor] = useState({
        FirstName: '',
        LastName: '',
        BirthDate: ''
    });

    const handleChange = (e) => {
        setAuthor({ ...author, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/api/Authors/author`, author);
            alert(response.data.message);
            setAuthor({ FirstName: '', LastName: '', BirthDate: '' }); 
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h3>Додати Автора</h3>
            <input style={styles.input} name="FirstName" placeholder="Ім'я" value={author.FirstName} onChange={handleChange} required />
            <input style={styles.input} name="LastName" placeholder="Прізвище" value={author.LastName} onChange={handleChange} required />
            <input style={styles.input} type="date" name="BirthDate" value={author.BirthDate} onChange={handleChange} required />
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