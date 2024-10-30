import React, { useEffect } from 'react';
import api from './api'; // Adjust the import path as needed

const SomeComponent = () => {
  const fetchData = async () => {
    try {
      const { data } = await api.get('/shop'); // Replace with your protected route
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
  }, []);

  return <div>Some Content</div>;
};

export default SomeComponent;
