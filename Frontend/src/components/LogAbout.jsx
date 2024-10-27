import React from 'react';
import LogNav from './LogNav';

const LogAbout = () => {
  return (
    <>
    <LogNav/>
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-1 md:px-10 md:py-10 mt-20 mb-3">
      <div className="max-w-4xl w-full text-center bg-white p-8 rounded-lg shadow-lg mt-3 md:mt-3">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-black">About Us</h1>
        <p className="text-base md:text-lg mb-4 text-gray-700">
          Welcome to Sactch, your number one source for all things [product, i.e., electronics, apparel, etc.]. We're dedicated to providing you the very best of [product], with an emphasis on quality, customer service, and uniqueness.
        </p>
        <p className="text-base md:text-lg mb-4 text-gray-700">
          Founded in 2024 by Deepak Rathore, Sactch has come a long way from its beginnings in [starting location]. When [founder name] first started out, [his/her/their] passion for [brand's passion, i.e., eco-friendly cleaning products] drove them to start their own business.
        </p>
        <p className="text-base md:text-lg mb-4 text-gray-700">
          We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
        </p>
        <p className="text-base md:text-lg mb-4 text-gray-700">
          Sincerely,<br />
          Deepak Rathore
        </p>
      </div>

      <div className="max-w-4xl w-full mt-10 md:mt-16 ">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-black">Our Team</h2>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
            <img src="https://tse3.mm.bing.net/th?id=OIP.h_6BkC8gtDIwXLwW33zWTQHaHa&pid=Api&P=0&h=180" alt="Founder" className="w-32 h-32 rounded-full mb-4 object-cover shadow-md" />
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800">Deepak Rathore</h3>
            <p className="text-gray-500">Founder & CEO</p>
          </div>
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
            <img src="https://www.seekpng.com/png/detail/60-604032_face-businessman-png-dummy-images-for-testimonials.png" alt="Team Member" className="w-32 h-32 rounded-full mb-4 object-cover shadow-md" />
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800">John Doe</h3>
            <p className="text-gray-500">Manager</p>
          </div>
          
          {/* Add more team members as needed */}
        </div>
      </div>
    </div>
    </>
  );
};

export default LogAbout;
