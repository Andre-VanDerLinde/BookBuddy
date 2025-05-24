import { Link } from 'react-router-dom';

function Navigations({ token, setToken }) {
  const handleLogout = () => setToken(null);

  return (
    <nav>
      <div className="nav-links">
        <Link to="/books">Books</Link>
        {token && <Link to="/account">My Account</Link>}
        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/register">Register</Link>}
      </div>
      {token && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

export default Navigations;
