import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import bookLogo from './assets/books.png';

import Books from './components/Books';
import SingleBook from './components/SingleBook';
import Account from './components/Account';
import Login from './components/Login';
import Register from './components/Register';
import Navigations from './components/Navigations';

function App() {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <Router>
      <Navigations token={token} setToken={setToken} />
      <h1><img id="logo-image" src={bookLogo} alt="logo" />Library App</h1>
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<SingleBook token={token} />} />
        <Route path="/account" element={<Account token={token} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
