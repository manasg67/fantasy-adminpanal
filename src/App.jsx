import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import CategoryDropdown from './components/CategoryDropdown';
import Login from './components/Login';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
     <Login/>
      {/* Add other components like Sidebar, MainContent here */}
    </div>
  );
}


