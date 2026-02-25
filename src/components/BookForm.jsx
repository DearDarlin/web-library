import React, { useState, useEffect } from 'react'; // Добавили useEffect
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7207';

const BookForm = () => {
    const [book, setBook] = useState({
        title: '',
        isbn: '',
        publishYear: '',
        price: '',
        authorId: ''
    });

    // Состояние для хранения списка авторов
    const [authors, setAuthors] = useState([]);

    // Загружаем список авторов при загрузке компонента
    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                // Используем GET запрос из вашего Swagger
                const response = await axios.get(`${API_BASE_URL}/api/Authors/authors`);
                setAuthors(response.data); // Предполагаем, что API возвращает массив объектов авторов
            } catch (error) {
                console.error("Ошибка при загрузке авторов:", error);
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
            alert(response.data.message || "Book added successfully!");
            setBook({ title: '', isbn: '', publishYear: '', price: '', authorId: '' });
        } catch (error) {
            alert(error.response?.data?.message || "Error adding book");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h3>Books</h3>
            <input style={styles.input} name="title" placeholder="Title book" value={book.title} onChange={handleChange} required />
            <input style={styles.input} name="isbn" placeholder="ISBN" value={book.isbn} onChange={handleChange} required />
            <input style={styles.input} type="number" name="publishYear" placeholder="Publish Year" value={book.publishYear} onChange={handleChange} required />
            <input style={styles.input} type="number" name="price" placeholder="Price" value={book.price} onChange={handleChange} required />

            <select
                style={styles.input} 
                name="authorId" 
                value={book.authorId} 
                onChange={handleChange} 
                required
            >
                <option value="">Select Author</option>
                {authors.map((author) => (
                    <option key={author.id} value={author.id}>
                        {author.fullName} 
                    </option>
                ))}
            </select>

            <button style={styles.button} type="submit">Add Book</button>
        </form>
    );
};

const styles = {
    form: { display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' },
    input: { padding: '8px', borderRadius: '4px', border: '1px solid #ddd', backgroundColor: 'white' },
    button: { padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default BookForm;