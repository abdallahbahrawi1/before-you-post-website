import React from 'react';
import '../styles/app.css'; // Import the CSS
import { FaRegHandshake, FaShareAlt, FaUsers } from 'react-icons/fa';
import Image from 'next/image';
import supportImage from '../../../../public/assets/support.jpg';


const FeaturesImage = () => (
  <div className="w-[350px] mx-auto mb-2 relative -top-5">
    <Image
      className="animate-float w-full h-auto filter drop-shadow-md"
      src={supportImage}
      alt="Support Image"
      layout="responsive"
    />
  </div>
);

const FeaturesSection = () => {
  return (
    <section className="hero-section">
      <div className="max-w-[900px] mx-auto w-full text-center text-white z-10">
        <FeaturesImage />
        <h1 className="text-[2.2rem] mb-[0.8rem] text-white">Connect, Share, Grow Together</h1>
        <p className="text-[1.1rem] mb-[1.5rem] text-[rgba(255,255,255,0.9)]">Join our supportive community today</p>

        <div className="grid grid-cols-3 gap-5">
          <div className="flex flex-col items-center bg-white/10 p-5 rounded-lg backdrop-blur-sm transition-transform duration-300 hover:translate-y-[-5px]">
            <FaUsers className="w-9 h-9 text-white mb-3" />
            <h3 className="text-white text-base mb-2">Connect</h3>
            <p className="text-white/90 text-sm leading-5 text-center">Build meaningful relationships</p>
          </div>

          <div className="flex flex-col items-center bg-white/10 p-5 rounded-lg backdrop-blur-sm transition-transform duration-300 hover:translate-y-[-5px]">
            <FaShareAlt className="w-9 h-9 text-white mb-3" />
            <h3 className="text-white text-base mb-2">Share</h3>
            <p className="text-white/90 text-sm leading-5 text-center">Exchange ideas freely</p>
          </div>

          <div className="flex flex-col items-center bg-white/10 p-5 rounded-lg backdrop-blur-sm transition-transform duration-300 hover:translate-y-[-5px]">
            <FaRegHandshake className="w-9 h-9 text-white mb-3" />
            <h3 className="text-white text-base mb-2">Grow</h3>
            <p className="text-white/90 text-sm leading-5 text-center">Achieve your goals together</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
