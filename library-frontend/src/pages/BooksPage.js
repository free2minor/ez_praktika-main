import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({title: '', author: '', genre: '', published_date: ''});
    const baseURL = 'http://127.0.0.1:8000';

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/books/`);
            if (response.status === 200) {
                setBooks(response.data);
            }
        } catch(error) {
            console.error('Fetch data error', error);
        }
    };

    const addBook = async () => {
        try {
            const response = await axios.post(`${baseURL}/api/books/`, newBook);
            if (response.status === 201) {
                setBooks([...books, response.data]);
                setNewBook({title: '', author: '', genre: '', published_date: ''});
            }
        } catch(error) {
            console.error("Add Book error", error)
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook({...newBook, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addBook();
    };

    return (
        <div>
            <h1>Books List</h1>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        {book.title} by {book.author} - {book.genre} (Published on: {book.published_date})
                    </li>
                ))}
            </ul>
            <h2>Add a New Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={newBook.title} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div>
                    <label>Author:</label>
                    <input 
                        type="text" 
                        name="author" 
                        value={newBook.author} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div>
                    <label>Genre:</label>
                    <input 
                        type="text" 
                        name="genre" 
                        value={newBook.genre} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div>
                    <label>Published Date:</label>
                    <input 
                        type="date" 
                        name="published_date" 
                        value={newBook.published_date} 
                        onChange={handleInputChange} 
                    />
                </div>
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default BooksPage;
