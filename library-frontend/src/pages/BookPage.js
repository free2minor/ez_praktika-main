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
      <div className="w-full h-screen bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-12">Список доступных книг</h1>
        <div className="bg-white shadow-md rounded p-8 mb-4 text-gray-700">
          <p>Нет книг в наличии.</p>
          <Link
            to="/addbooks"
            className="mt-4 bg-white hover:bg-gray-300 text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-block"
          >
            Добавить свою книгу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-12">Список доступных книг</h1>
      <div className="flex flex-wrap justify-center">
        {books.map(book => (
          <div key={book.id} className="bg-white shadow-md rounded p-8 mb-4 mx-4 text-gray-700" style={{ minWidth: '300px', maxWidth: '400px' }}>
            <h2 className="text-lg font-bold mb-2">{book.title}</h2>
            <p className="text-sm text-gray-700 mb-2">Автор: {book.author}</p>
            <p className="text-sm text-gray-700 mb-2">Жанр: {book.genre}</p>
            <p className="text-sm text-gray-700 mb-2">Дата публикации: {book.published_date}</p>
          </div>
        ))}
      </div>
      <Link
        to="/addbooks"
        className="mt-8 bg-white hover:bg-gray-300 text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-block"
      >
        Добавить свою книгу
      </Link>
    </div>
  );
};

export default BookPage;
