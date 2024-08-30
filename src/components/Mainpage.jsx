import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Addproduct from './AddProduct';
import CategoryDropdown from './CategoryDropdown';

export default function App() {
  return (
   
    <div className="min-h-screen bg-gray-100">
      <Header/>
      <div style={{display:"flex",flexDirection:"row",justifyContent:"space-around",marginTop:50,gap:"200px"}}>
        <div> <Addproduct /></div>
        <div><CategoryDropdown/></div>
      </div>
     
      {/* Add other components like Sidebar, MainContent here */}
    </div>
  
  );
}
