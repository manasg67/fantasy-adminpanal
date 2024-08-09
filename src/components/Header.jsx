

import React, { useState, useEffect } from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import FormComponent from './FormComponent';

export default function AdminPanel() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://fantasy-collection-backend.onrender.com/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://fantasy-collection-backend.onrender.com/api/subcategories/${categoryId}`);
      const data = await response.json();
      setSubcategories(data);
      setSelectedCategoryId(categoryId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId(null);
      setSubcategories([]);
      setShowForm(false);
    } else {
      fetchSubcategories(categoryId);
      setShowForm(false);
    }
  };

  const handleSubcategoryClick = () => {
    setShowForm(true);
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin</h1>
        <button onClick={handleButtonClick} className="text-2xl focus:outline-none">
          <HiOutlineDotsHorizontal />
        </button>
      </header>

      <main className="flex-1 p-4">
        {isOpen && (
          <div className="bg-white shadow-lg rounded-lg p-4">
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {categories.length > 0 && (
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category._id} className="p-2 border-b border-gray-300">
                    <button
                      onClick={() => handleCategoryClick(category._id)}
                      className="text-blue-500 hover:underline focus:outline-none"
                    >
                      {category.name}
                    </button>
                    {selectedCategoryId === category._id && subcategories.length > 0 && (
                      <ul className="pl-4 mt-2 space-y-1">
                        {subcategories.map((sub) => (
                          <li key={sub._id}>
                            <button
                              onClick={handleSubcategoryClick}
                              className="text-gray-700 hover:underline focus:outline-none"
                            >
                              {sub.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {showForm && (
          <FormComponent categoryId={selectedCategoryId} onClose={() => setShowForm(false)} />
        )}
      </main>
    </div>
  );
}
