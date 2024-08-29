import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import CategoryDropdown from './components/CategoryDropdown';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <CategoryDropdown/>
      {/* Add other components like Sidebar, MainContent here */}
    </div>
  );
}
