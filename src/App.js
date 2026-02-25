import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage';
import LibraryPage from './pages/LibraryPage';

function App() {
  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    padding: '15px',
    background: 'linear-gradient(90deg, #4e73df, #1cc88a)',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    fontWeight: '600',
    padding: '8px 16px',
    borderRadius: '8px',
    transition: '0.3s'
  };

  return (
    <Router>
      <nav style={navStyle}>
        <Link 
          to="/" 
          style={linkStyle}
          onMouseOver={e => e.target.style.background = 'rgba(255,255,255,0.2)'}
          onMouseOut={e => e.target.style.background = 'transparent'}
        >
          Add Information
        </Link>

        <Link 
          to="/library" 
          style={linkStyle}
          onMouseOver={e => e.target.style.background = 'rgba(255,255,255,0.2)'}
          onMouseOut={e => e.target.style.background = 'transparent'}
        >
          Library
        </Link>
      </nav>

      <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<RegistrationPage />} />
          <Route path="/library" element={<LibraryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;