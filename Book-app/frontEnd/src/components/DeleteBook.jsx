import React, { useEffect, useState } from "react";
import axios from "axios";

const DeleteBook = () => {
  const [books, setBooks] = useState([]);

  // Fetch all books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("https://fsd-a.onrender.com/books");
      setBooks(res.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching books");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:9000/books/${id}`);
      alert("Book deleted successfully");
      fetchBooks(); // Refresh book list after deletion
    } catch (error) {
      console.error(error);
      alert("Error deleting book");
    }
  };

  return (
    <div>
      <h2>Delete Books</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <strong>{book.title}</strong> by {book.author}{" "}
              <button onClick={() => handleDelete(book._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeleteBook;
