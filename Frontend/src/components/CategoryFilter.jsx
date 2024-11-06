import React from 'react';

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="mb-6 mt-2 flex flex-wrap space-x-2 space-y-2 sm:space-x-4 sm:space-y-0 items-center">
      <button
        className={`h-10 lg:h-auto lg:px-3 lg:py-2 px-2 py-1 text-xs lg:text-sm rounded-md ${
          selectedCategory === 'Hero' ? ' bg-cyan-400 shadow-cyan-500/50 hover:bg-cyan-600 text-white' : 'bg-gray-300'
        }`}
        onClick={() => setSelectedCategory('Hero') 

        }
      >
        SuperHeros
      </button>

      <button
        className={`h-10 lg:h-auto lg:px-3 lg:py-2 px-2 py-1 text-xs lg:text-sm rounded-md ${
          selectedCategory === 'Biography' ? 'bg-cyan-400 shadow-cyan-500/50 hover:bg-cyan-600 text-white' : 'bg-gray-300'
        }`}
        onClick={() => setSelectedCategory('Biography')}
      >
        Biography
      </button>

      <button
        className={`h-10 lg:h-auto lg:px-3 lg:py-2 px-2 py-1 text-xs lg:text-sm rounded-md ${
          selectedCategory === 'Comic' ? 'bg-cyan-400 shadow-cyan-500/50 hover:bg-cyan-600 text-white' : 'bg-gray-300'
        }`}
        onClick={() => setSelectedCategory('Comic')}
      >
        Comic
      </button>

      <button
        className={`h-10 lg:h-auto lg:px-3 lg:py-2 px-2 py-1 text-xs lg:text-sm rounded-md ${
          selectedCategory === 'Cartoon' ? 'bg-cyan-400 shadow-cyan-500/50 hover:bg-cyan-600 text-white' : 'bg-gray-300'
        }`}
        onClick={() => setSelectedCategory('Cartoon')}
      >
        Cartoon
      </button>

      <button
        className={`h-10 lg:h-auto lg:px-3 lg:py-2 px-2 py-1 text-xs lg:text-sm rounded-md ${
          selectedCategory === 'Programming' ? 'bg-cyan-400 shadow-cyan-500/50 hover:bg-cyan-600 text-white' : 'bg-gray-300'
        }`}
        onClick={() => setSelectedCategory('Programming')}
      >
        Programming
      </button>
      <button
        className={`h-10 lg:h-auto lg:px-3 lg:py-2 px-2 py-1 text-xs lg:text-sm rounded-md ${
          selectedCategory === 'Business' ? 'bg-cyan-400 shadow-cyan-500/50 hover:bg-cyan-600 text-white' : 'bg-gray-300'
        }`}
        onClick={() => setSelectedCategory('Business')}
      >
        Business Learning
      </button>
      <button
        className="h-10 lg:h-auto lg:px-3 lg:py-2 px-2 py-1 text-xs lg:text-sm rounded-md bg-red-400 shadow-red-500/50  text-white"
        onClick={() => setSelectedCategory('')}
      >
        Clear Filter
      </button>
    </div>
  );
};

export default CategoryFilter;
