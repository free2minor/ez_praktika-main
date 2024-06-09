import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import BookPage from './pages/BookPage';
import AddBookForm from './components/AddBookForm';
import './index.css'; // Импортируем файл стилей

const App = () => {
  return (
    <Router>
      <div className="text-center bg-animate"> {/* Добавляем класс для анимированного фона */}
        <nav className="p-4 bg-blue-500 text-white">
          <ul className="flex justify-center space-x-4">
            <li>
              <Link to="/" className="font-bold border-b-2 border-transparent hover:border-white">Главная</Link>
            </li>
            <li>
              <Link to="/books" className="font-bold border-b-2 border-transparent hover:border-white">Список книг</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/books" element={<BookPage />} />
          <Route path="/addbooks" element={<AddBookForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
