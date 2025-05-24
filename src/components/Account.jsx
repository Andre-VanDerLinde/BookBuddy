import { useEffect, useState } from 'react';
import './Account.css';

function Account({ token }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, [token]);

  const handleReturn = async (reservationId) => {
    const res = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reservationId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 204) {
      alert('Book returned!');
      window.location.reload();
    } else {
      alert('Failed to return book.');
    }
  };

  if (!token) return <p>Please log in to view your account.</p>;
  if (loading) return <p>Loading account...</p>;

  return (
  <div className="account-container">
    <div className="account-header">
      <h2>{user.firstname} {user.lastname}'s Account</h2>
      <p><strong>Email:</strong> {user.email}</p>
    </div>

    <h3>Your Reservations</h3>
    <div className="reservations-list">
      {user.reservations.length === 0 ? (
        <p>You have no current reservations.</p>
      ) : (
        user.reservations.map((book) => (
          <div key={book.id} className="reservation-card">
            <img src={book.coverimage || 'https://via.placeholder.com/120x160?text=No+Cover'} alt={book.title} />
            <div className="reservation-info">
              <h4>{book.title}</h4>
              <p>{book.author}</p>
              <button onClick={() => handleReturn(book.id)}>Return</button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

}

export default Account;
