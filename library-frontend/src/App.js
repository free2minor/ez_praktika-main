import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import BookPage from './pages/BookPage';
import AddBookForm from './components/AddBookForm';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <nav className="p-4 bg-blue-500 text-white">
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <li>
              <Link to="/" className="font-bold">Главная</Link>
            </li>
            <li>
              <Link to="/books" className="font-bold">Список книг</Link>
            </li>
          </ul>
        </nav>

        <div className="flex-grow overflow-auto">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/books" element={<BookPage />} />
            <Route path="/addbooks" element={<AddBookForm />} />
          </Routes>
        </div>

        <footer className="p-4 bg-blue-500 text-white mt-auto">
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <li>
              <Link to="/" className="font-bold">Главная</Link>
            </li>
            <li>
              <Link to="/books" className="font-bold">Список книг</Link>
            </li>
          </ul>
        </footer>
      </div>
    </Router>
  );
};

export default App;
