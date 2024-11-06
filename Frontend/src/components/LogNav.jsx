import React, { useState } from "react";
import { Link } from "react-router-dom";

const LogNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Check if the owner is logged in
  const isOwnerLoggedIn = localStorage.getItem('owner') !== null;

  // Handler for owner logout
  const handleOwnerLogout = () => {
    localStorage.removeItem('owner'); // Clear owner information
    localStorage.removeItem('token'); // Clear owner token
    localStorage.removeItem('id'); // Clear owner ID
    // Redirect or perform any other necessary actions on logout
    window.location.reload(); // Example: reload the page to reflect changes
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-md">
      <div className="max-w-7xl p-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-12">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="flex-1 flex items-center justify-between">
            <Link to="/">
              <div className="flex items-center pl-7 flex-shrink-0">
                <img className="h-20 w-auto" src="logo.png" alt="Logo" />
                <p className="text-black text-2xl font-bold">Scrach</p>
              </div>
            </Link>

            {/* Login button for small devices */}
            <div className="sm:hidden">
              {isOwnerLoggedIn ? (
                <button
                  onClick={handleOwnerLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded shadow-lg shadow-red-500/50 hover:bg-red-600 transition duration-200"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login">
                  <button className="bg-cyan-500 text-white px-4 py-2 rounded shadow-lg shadow-cyan-500/50 hover:bg-cyan-600 transition duration-200">
                    Login
                  </button>
                </Link>
              )}
            </div>

            <div className="hidden sm:flex items-center space-x-3">
            {isOwnerLoggedIn && (
              <>
                <Link
                  to="/create"
                  className="text-black hover:text-gray px-3 py-2 rounded-md text-sm font-medium"
                >
                  Create
                </Link>
                <Link
                  to="/allorders"
                  className="text-black hover:text-gray px-3 py-2 rounded-md text-sm font-medium"
                >
                  Orders
                </Link>
                </>
              )}
              <Link
                to="/aboutus"
                className="text-black hover:text-gray px-3 py-2 rounded-md text-sm font-medium"
              >
                About us
              </Link>
              <Link
                to="/contactus"
                className="text-black hover:text-gray px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact us
              </Link>

              {/* Show the Create button if the owner is logged in */}
              

              {/* Conditional rendering of Login or Owner Logout button */}
              {isOwnerLoggedIn ? (
                <button
                  onClick={handleOwnerLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded shadow-lg shadow-red-500/50 hover:bg-red-600 transition duration-200"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login">
                  <button className="bg-cyan-400 text-white px-4 py-2 rounded shadow-lg shadow-cyan-500/50 hover:bg-cyan-600 transition duration-200">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } sm:hidden flex flex-col justify-between bg-white`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          
          <Link
            to="/"
            className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          {isOwnerLoggedIn && (
            <>
            <Link
              to="/create"
              className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Create
            </Link>
            <Link
            to="/allorders"
            className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Orders
          </Link>
          </>
          )}
          <Link
            to="/aboutus"
            className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            About us
          </Link>
          <Link
            to="/contactus"
            className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Contact us
          </Link>

          {/* Show the Create link in the mobile menu if the owner is logged in */}
          
        </div>
      </div>
    </nav>
  );
};

export default LogNav;
