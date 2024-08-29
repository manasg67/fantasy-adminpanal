// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; // Adjust path if needed
import Mainpage from './components/Mainpage'; // Adjust path if needed

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Define the route for the login page */}
          <Route path="/" element={<Login />} />
          
          {/* Define the route for the dashboard page */}
          <Route path="/mainpage" element={<Mainpage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
