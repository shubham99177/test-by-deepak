// OwnerProtect.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const OwnerProtect = ({ element }) => {
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');

  const owner = JSON.parse(localStorage.getItem('owner'));
 

  // Check if the user is authenticated and is an owner
  const isAuthenticated = !!token && !!id;
  const isOwner = owner ; 

  return isAuthenticated && isOwner ? element : <Navigate to="/" />;
};

export default OwnerProtect;
