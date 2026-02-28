import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthorTable from '../components/AuthorTable';
import BookTable from '../components/BookTable';

const filterStyles = {
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        minWidth: '200px',
        fontSize: '14px'
    },
    select: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        cursor: 'pointer'
    }
};

const API_BASE_URL = 'https://localhost:7207/api/Library';

const LibraryPage = () => {
    const [libraryData, setLibraryData] = useState({ authors: [], books: [] });
    const [filters, setFilters] = useState({
        searchTitle: '',
        searchYear: '',
        searchAuthorName: '',
        sortOrder: ''
    });

    const fetchLibrary = async () => {
        try {
            const response = await axios.get(API_BASE_URL, { params: filters });
            setLibraryData(response.data);
        } catch (error) {
            console.error("Помилка завантаження даних", error);
        }
    };

    useEffect(() => {
        fetchLibrary();
    }, [filters]); 

    const handleDeleteAuthor = async (id) => {
        if (window.confirm("Видалити автора?")) {
            try {
                const response = await axios.delete(`${API_BASE_URL}/author/${id}`);
                alert(response.data.message)
                fetchLibrary();
            }
            catch(error){
                    const serverMessage = error.response?.data?.message;

                    if(serverMessage){
                        alert(serverMessage);
                    }
                    else{
                        alert("Виникла помилка при видалення автора")
                    }
                    console.error(error);
            }
            
        }
    };

    const handleDeleteBook = async (id) => {
        const response = await axios.delete(`${API_BASE_URL}/book/${id}`);
        alert(response.data.message);
        fetchLibrary();
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Бібліотека</h2>
            
            <div style={styles.filterBar}>
                <input style={filterStyles.input}
                    placeholder="Пошук за назвою" 
                    onChange={(e) => setFilters({...filters, searchTitle: e.target.value})} 
                />
                <input style={filterStyles.input}
                    type="number" placeholder="Рік" 
                    onChange={(e) => setFilters({...filters, searchYear: e.target.value})} 
                />
                <input style={filterStyles.input}
                    placeholder="Ім'я автора" 
                    onChange={(e) => setFilters({...filters, searchAuthorName: e.target.value})} 
                />
                <select style={filterStyles.select} 
                onChange={(e) => setFilters({...filters, sortOrder: e.target.value})}>
                    <option value="">Без сортування</option>
                    <option value="title_asc">Сортування (А-Я)</option>
                    <option value="title_desc">Сортування (Я-А)</option>
                    <option value="title_asc">Спочатку старі</option>
                    <option value="year_desc">Спочатку нові</option>
                </select>
            </div>

            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <BookTable books={libraryData.books} onDelete={handleDeleteBook} />
                <AuthorTable authors={libraryData.authors} onDelete={handleDeleteAuthor} />
            </div>
        </div>
    );
};

const styles = {
    filterBar: { display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }
};

export default LibraryPage;