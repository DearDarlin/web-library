import React, { useState, useEffect } from 'react'; // Добавили useEffect
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7207';

const BookForm = () => {
    const [book, setBook] = useState({
        Title: '',
        ISBN: '',
        PublishYear: '',
        Price: '',
        AuthorId: ''
    });

    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/Authors/authors`);
                setAuthors(response.data); 
            } catch (error) {
                console.error("Помилка при завантаженні авторів:", error);
            }
        };
        fetchAuthors();
    }, []);

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/api/Authors/book`, book);
            alert(response.data.message);
            setBook({ Title: '', ISBN: '', PublishYear: '', Price: '', AuthorId: '' });
        } catch (error) {
            alert(error.response?.data?.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h3>Books</h3>
            <input style={styles.input} name="Title" minLength="2" placeholder="Title book" value={book.Title} onChange={handleChange} required />
            <input style={styles.input} name="ISBN" placeholder="ISBN (978-XXXXXXXXXX)" value={book.ISBN} onChange={handleChange} required pattern="978-\d{10}" title="Формат має бути 978- і 10 цифр"/>
            <input style={styles.input} type="number" min="1450" max="2100" name="PublishYear" placeholder="Publish Year" value={book.PublishYear} onChange={handleChange} required />
            <input style={styles.input} type="number" min="0" max="100000" name="Price" placeholder="Price" value={book.Price} onChange={handleChange} required />

            <select
                style={styles.input} 
                name="AuthorId" 
                value={book.AuthorId} 
                onChange={handleChange} 
                required
            >
                <option value="">-Select Author-</option>
                {authors.map((author) => (
                    <option key={author.id} value={author.id}>
                        {author.fullName} 
                    </option>
                ))}
            </select>

            <button style={styles.button} type="submit">Додати</button>
        </form>
    );
};

const styles = {
    form: { display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' },
    input: { padding: '8px', borderRadius: '4px', border: '1px solid #ddd', backgroundColor: 'white' },
    button: { padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default BookForm;