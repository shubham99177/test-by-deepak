import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-around items-center">
        <div className="flex items-center mb-2 md:mb-0">
          <img src="logo.png" alt="Company Logo" className="h-16 mr-0.5" /> {/* Adjust the height as needed */}
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
          <p className="text-center md:text-left mb-2 md:mb-0">
          <i className="fas fa-envelope mr-2"></i>
          <a href="mailto:info@yourcompany.com">
            info@Scrach.com
          </a>
        </p>
          <div className="flex space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
