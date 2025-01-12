import React from "react";

const CardSkelton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-pulse">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="w-full h-52 bg-gray-200"></div>
        <div className="p-4">
          <div className="h-5 bg-gray-200 rounded w-44"></div>
          <div className="h-4 bg-gray-200 rounded w-20 mt-2"></div>
          <div className="mt-4 flex justify-center items-center space-x-2">
            <div className="h-9 bg-gray-200 rounded w-full"></div>
            <div className="h-9 bg-gray-200 rounded w-full mt-2"></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="w-full h-52 bg-gray-200"></div>
        <div className="p-4">
          <div className="h-5 bg-gray-200 rounded w-44"></div>
          <div className="h-4 bg-gray-200 rounded w-20 mt-2"></div>
          <div className="mt-4 flex justify-center items-center space-x-2">
            <div className="h-9 bg-gray-200 rounded w-full"></div>
            <div className="h-9 bg-gray-200 rounded w-full mt-2"></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="w-full h-52 bg-gray-200"></div>
        <div className="p-4">
          <div className="h-5 bg-gray-200 rounded w-44"></div>
          <div className="h-4 bg-gray-200 rounded w-20 mt-2"></div>
          <div className="mt-4 flex justify-center items-center space-x-2">
            <div className="h-9 bg-gray-200 rounded w-full"></div>
            <div className="h-9 bg-gray-200 rounded w-full mt-2"></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="w-full h-52 bg-gray-200"></div>
        <div className="p-4">
          <div className="h-5 bg-gray-200 rounded w-44"></div>
          <div className="h-4 bg-gray-200 rounded w-20 mt-2"></div>
          <div className="mt-4 flex justify-center items-center space-x-2">
            <div className="h-9 bg-gray-200 rounded w-full"></div>
            <div className="h-9 bg-gray-200 rounded w-full mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSkelton;
