import React from 'react';
import AuthorForm from '../components/AuthorForm';
import BookForm from '../components/BookForm';

const RegistrationPage = () => {
    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ textAlign: 'center' }}>керування бібліотекою</h1>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '40px' }}>
                <AuthorForm />
                <BookForm />
            </div>
        </div>
    );
};

export default RegistrationPage;