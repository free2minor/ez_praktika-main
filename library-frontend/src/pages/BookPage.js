import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/books/');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!books || books.length === 0) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center h-screen">
        <h1 className="text-xl font-bold mb-4">Список доступных книг</h1>
        <div className="bg-white shadow-md rounded p-8 mb-4">
          <p className="text-gray-700">Нет книг в наличии.</p>
          <Link
            to="/addbook"
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-block"
          >
            Добавить свою книгу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto text-center">
      <h1 className="text-xl font-bold mb-8">Список доступных книг</h1>
      <div className="flex flex-wrap justify-center">
        {books.map(book => (
          <div key={book.id} className="bg-white shadow-md rounded p-8 mb-4 mx-4" style={{ minWidth: '300px', maxWidth: '400px' }}>
            <h2 className="text-lg font-bold mb-2">{book.title}</h2>
            <p className="text-sm text-gray-700 mb-2">Автор: {book.author}</p>
            <p className="text-sm text-gray-700 mb-2">Жанр: {book.genre}</p>
            <p className="text-sm text-gray-700 mb-2">Дата публикации: {book.published_date}</p>
          </div>
        ))}
      </div>
      <Link
        to="/addbooks"
        className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-block"
      >
        Добавить свою книгу
      </Link>
    </div>
  );
};

export default BookPage;
