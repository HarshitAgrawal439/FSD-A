import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import AddBook from "./components/AddBook";
import ViewBook from "./components/ViewBook";
import SearchBook from "./components/SearchBook";
import UpdateBook from "./components/UpdateBook";
import DeleteBook from "./components/DeleteBook";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-gray-900 text-white px-6 py-4 shadow-md flex justify-center space-x-8">
          <Link
            className="hover:text-blue-400 transition duration-200 font-medium"
            to="/add">
            Add Book
          </Link>
          <Link
            className="hover:text-blue-400 transition duration-200 font-medium"
            to="/view">
            View Book
          </Link>
          <Link
            className="hover:text-blue-400 transition duration-200 font-medium"
            to="/search">
            Search Book
          </Link>
          <Link
            className="hover:text-blue-400 transition duration-200 font-medium"
            to="/update">
            Update Book
          </Link>
          <Link
            className="hover:text-blue-400 transition duration-200 font-medium"
            to="/delete">
            Delete Book
          </Link>
        </nav>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<h1 className="text-2xl font-bold">Welcome to the Book Management App</h1>} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/view" element={<ViewBook />} />
            <Route path="/search" element={<SearchBook />} />
            <Route path="/update" element={<UpdateBook />} />
            <Route path="/delete" element={<DeleteBook />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;