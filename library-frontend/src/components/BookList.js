import React from 'react';

const BookList = ({ books, onDelete }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Book List</h2>
      {books.length === 0 ? (
        <p className="text-gray-700">No books available</p>
      ) : (
        <ul className="bg-white shadow-md rounded-lg overflow-hidden">
          {books.map((book) => (
            <li key={book.id} className="flex justify-between items-center p-4 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-gray-600">{book.author}</p>
                <p className="text-gray-600">{book.genre}</p>
                <p className="text-gray-600">{new Date(book.published_date).toLocaleDateString()}</p>
              </div>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                onClick={() => onDelete(book.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
