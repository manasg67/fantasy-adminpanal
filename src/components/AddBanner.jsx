
import React, { useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';

const AddBanner = ({ onClose }) => {
  const [formData, setFormData] = useState({
    image: null,
    category: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('image', formData.image);
    formDataToSend.append('category', formData.category);

    try {
      const response = await fetch('https://fantasy-collection-backend.onrender.com/api/uploadbanner', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to submit the banner');
      }

      const result = await response.json();
      console.log('Banner submitted successfully:', result);

      setFormData({
        image: null,
        category: '',
      });

      window.location.reload();
    } catch (error) {
      console.error('Error submitting the banner:', error.message);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: '0', overflowY: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh',marginTop:"10px" }}>
      <div style={{ backgroundColor: '#94a3b8', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'white' }}>Add Banner</h2>
          <button
            type="button"
            style={{ border: 'none', background: 'none' }}
            onClick={onClose}
          >
            <IoMdCloseCircle size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Category Dropdown */}
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="Category" style={{ display: 'block', color: 'white', marginBottom: '0.5rem' }}>
              Select Category
            </label>
            <select
              id="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
            >
              <option value="">Select a category</option>
              <option value="Festive">Festive</option>
              <option value="Woollen">Woollen</option>
            </select>
          </div>

          {/* Image Upload Field */}
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="Image" style={{ display: 'block', color: 'white', marginBottom: '0.5rem' }}>
              Upload Image
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
              Add Banner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBanner;
