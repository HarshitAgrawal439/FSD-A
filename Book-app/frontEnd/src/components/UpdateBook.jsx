import React, { useEffect, useState } from "react";
import axios from "axios";

const UpdateBook = () => {
  const [books, setBooks] = useState([]); // List of books
  const [selectedBook, setSelectedBook] = useState(null); // Book to be updated
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    date: "",
    image: "",
  }); // Form data

  // Fetch all books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:9000/books");
      setBooks(res.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching books");
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:9000/books/${id}`, formData);
      alert("Book updated successfully");
      setSelectedBook(null); // Close the form after updating
      fetchBooks(); // Refresh the book list
    } catch (error) {
      console.error(error);
      alert("Error updating book");
    }
  };

  const handleEditClick = (book) => {
    setSelectedBook(book); // Set the selected book for editing
    setFormData({
      title: book.title,
      author: book.author,
      date: book.date,
      image: book.image,
    }); // Pre-fill the form with the book's details
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Update Books</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <strong>{book.title}</strong> by {book.author}{" "}
              <button onClick={() => handleEditClick(book)}>Edit</button>
            </li>
          ))}
        </ul>
      )}

      {selectedBook && (
        <div>
          <h3>Update Book</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(selectedBook._id);
            }}
          >
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Author:
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Date:
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Image URL:
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <button type="submit">Update</button>
            <button type="button" onClick={() => setSelectedBook(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateBook;
