import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/old-books-arranged-on-shelf-royalty-free-image-1572384534.jpg?crop=1.00xw:0.752xh;0,0.197xh&resize=1200:*',
      text: 'Amazing Reading Book Art',
    },
    {
      url: 'https://www.comicbasics.com/wp-content/uploads/2019/02/Best-Superhero-Movies-Of-The-Last-10-Years-1.jpg',
      text: 'SuperHeros Book Art',
    },
    {
      url: 'https://images-cdn.reedsy.com/discovery/post/17/featured_image/large_4776661e463298030274c2929f3ece3313153fe3.jpg',
      text: 'Biography And Self Help Books',
    },
    {
      url: 'https://wallpaperaccess.com/full/5673880.png',
      text: 'Programming Books',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] mx-auto mt-20 overflow-hidden ">
      <div className="relative w-full h-full">
        {images.map((image, idx) => (
          <div
            key={idx}
            className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out transform ${
              currentIndex === idx ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
            }`}
          >
            <img src={image.url} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover " />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white p-4 text-center">
              <h2 className="text-lg sm:text-2xl md:text-4xl font-bold mb-4">
                {image.text}
              </h2>
              <Link to="/shop">
                <button className="bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white font-semibold py-2 px-6 rounded-lg text-sm sm:text-base md:text-lg">
                  Explore Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center items-center mt-4 absolute bottom-2 left-0 right-0">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-1 mx-2 rounded-full ${
              currentIndex === idx ? 'bg-cyan-500' : 'bg-gray-300'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
