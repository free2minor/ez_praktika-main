import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterBy, setFilterBy] = useState('');
  const [filterValue, setFilterValue] = useState('');

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

  const handleFilterChange = (e) => {
    setFilterBy(e.target.value);
    setFilterValue('');
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const getFilteredBooks = () => {
    if (!filterBy || !filterValue) {
      return books;
    }

    return books.filter((book) => {
      const value = book[filterBy].toLowerCase();
      return value.includes(filterValue.toLowerCase());
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400 flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-8 text-white">Список доступных книг</h1>
      <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-4 mb-4 w-full md:w-auto items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <label className="text-gray-700 text-sm font-bold mb-2 text-white mr-2 text-lg">
            Фильтровать по:
          </label>
          <select
            className="bg-white border border-gray-400 rounded py-2 px-4 focus:outline-none focus:border-blue-500 text-gray-700"
            onChange={handleFilterChange}
            style={{ width: '145px' }}
          >
            <option value="">Выберите</option>
            <option value="genre">Жанру</option>
            <option value="author">Автору</option>
            <option value="title">Названию</option>
          </select>
        </div>
        {filterBy && (
          <input
            className="bg-white border border-gray-400 rounded py-2 px-4 focus:outline-none focus:border-blue-500 text-gray-700"
            type="text"
            placeholder={`Введите ${filterBy}`}
            value={filterValue}
            onChange={handleFilterValueChange}
            style={{ width: '145px' }}
          />
        )}
      </div>
      {loading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {getFilteredBooks().map((book) => (
            <div
              key={book.id}
              className="bg-white shadow-md rounded p-4 mb-4 mx-2 sm:mx-4"
              style={{ minWidth: '260px', maxWidth: '300px' }}
            >
              <h2 className="text-lg font-bold mb-2">{book.title}</h2>
              <p className="text-sm text-gray-700 mb-2">Автор: {book.author}</p>
              <p className="text-sm text-gray-700 mb-2">Жанр: {book.genre}</p>
              <p className="text-sm text-gray-700 mb-2">Дата публикации: {book.published_date}</p>
            </div>
          ))}
        </div>
      )}
      <Link
        to="/addbooks"
        className="mt-8 bg-white text-blue-500 hover:text-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-block"
      >
        Добавить свою книгу
      </Link>
    </div>
  );
};

export default BookPage;
