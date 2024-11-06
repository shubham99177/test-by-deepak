import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white  z-50 shadow-md items-center"> {/* Add sticky and top-0 */}
      <div className="max-w-7xl p-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-12">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
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
            <Link to="/shop">
              <div className="flex items-center pl-7 flex-shrink-0 text-center ">
                <img className="h-20 w-auto" src="logo.png" alt="" />
                <p to="/shop" className="text-black text-2xl font-bold hover:text-cyan-500">
                  Scrach
                </p>
              </div>
            </Link>

            <div className="hidden sm:block">
              <div className="flex space-x-3">
                
                <Link
                  to="/cart"
                  className="text-black hover:text-gray px-3 py-2 rounded-md text-sm font-medium"
                >
                  Cart
                </Link>
                <Link
                  to="/orders"
                  className="text-black hover:text-gray px-3 py-2 rounded-md text-sm font-medium"
                >
                  Orders
                </Link>
                <Link
                  to="/about"
                  className="text-black hover:text-gray px-3 py-2 rounded-md text-sm font-medium"
                >
                  About us
                </Link>
                <Link
            to="/contact"
            className="text-black hover:text-gray px-3 py-2 rounded-md text-sm font-medium"
            onClick={() => setIsOpen(false)}
          >
            Contact us
          </Link>
                <Logout />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${isOpen ? "block" : "hidden"} sm:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/shop"
            className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Shop
          </Link>
          
          <Link
            to="/cart"
            className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Cart
          </Link>
          <Link
            to="/orders"
            className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Orders
          </Link>
          <Link
            to="/about"
            className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            About us
          </Link>
          <Link
            to="/contact"
            className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Contact us
          </Link>
          <Logout />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
