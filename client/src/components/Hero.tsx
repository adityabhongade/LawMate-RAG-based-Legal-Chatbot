import { Link } from "wouter";

const Hero = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="flex items-center mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-[#0a1f44]">Law Mate</h1>
              <i className="fas fa-balance-scale text-3xl md:text-4xl text-[#80ccff] ml-4"></i>
            </div>
            <p className="text-xl italic text-gray-600 mb-4">"Better ask Law Mate"</p>
            <p className="text-lg text-gray-700 mb-8 max-w-lg">
              An AI-powered legal chatbot offering general legal assistance and support.
            </p>
            <a 
              href="/chat" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#80ccff] hover:bg-[#5fb8f5] text-[#0a1f44] font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              Chat Now
            </a>
          </div>
          <div className="md:w-1/2">
            <svg
              className="w-full h-auto rounded-lg shadow-lg"
              viewBox="0 0 600 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="600" height="400" fill="#f0f4f8" rx="8" ry="8" />
              <path
                d="M300,120 L380,180 L380,320 L220,320 L220,180 Z"
                fill="#0a1f44"
                opacity="0.8"
              />
              <circle cx="300" cy="100" r="50" fill="#80ccff" />
              <rect x="260" y="210" width="80" height="10" fill="#fff" />
              <rect x="260" y="230" width="80" height="10" fill="#fff" />
              <rect x="260" y="250" width="80" height="10" fill="#fff" />
              <rect x="240" y="280" width="120" height="20" rx="5" ry="5" fill="#80ccff" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
