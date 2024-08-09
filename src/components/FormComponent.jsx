

import React, { useState, useEffect } from 'react';

const FormComponent = ({ categoryId, subcategoryId, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    image: null,
    categoryId: categoryId || '',
    subcategoryId: subcategoryId || '', // Initialize with the passed subcategoryId
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    // Here you would typically make an API request to submit the form data
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Add Product
            </h1>

            <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="CategoryId" className="block text-sm font-medium text-gray-700">
                  Category ID
                </label>
                <input
                  type="text"
                  id="CategoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  readOnly
                  className="mt-1 w-full rounded-md border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="SubcategoryId" className="block text-sm font-medium text-gray-700">
                  Subcategory ID
                </label>
                <input
                  type="text"
                  id="SubcategoryId"
                  name="subcategoryId"
                  value={formData.subcategoryId}
                  readOnly
                  className="mt-1 w-full rounded-md border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="Name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="Description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="Type" className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <input
                  type="text"
                  id="Type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="Image" className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  id="Image"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="mt-1 w-full"
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Submit
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="inline-block shrink-0 rounded-md border border-gray-600 bg-gray-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring active:text-gray-600 mt-4 sm:mt-0"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default FormComponent;
