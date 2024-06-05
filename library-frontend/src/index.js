
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Вместо ReactDOM.render используйте createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Используйте root.render вместо ReactDOM.render
root.render(<App />);

