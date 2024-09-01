

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Addproduct from './AddProduct';
import CategoryDropdown from './CategoryDropdown';
import AddBanner from './AddBanner';

export default function Mainpage() {
  const [showAddBanner, setShowAddBanner] = useState(false);

  const handleAddBannerClick = () => {
    setShowAddBanner(true);
  };

  const handleCloseBanner = () => {
    setShowAddBanner(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 50,
          gap: '100px',
        }}
      >
        <div>
          <Addproduct />
        </div>
        
        {/* Add Banner Button and Component */}
        <div>
          {/* Button to trigger Add Banner */}
          <button
            onClick={handleAddBannerClick}
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
            Add Banner
          </button>
          
          {showAddBanner && <AddBanner onClose={handleCloseBanner} />}
        </div>

        <div>
          <CategoryDropdown />
        </div>
      </div>
    </div>
  );
}
