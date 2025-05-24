import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Books.css'; // We'll create this CSS for styling

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books')
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div className="books-container">
      {books.map((book) => (
        <div className="book-card" key={book.id}>
          <img src={book.coverimage} alt={book.title} />
          <div className="book-info">
            <h3>{book.title}</h3>
            <p className="author">{book.author}</p>
            <Link to={`/books/${book.id}`} className="details-button">View Details</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Books;
