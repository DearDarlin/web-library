import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage';
import LibraryPage from './pages/LibraryPage';

function App() {
  return (
    <Router>
      <nav style={{ padding: '10px', background: '#eee' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Add Information</Link>
        <Link to="/library">Library</Link>
      </nav>

      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/library" element={<LibraryPage />} />
      </Routes>
    </Router>
  );
}

export default App;