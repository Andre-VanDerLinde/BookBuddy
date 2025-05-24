import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstname, lastname, email, password }),
    });
    const data = await res.json();
    if (data.token) {
      alert('Registration successful!');
      navigate('/login');
    } else {
      alert('Registration failed: ' + data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="First Name" required />
      <input value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="Last Name" required />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
