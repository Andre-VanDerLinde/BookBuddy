import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function SingleBook({ token }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  const handleCheckout = async () => {
    const res = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookId: parseInt(id) }),
    });
    if (res.ok) {
      alert('Book reserved!');
    } else {
      alert('Checkout failed');
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <img src={book.coverimage} alt={book.title} style={{ maxWidth: '100%' }} />
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p>{book.description}</p>
      {token && book.available && <button onClick={handleCheckout}>Reserve this Book</button>}
      {token && !book.available && <p><em>Not currently available for reservation.</em></p>}
    </div>
  );
}

export default SingleBook;
