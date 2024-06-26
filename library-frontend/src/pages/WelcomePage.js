import React from 'react';
import '../index.css';

const WelcomePage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400">
      <h1 className="text-4xl font-bold text-white animate-fade-in">
        Добро пожаловать в библиотеку!
      </h1>
    </div>
  );
};

export default WelcomePage;
