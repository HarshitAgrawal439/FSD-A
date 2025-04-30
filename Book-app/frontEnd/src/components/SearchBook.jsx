import React, { useState } from "react";
import axios from "axios";

const SearchBook = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    if (!query) {
      alert("Please enter a title to search");
      return;
    }

    try {
      const res = await axios.get(
        `https://fsd-a.onrender.com/search?title=${query}`
      );
      setBooks(res.data);
    } catch (error) {
      console.error(error);
      alert("Error while fetching books");
    }
  };

  return (
    <div>
      <h2>Search Books</h2>
      <input
        type="text"
        placeholder="Enter book title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {books.length > 0 ? (
          <ul>
            {books.map((book) => (
              <li key={book._id}>
                <strong>{book.title}</strong> by {book.author} <br />
                <img src={book.image} alt={book.title} width="100" />
              </li>
            ))}
          </ul>
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBook;
