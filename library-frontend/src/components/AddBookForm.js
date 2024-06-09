import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddBookForm = ({ onAdd }) => {
  const [newBook, setNewBook] = useState({ title: '', author: '', genre: '', published_date: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/books/',
        newBook,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      onAdd(response.data);
      setNewBook({
        title: '',
        author: '',
        genre: '',
        published_date: '',
      });
    } catch (error) {
      console.error('Error adding book:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400 flex flex-col items-center p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Название
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            name="title"
            type="text"
            placeholder="Название"
            value={newBook.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
            Автор
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="author"
            name="author"
            type="text"
            placeholder="Автор"
            value={newBook.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genre">
            Жанр
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="genre"
            name="genre"
            type="text"
            placeholder="Жанр"
            value={newBook.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publishedDate">
            Дата Публикации
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="publishedDate"
            name="published_date"
            type="date"
            placeholder="Дата Публикации"
            value={newBook.published_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Добавить книгу'}
          </button>
          <Link to="/books" className="text-sm text-blue-500 hover:text-blue-700">Вернуться к списку книг</Link>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
