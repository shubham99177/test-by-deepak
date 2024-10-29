// Index.js
import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import LogNav from '../components/LogNav';

const Index = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center space-y-4 lg:space-y-0 lg:space-x-10 px-6 py-4 h-screen w-full bg-gray-200">
      <LogNav />
      {/* Conditionally render Register or Login based on screen size and state */}
      <div className="w-full lg:w-1/2">
        {isLogin ? (
          <div className="lg:hidden"> {/* For mobile view - Register */}
            <Register />
            <div className="text-center sm:hidden pb-20">
              <span className="text-blue-500 cursor-pointer" onClick={toggleForm}>
                Already have an account? Login
              </span>
            </div>
          </div>
        ) : (
          <div className="lg:hidden"> {/* For mobile view - Login */}
            <Login />
            <div className="text-center sm:hidden pb-20">
              <span className="text-blue-500 cursor-pointer" onClick={toggleForm}>
                Don't have an account? Register
              </span>
            </div>
          </div>
        )}

        <div className="hidden lg:block"> {/* For desktop view - Register */}
          <Register />
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <div className="hidden lg:block"> {/* For desktop view - Login */}
          <Login />
        </div>
      </div>
    </div>
  );
};

export default Index;