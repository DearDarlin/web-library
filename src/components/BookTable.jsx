import React from 'react';


const tableStyles = {
    container: {
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        margin: '10px'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '10px',
        fontSize: '14px',
    },
    th: {
        backgroundColor: '#f8f9fa',
        color: '#333',
        padding: '12px 15px',
        borderBottom: '2px solid #dee2e6',
        textAlign: 'left',
    },
    td: {
        padding: '10px 15px',
        borderBottom: '1px solid #eee',
        verticalAlign: 'middle',
    },
    deleteBtn: {
        padding: '6px 12px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '12px',
        transition: 'background 0.3s'
    }
};

const BookTable = ({ books, onDelete }) => (
    <div style={tableStyles.container}>
        <h3 style={{color: '#333', borderBottom: '2px solid #28a745', paddingBottom: '5px'}}>Книги</h3>
        <table style={tableStyles.table}>
            <thead>
                <tr>
                    <th style={tableStyles.th}>Назва</th>
                    <th style={tableStyles.th}>ISBN</th>
                    <th style={tableStyles.th}>Год</th>
                    <th style={tableStyles.th}>Ціна</th>
                    <th style={tableStyles.th}>Дії</th>
                </tr>
            </thead>
            <tbody>
                {books.map(book => (
                    <tr key={book.id}>
                        <td style={tableStyles.td}>{book.title}</td>
                        <td style={tableStyles.td}>{book.isbn}</td>
                        <td style={tableStyles.td}>{book.publishYear}</td>
                        <td style={tableStyles.td}>{book.price}</td>
                        <td style={tableStyles.td}>
                            <button onClick={() => onDelete(book.id)} style={tableStyles.deleteBtn}>Видалити</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);


export default BookTable;