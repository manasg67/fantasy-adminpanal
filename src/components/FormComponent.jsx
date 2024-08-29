// import React, { useState, useEffect } from 'react';

// const FormComponent = ({ categoryId, subcategoryId, onClose }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     type: '',
//     image: null,
//     subcategoryId: subcategoryId || '', // Initialize with the passed subcategoryId
//   });

//   useEffect(() => {
//     console.log('Received subcategoryId:', subcategoryId);
//     if (subcategoryId) {
//       setFormData((prevData) => ({
//         ...prevData,
//         subcategoryId: subcategoryId,
//       }));
//     }
//   }, [subcategoryId]);

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'file' ? files[0] : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Prepare the form data to be sent
//     const formDataToSend = new FormData();
//     formDataToSend.append('name', formData.name);
//     formDataToSend.append('description', formData.description);
//     formDataToSend.append('type', formData.type);
//     formDataToSend.append('categoryID', formData.subcategoryId);
//     if (formData.image) {
//       formDataToSend.append('image', formData.image);
//     }

//     try {
//       const response = await fetch('https://fantasy-collection-backend.onrender.com/api/products', {
//         method: 'POST',
//         body: formDataToSend,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to submit the form');
//       }

//       const result = await response.json();
//       console.log('Form submitted successfully:', result);

//       // Optionally reset the form or show a success message
//       setFormData({
//         name: '',
//         description: '',
//         type: '',
//         image: null,
//         subcategoryId: subcategoryId || '',
//       });
      
//       window.location.reload();

//     } catch (error) {
//       console.error('Error submitting the form:', error.message);
//     }
//   };

//   return (
//     <section className="bg-white">
//       <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
//         <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
//           <div className="max-w-xl lg:max-w-3xl">
//             <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
//               Add Product
//             </h1>

//             <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">

//               <div className="col-span-6">
//                 <label htmlFor="SubcategoryId" className="block text-sm font-medium text-gray-700">
//                   Subcategory ID
//                 </label>
//                 <input
//                   type="text"
//                   id="SubcategoryId"
//                   name="subcategoryId"
//                   value={formData.subcategoryId}
//                   readOnly
//                   className="mt-1 w-full rounded-md border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-sm"
//                 />
//               </div>

//               <div className="col-span-6">
//                 <label htmlFor="Name" className="block text-sm font-medium text-gray-700">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   id="Name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//               </div>

//               <div className="col-span-6">
//                 <label htmlFor="Description" className="block text-sm font-medium text-gray-700">
//                   Description
//                 </label>
//                 <textarea
//                   id="Description"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//               </div>

//               <div className="col-span-6">
//   <label htmlFor="Type" className="block text-sm font-medium text-gray-700">
//     Type
//   </label>
//   <select
//     id="Type"
//     name="type"
//     value={formData.type}
//     onChange={handleChange}
//     className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//   >
//     <option value="">Select a type</option>
//     <option value="Western">Western</option>
//     <option value="Ethnic">Ethnic</option>
//     <option value="Nightwear">Nightwear</option>
//     <option value="SwimSuits">SwimSuit</option>

//     {/* Add more options as needed */}
//   </select>
// </div>


//               <div className="col-span-6">
//                 <label htmlFor="Image" className="block text-sm font-medium text-gray-700">
//                   Image
//                 </label>
//                 <input
//                   type="file"
//                   id="Image"
//                   name="image"
//                   accept="image/*"
//                   onChange={handleChange}
//                   className="mt-1 w-full"
//                 />
//               </div>

//               <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
//                 <button
//                   type="submit"
//                   className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
//                 >
//                   Submit
//                 </button>

//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="inline-block shrink-0 rounded-md border border-gray-600 bg-gray-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring active:text-gray-600 mt-4 sm:mt-0"
//                 >
//                   Close
//                 </button>
//               </div>
//             </form>
//           </div>
//         </main>
//       </div>
//     </section>
//   );
// };

// export default FormComponent;

import React, { useState, useEffect } from 'react';

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
    <div
      style={{
        position: 'fixed',
        inset: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '1000',
      }}
    >
      <section
        style={{
          backgroundColor: '#16a34a', // Green background
          borderRadius: '16px', // Rounded edges
          color: '#facc15', // Yellow text
          maxWidth: '500px',
          width: '90%',
          padding: '20px', // Padding inside the form
          border: '2px solid black', // Black border
          textAlign: 'center', // Center text
        }}
      >
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '20px',
            fontFamily: 'Arial, sans-serif', // Change to a more stylish font as needed
          }}
        >
          Add Product
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col mb-4">
            <label htmlFor="SubcategoryId" className="block text-sm font-medium font-semibold mb-1">
              Subcategory ID
            </label>
            <input
              type="text"
              id="SubcategoryId"
              name="subcategoryId"
              value={formData.subcategoryId}
              readOnly
              className="mt-1 w-full rounded-lg border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-md p-2"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="Name" className="block text-sm font-medium font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              id="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border-gray-200 bg-white text-sm text-gray-700 shadow-md p-2"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="Description" className="block text-sm font-medium font-semibold mb-1">
              Description
            </label>
            <textarea
              id="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border-gray-200 bg-white text-sm text-gray-700 shadow-md p-2"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="Type" className="block text-sm font-medium font-semibold mb-1">
              Type
            </label>
            <select
              id="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border-gray-200 bg-white text-sm text-gray-700 shadow-md p-2"
            >
              <option value="">Select a type</option>
              <option value="Western">Western</option>
              <option value="Ethnic">Ethnic</option>
              <option value="Nightwear">Nightwear</option>
              <option value="SwimSuits">SwimSuit</option>
            </select>
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="Image" className="block text-sm font-medium font-semibold mb-1">
              Image
            </label>
            <input
              type="file"
              id="Image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border-gray-200 text-sm text-gray-700 shadow-md p-2"
            />
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="inline-block rounded-md border border-yellow-500 bg-yellow-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-transparent hover:text-yellow-500 focus:outline-none focus:ring active:text-yellow-400"
              style={{ marginRight: '10px' }}
            >
              Submit
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-block rounded-md border border-yellow-500 bg-yellow-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-transparent hover:text-yellow-500 focus:outline-none focus:ring active:text-yellow-400"
            >
              Close
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default FormComponent;




