import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterBy, setFilterBy] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [editMenuId, setEditMenuId] = useState(null);
  const [editBookData, setEditBookData] = useState({ title: '', author: '', genre: '', published_date: '' });

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

  const handleEditBook = (book) => {
    setEditBookData(book);
    setEditMenuId(book.id);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/books/${editBookData.id}/`, editBookData);
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === editBookData.id ? editBookData : book))
      );
      setEditMenuId(null);
    } catch (error) {
      console.error('Error updating book:', error);
    }
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
            <option value=""> </option>
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
              className="bg-white shadow-md rounded p-4 mb-4 mx-2 sm:mx-4 relative"
              style={{ minWidth: '260px', maxWidth: '300px' }}
            >
              <div className="absolute top-0 right-0">
                <button
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => handleEditBook(book)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
              <h2 className="text-lg font-bold mb-2">{book.title}</h2>
              <p className="text-sm text-gray-700 mb-2">Автор: {book.author}</p>
              <p className="text-sm text-gray-700 mb-2">Жанр: {book.genre}</p>
              <p className="text-sm text-gray-700 mb-2">Дата публикации: {book.published_date}</p>
            </div>
          ))}
        </div>
      )}
      {editMenuId && (
        <form onSubmit={handleEditSubmit} className="bg-white shadow-md rounded p-4 mb-4 mx-2 sm:mx-4 relative">
          <h2 className="text-lg font-bold mb-2">Редактировать книгу</h2>
          <label className="block text-gray-700 text-sm font-bold mb-2">Название:</label>
          <input
            className="bg-white border border-gray-400 rounded py-2 px-4 mb-2 focus:outline-none focus:border-blue-500 text-gray-700"
            type="text"
            name="title"
            value={editBookData.title}
            onChange={handleEditChange}
          />
          <label className="block text-gray-700 text-sm font-bold mb-2">Автор:</label>
          <input
            className="bg-white border border-gray-400 rounded py-2 px-4 mb-2 focus:outline-none focus:border-blue-500 text-gray-700"
            type="text"
            name="author"
            value={editBookData.author}
            onChange={handleEditChange}
          />
          <label className="block text-gray-700 text-sm font-bold mb-2">Жанр:</label>
          <input
            className="bg-white border border-gray-400 rounded py-2 px-4 mb-2 focus:outline-none focus:border-blue-500 text-gray-700"
            type="text"
            name="genre"
            value={editBookData.genre}
            onChange={handleEditChange}
          />
          <label className="block text-gray-700 text-sm font-bold mb-2">Дата публикации:</label>
          <input
            className="bg-white border border-gray-400 rounded py-2 px-4 mb-2 focus:outline-none focus:border-blue-500 text-gray-700"
            type="date"
            name="published_date"
            value={editBookData.published_date}
            onChange={handleEditChange}
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setEditMenuId(null)}
              className="mr-4 bg-gray-300 text-gray-700 hover:bg-gray-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Сохранить
            </button>
          </div>
        </form>
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
