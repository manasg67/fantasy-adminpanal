import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Addproduct from './AddProduct';
import CategoryDropdown from './CategoryDropdown';

export default function App() {
  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-100">
      <Addproduct />
      <CategoryDropdown/>
      {/* Add other components like Sidebar, MainContent here */}
    </div>
    </>
  );
}
