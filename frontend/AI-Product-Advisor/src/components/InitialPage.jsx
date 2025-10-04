import React from 'react';
import CardsAnimation from '../ui/CardsAnimation';

// An array of the feature strings. This makes it easier to map and apply animations.
const features = [
  "Ask in Plain English",
  "Smart AI Matching",
  "Discover Tailored Products",
  "Understand the Why",
  "Get Personalized Results",
  "No Keywords, Just Conversation",
  "From Needs → To Products",
  "Your Personal AI Shopping Guide",
  "Explain. Match. Recommend.",
  "Smarter Search, Better Choices",
];

// To make the animation work, add this keyframe animation to your global CSS file (e.g., globals.css)
/*

*/

const InitialPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-white text-black p-6 overflow-hidden'>
      <div>
        
      </div>
      <div className='text-center mb-12'>
        <h1 className='
          text-4xl md:text-6xl 
          font-extrabold 
          bg-clip-text text-transparent 
          bg-gradient-to-r from-purple-400 to-cyan-400
          pb-2
        '>
          Welcome to AI Product Advisor
        </h1>
        <p className="text-gray-400 text-lg mt-2">Your personal guide to smarter choices.</p>
      </div>

      {/* <div>
        <CardsAnimation />
      </div> */}

      <div className="flex flex-row flex-wrap gap-4 items-center justify-center max-w-4xl">
        {features.map((feature, index) => (
          <span
            key={feature}
            className='
              bg-gray-100 border border-blue-300 
              text-blue-500 text-sm font-medium 
              px-4 py-2 rounded-full 
              animate-fadeInUp
            '
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {feature}
          </span>
        ))}
      </div>
    </div>
  );
};

export default InitialPage;