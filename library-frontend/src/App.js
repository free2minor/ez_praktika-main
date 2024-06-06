import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import BooksPage from './pages/BooksPage'

const App = () => {
  return (
    <Router>
      <div>
        <nav className="p-4 bg-blue-500 text-white">
          <ul className="flex space-x-4">
            <li>
              <Link to="/">Welcome</Link>
            </li>
            <li>
              <Link to="/books">Manage Books</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/books" element={<BooksPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
