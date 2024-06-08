import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import BookPage from './pages/BookPage';
import AddBookForm from './components/AddBookForm';

const App = () => {
  return (
    <Router>
      <div>
        <nav className="p-4 bg-blue-500 text-white">
          <ul className="flex justify-center space-x-8">
            <li className="mx-4">
              <Link to="/" className="font-bold">Главная</Link>
            </li>
            <li className="mx-4">
              <Link to="/books" className="font-bold">Список книг</Link>
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
