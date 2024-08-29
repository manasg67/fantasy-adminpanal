// import React, { useState, useEffect } from 'react';
// import { HiOutlineDotsHorizontal } from 'react-icons/hi';
// import FormComponent from './FormComponent';

// export default function AdminPanel() {
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);
//   const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     if (isOpen) {
//       fetchCategories();
//     }
//   }, [isOpen]);

//   const fetchCategories = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch('https://fantasy-collection-backend.onrender.com/api/categories');
//       const data = await response.json();
//       setCategories(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchSubcategories = async (categoryId) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(`https://fantasy-collection-backend.onrender.com/api/subcategories/${categoryId}`);
//       const data = await response.json();
//       setSubcategories(data);
//       setSelectedCategoryId(categoryId);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCategoryClick = (categoryId) => {
//     if (selectedCategoryId === categoryId) {
//       setSelectedCategoryId(null);
//       setSubcategories([]);
//       setShowForm(false);
//     } else {
//       fetchSubcategories(categoryId);
//       setShowForm(false);
//     }
//   };

//   const handleSubcategoryClick = (subcategoryId) => {
//     setSelectedSubcategoryId(subcategoryId);
//     setShowForm(true);
//   };

//   const handleButtonClick = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Admin</h1>
//         <button onClick={handleButtonClick} className="text-2xl focus:outline-none">
//           <HiOutlineDotsHorizontal />
//         </button>
//       </header>

//       <main className="flex-1 p-4">
//         {isOpen && (
//           <div className="bg-white shadow-lg rounded-lg p-4">
//             {loading && <p className="text-center">Loading...</p>}
//             {error && <p className="text-red-500 text-center">{error}</p>}
//             {categories.length > 0 && (
//               <ul className="space-y-2">
//                 {categories.map((category) => (
//                   <li key={category._id} className="p-2 border-b border-gray-300">
//                     <button
//                       onClick={() => handleCategoryClick(category._id)}
//                       className="text-blue-500 hover:underline focus:outline-none"
//                     >
//                       {category.name}
//                     </button>
//                     {selectedCategoryId === category._id && subcategories.length > 0 && (
//                       <ul className="pl-4 mt-2 space-y-1">
//                         {subcategories.map((sub) => (
//                           <li key={sub._id}>
//                             <button
//                               onClick={() => handleSubcategoryClick(sub._id)} // Pass subcategoryId here
//                               className="text-gray-700 hover:underline focus:outline-none"
//                             >
//                               {sub.name}
//                             </button>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         )}

//         {showForm && (
//           <FormComponent 
//             categoryId={selectedCategoryId} 
//             subcategoryId={selectedSubcategoryId} // Pass subcategoryId to FormComponent
//             onClose={() => setShowForm(false)} 
//           />
//         )}
//       </main>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { HiPlus, HiMinus } from 'react-icons/hi';
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleAddButtonClick}
            style={{
              backgroundColor: 'green',
              color: 'white',
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
          {/* <button
            onClick={handleAddButtonClick}
            style={{
              backgroundColor: 'red',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '16px',
            }}
          >
            Delete Product
            <HiMinus style={{ marginLeft: '8px', fontSize: '20px' }} />
          </button> */}
        </div>
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
                              onClick={() => handleSubcategoryClick(sub._id)}
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

