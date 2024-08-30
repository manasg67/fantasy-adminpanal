// PrivateRoute.js
// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('authToken') === '123456abcdef'; // Your static token check

  return (
    <Route
      {...rest}
      element={isAuthenticated ? Element : <Navigate to="/" />}
    />
  );
};

export default PrivateRoute;

