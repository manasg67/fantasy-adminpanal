import React, { useState, useEffect } from 'react';
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

  const fetchProducts = async (subcategoryId) => {
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

  const handleSubCategoryClick = (subcategoryId) => {
    if (selectedsubCategoryId === subcategoryId) {
      setSelectedsubCategoryId(null);
      setProducts([]); // Clear products when deselecting a subcategory
    } else {
      setSelectedsubCategoryId(subcategoryId);
      fetchProducts(subcategoryId);
    }
  };

  const handleButtonClick = () => {
    setIsOpen(true); // Open modal
  };

  const handleCloseModal = () => {
    setIsOpen(false); // Close modal
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
    <div>
      {/* Open Modal Button */}
      <button
        onClick={handleButtonClick}
        style={{
          backgroundColor: '#dc2626',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          fontSize: '16px',
        }}
      >
        <span>Delete Product</span>
        <HiMinus style={{ marginLeft: '8px', fontSize: '24px' }} />
      </button>

      {isOpen && (
        <div>
          {/* Close Modal Button */}
          <button
            onClick={handleCloseModal}
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              padding: '8px',
              cursor: 'pointer',
              fontSize: '20px',
            }}
          >
            &times;
          </button>

          {/* Error Message */}
          {error && <p style={{ color: '#dc2626', textAlign: 'center', marginBottom: '16px' }}>{error}</p>}

          {/* Categories List */}
          {categories.length > 0 && (
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: '16px', flex: '1' }}>
                <ul style={{ marginBottom: '8px' }}>
                  {categories.map((category) => (
                    <li key={category._id} style={{ padding: '8px', borderBottom: '1px solid #d1d5db' }}>
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
                        <ul style={{ paddingLeft: '16px', marginTop: '8px' }}>
                          {subcategories.map((sub) => (
                            <li key={sub._id}>
                              <button
                                onClick={() => handleSubCategoryClick(sub._id)}
                                style={{
                                  color: '#4b5563',
                                  textDecoration: 'underline',
                                  cursor: 'pointer',
                                  outline: 'none',
                                  background: 'none',
                                  border: 'none',
                                  padding: '0',
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
              </div>

              {/* Products List */}
              {selectedsubCategoryId && products.length > 0 && (
                <div style={{ flex: '2' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Products:</h3>
                  <ul style={{ marginTop: '8px', padding: 0 }}>
                    {products.map((product) => (
                      <li key={product._id} style={{ padding: '8px', borderBottom: '1px solid #d1d5db', display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', flex: '1' }}>
                          <img src={product.image} alt={product.name} style={{ objectFit: 'contain', height: 140, width: 140, marginRight: '16px' }} />
                          {product.name}
                        </div>
                        <button
                          onClick={() => deleteProduct(product._id)}
                          style={{
                            marginLeft: 'auto',
                            fontSize: '14px',
                            height: 50,
                            width: 80,
                            backgroundColor: '#dc2626',
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '4px',
                            cursor: 'pointer',
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
          )}
        </div>
      )}
    </div>
  );
}
