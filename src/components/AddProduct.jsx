
import React, { useState, useEffect } from 'react';
import Header from './Header';
import { HiPlus } from 'react-icons/hi';
import FormComponent from './FormComponent';

export default function AdminPanel() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
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

  const handleSubcategoryClick = (subcategoryId) => {
    setSelectedSubcategoryId(subcategoryId);
    setShowForm(true);
  };

  const handleAddButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <header>
       
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleAddButtonClick}
            style={{
              backgroundColor: 'green',
              color: 'yellow',
              padding: '10px 20px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '16px',
            }}
          >
            Add Product
            <HiPlus style={{ marginLeft: '8px', fontSize: '20px' }} />
          </button>
        </div>
      </header>

      <main className="flex-1 p-4">
        {isOpen && (
          <div className="bg-white shadow-lg rounded-lg p-4">
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {categories.length > 0 && (
              <div style={{ display: 'inline-flex', gap: '20px', flexWrap: 'wrap' }}>
                {categories.map((category) => (
                  <div key={category._id} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', marginTop:"10px", borderRadius:"8px" }}>
                    <button
                      onClick={() => handleCategoryClick(category._id)}
                      style={{
                        backgroundColor: 'green',
                        color: 'yellow',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer',
                        marginBottom: '10px',
                        fontWeight: selectedCategoryId === category._id ? 'bold' : 'normal',
                      }}
                    >
                      {category.name}
                    </button>
                    {selectedCategoryId === category._id && subcategories.length > 0 && (
                      <ul style={{ listStyleType: 'none', padding: '0', margin: '0', textAlign: 'center' }}>
                        {subcategories.map((sub) => (
                          <li key={sub._id} style={{ margin: '5px 0' }}>
                            <button
                              onClick={() => handleSubcategoryClick(sub._id)}
                              style={{
                                backgroundColor: 'green',
                                color: 'yellow',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                border: 'none',
                                cursor: 'pointer',
                              }}
                            >
                              {sub.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {showForm && (
          <FormComponent
            categoryId={selectedCategoryId}
            subcategoryId={selectedSubcategoryId}
            onClose={() => setShowForm(false)}
          />
        )}
      </main>
      
    </div>
  );
}
