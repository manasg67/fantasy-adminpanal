
import React, { useState, useEffect } from 'react';
import Header from './Header';
import { HiMinus } from 'react-icons/hi';

export default function CategoryDropdown() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedsubCategoryId, setSelectedsubCategoryId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  useEffect(() => {
    console.log("Selected subcategory>>>>", selectedsubCategoryId);
  }, [selectedsubCategoryId]);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://fantasy-collection-backend.onrender.com/api/categories');
      const data = await response.json();
      console.log('Categories fetched>>>', data);
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
      console.log('Subcategories>>>', data);
      setSubcategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchproducts = async (subcategoryId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://fantasy-collection-backend.onrender.com/api/${subcategoryId}/products`);
      const data = await response.json();
      console.log('Products>>>', data);
      setProducts(data);
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
      setProducts([]);
    } else {
      fetchSubcategories(categoryId);
      setSelectedCategoryId(categoryId);
      setSelectedsubCategoryId(null); // Clear subcategory selection when changing category
    }
  };

  const handlesubCategoryClick = (subcategoryId) => {
    if (selectedsubCategoryId === subcategoryId) {
      setSelectedsubCategoryId(null);
      setProducts([]); // Clear products when deselecting a subcategory
    } else {
      setSelectedsubCategoryId(subcategoryId);
      fetchproducts(subcategoryId);
    }
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const deleteProduct = async (productId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://fantasy-collection-backend.onrender.com/api/products/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the deleted product from the products array without refetching
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
        console.log(`Product with ID ${productId} deleted successfully`);
      } else {
        throw new Error('Failed to delete the product');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Delete Product Button */}
      <button
        onClick={handleButtonClick}
        style={{
          position: 'fixed', // Changed from 'absolute' to 'fixed'
          top: '16px',
          right: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#dc2626',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '18px',
          fontWeight: '600',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
          zIndex: '40'
        }}
      >
        <span>Delete Product</span>
        <HiMinus style={{ marginLeft: '8px', fontSize: '24px' }} />
      </button>

      {/* Full Page Loader with Heartbeat Effect */}
      {loading && (
        <div
          style={{
            position: 'fixed',
            width:"100%",
            inset: '0',
            backgroundColor: 'rgba(31, 41, 55, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '50'
          }}
        >
          <img
            src="/loadingbgremove.png"
            alt="Loading"
            style={{ width: '128px', height: '128px', animation: 'heartbeat 1.5s infinite' }}
          />
        </div>
      )}

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '64px',
            right: '16px',
            backgroundColor: 'white',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '16px',
            width: '100%',
            zIndex: '40',
            flex:1,
            flexDirection:"row"
          }}
        >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
  {/* Error Message */}
  {error && <p style={{ color: '#dc2626', textAlign: 'center', marginRight: '16px' }}>{error}</p>}

  {/* Categories List */}
  {categories.length > 0 && (
    <ul style={{ marginBottom: '8px', marginRight: '16px' }}>
      {categories.map((category) => (
        <li key={category._id} style={{ padding: '8px', borderBottom: '1px solid #d1d5db' }}>
          <button
            onClick={() => handleCategoryClick(category._id)}
            style={{
              color: '#3b82f6',
              textDecoration: 'underline',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {category.name}
          </button>
          {selectedCategoryId === category._id && subcategories.length > 0 && (
            <ul style={{ paddingLeft: '16px', marginTop: '8px' }}>
              {subcategories.map((sub) => (
                <li key={sub._id}>
                  <button
                    onClick={() => handlesubCategoryClick(sub._id)}
                    style={{
                      color: '#4b5563',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
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

  
            {/* Products List */}
            {selectedsubCategoryId && products.length > 0 && (
              <div style={{ marginTop: '16px', width: '100%' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Products:</h3>
                <ul style={{ marginTop: '8px', padding: 0 }}>
                  {products.map((product) => (
                    <li key={product._id} style={{ padding: '8px', borderBottom: '1px solid #d1d5db', display: "flex", flexDirection: 'row', alignItems: "center" }}>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '70%' }}>
                      {product.name}
                        <img src={product.image} alt={product.name} style={{ objectFit: "contain", height: 140, width: 140 }} />
                       
                      </div>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        style={{
                          marginTop: '8px',
                          marginLeft: 'auto',
                          fontSize: '14px',
                          height: 50,
                          width: 80,
                          backgroundColor: '#dc2626',
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          zIndex: '50'
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}