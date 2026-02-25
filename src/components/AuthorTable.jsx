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
const AuthorTable = ({ authors, onDelete }) => (
    <div style={tableStyles.container}>
        <h3 style={{
            color: '#333', 
            borderBottom: '2px solid #007bff', 
            paddingBottom: '5px'}}>Автори</h3>
        <table style={tableStyles.table}>
            <thead>
                <tr>
                    <th style={tableStyles.th}>Ім'я</th>
                    <th style={tableStyles.th}>Дата народження</th>
                    <th style={tableStyles.th}>Дії</th>
                </tr>
            </thead>
            <tbody>
                {authors.map(author => (
                    <tr key={author.id}>
                        <td style={tableStyles.td}>{author.firstName} {author.lastName}</td>
                        <td style={tableStyles.td}>{new Date(author.birthDate).toLocaleDateString()}</td>
                        <td style={tableStyles.td}>
                            <button onClick={() => onDelete(author.id)} 
                            style={tableStyles.deleteBtn}>Видалити</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);


export default AuthorTable;