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
            // Отправляем фильтры как Query параметры
            const response = await axios.get(API_BASE_URL, { params: filters });
            setLibraryData(response.data);
        } catch (error) {
            console.error("Ошибка загрузки данных", error);
        }
    };

    useEffect(() => {
        fetchLibrary();
    }, [filters]); // Перезагружать при изменении фильтров

    const handleDeleteAuthor = async (id) => {
        if (window.confirm("Удалить автора?")) {
            await axios.delete(`${API_BASE_URL}/author/${id}`);
            fetchLibrary();
        }
    };

    const handleDeleteBook = async (id) => {
        await axios.delete(`${API_BASE_URL}/book/${id}`);
        fetchLibrary();
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Библиотека</h2>
            
            <div style={styles.filterBar}>
                <input style={filterStyles.input}
                    placeholder="Пошук за назвою" 
                    onChange={(e) => setFilters({...filters, searchTitle: e.target.value})} 
                />
                <input style={filterStyles.input}
                    type="number" placeholder="Год" 
                    onChange={(e) => setFilters({...filters, searchYear: e.target.value})} 
                />
                <input style={filterStyles.input}
                    placeholder="Имя автора" 
                    onChange={(e) => setFilters({...filters, searchAuthorName: e.target.value})} 
                />
                <select style={filterStyles.select} onChange={(e) => setFilters({...filters, sortOrder: e.target.value})}>
                    <option value="">Без сортировки</option>
                    <option value="title_asc">Заголовок (А-Я)</option>
                    <option value="year_desc">Сначала новые</option>
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