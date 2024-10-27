// src/components/ProtectedRoute.js
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Effect to clear token and user ID on navigation to /
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.removeItem('token'); // Remove token
      localStorage.removeItem('userid'); // Remove user ID (if applicable)
    }
  }, [isAuthenticated]);

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;




//testing code UserProtect.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ element }) => {
//   const token = localStorage.getItem('token');
//   const userid = localStorage.getItem('userid');

//   // const owner = JSON.parse(localStorage.getItem(''));
 

//   // Check if the user is authenticated and is an owner
//   const isAuthenticated = !!token && !!userid;
//   // const isOwner = owner ; 

//   return isAuthenticated ? element : <Navigate to="/" />;
// };

// export default ProtectedRoute;

