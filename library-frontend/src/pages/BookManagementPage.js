import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddBookForm from '../components/AddBookForm';
import BookList from '../components/BookList';

const BookManagementPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/books/');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleAddBook = (book) => {
    setBooks([...books, book]);
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`/api/books/${id}/`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="p-4">
      <AddBookForm onAdd={handleAddBook} />
      <BookList books={books} onDelete={handleDeleteBook} />
    </div>
  );
};

export default BookManagementPage;
