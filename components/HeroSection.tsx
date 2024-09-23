import React from 'react';
import Image from 'next/image';
import AppleLogo from '../public/apple-logo.png';

const HeroSection: React.FC = () => {
  return (
    <div className="bg-white text-black min-h-screen flex flex-col items-center justify-center px-4">
      <div className="mb-8">
        <Image
          src={AppleLogo}
          alt="Apple Logo"
          width={120}
          height={120}
          className="mx-auto"
        />
      </div>
      
      <h1 className="text-5xl font-bold mb-4 text-center">
        Web development made easiest*
      </h1>
      
      <p className="text-xl mb-8 text-center text-gray-600">
        Building the impossible in a few weeks or less.
      </p>
      
      <div className="flex gap-4 mb-12">
        <button className="bg-black text-white px-6 py-3 rounded-full font-medium">
          See Work: Interactive Experience
        </button>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium">
          Talk with us
        </button>
      </div>
      
      <p className="text-sm mb-8 text-gray-500">
        Trusted by small businesses and enterprises alike.
      </p>
      
      <div className="flex flex-wrap justify-center gap-8">
        {['TATA TECHNOLOGIES', 'PEOPLENOISE', 'Serene Islands Sanctuary', 'MARV STUDIO', 'BlenderBin', 'Webflow', 'ERAVISTA', 'Pxl_Pck'].map((company, index) => (
          <div key={index} className="text-xs text-gray-400">
            {company}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;