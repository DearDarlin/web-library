import React from 'react';
import AuthorForm from '../components/AuthorForm';
import BookForm from '../components/BookForm';

const RegistrationPage = () => {
    const containerStyle = {
        maxWidth: '1100px',
    };

    const titleStyle = {
        textAlign: 'center',
        fontSize: '32px',
        fontWeight: '800',
        color: '#131a21ff'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '50px'
    };

    const cardStyle = {
        background: 'linear-gradient(120deg, #bcdef6ff, #ffbde6ff)',
        padding: '25px',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
        transition: '0.3s'
    };

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Керування бібліотекою</h1>
            <div style={gridStyle}>
                <div style={cardStyle}><AuthorForm /></div>
                <div style={cardStyle}><BookForm /></div>
            </div>
        </div>
    );
};

export default RegistrationPage;