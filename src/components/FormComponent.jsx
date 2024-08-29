

import React, { useState, useEffect } from 'react';
import { IoMdCloseCircle } from 'react-icons/io'; // Import the icon here

const FormComponent = ({ categoryId, subcategoryId, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    image: null,
    subcategoryId: subcategoryId || '',
  });

  useEffect(() => {
    if (subcategoryId) {
      setFormData((prevData) => ({
        ...prevData,
        subcategoryId: subcategoryId,
      }));
    }
  }, [subcategoryId]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('type', formData.type);
    formDataToSend.append('categoryID', formData.subcategoryId);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const response = await fetch('https://fantasy-collection-backend.onrender.com/api/products', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);

      setFormData({
        name: '',
        description: '',
        type: '',
        image: null,
        subcategoryId: subcategoryId || '',
      });

      window.location.reload();
    } catch (error) {
      console.error('Error submitting the form:', error.message);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: '0', overflowY: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#94a3b8', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'white' }}>Add Product</h2>
          <button
            type="button"
            style={{ border: 'none', background: 'none' }}
            onClick={onClose}
          >
            <IoMdCloseCircle size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Subcategory ID Field */}
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="SubcategoryId" style={{ display: 'block', color: 'white', marginBottom: '0.5rem' }}>
              Subcategory ID
            </label>
            <input
              type="text"
              id="SubcategoryId"
              name="subcategoryId"
              value={formData.subcategoryId}
              readOnly
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
            />
          </div>

          {/* Name Field */}
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="Name" style={{ display: 'block', color: 'white', marginBottom: '0.5rem' }}>
              Name
            </label>
            <input
              type="text"
              id="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
            />
          </div>

          {/* Description Field */}
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="Description" style={{ display: 'block', color: 'white', marginBottom: '0.5rem' }}>
              Description
            </label>
            <textarea
              id="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
            />
          </div>

          {/* Type Field */}
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="Type" style={{ display: 'block', color: 'white', marginBottom: '0.5rem' }}>
              Type
            </label>
            <select
              id="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
            >
              <option value="">Select a type</option>
              <option value="Western">Western</option>
              <option value="Ethnic">Ethnic</option>
              <option value="Nightwear">Nightwear</option>
              <option value="SwimSuits">SwimSuit</option>
            </select>
          </div>

          {/* Image Field */}
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="Image" style={{ display: 'block', color: 'white', marginBottom: '0.5rem' }}>
              Image
            </label>
            <input
              type="file"
              id="Image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
            />
          </div>

          {/* Submit Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button
              type="submit"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #059669', backgroundColor: '#22c55e', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '0.5rem 1rem', borderRadius: '0.375rem', color: 'white' }}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;
