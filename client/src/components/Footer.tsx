import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-[#0a1f44] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-300 mb-4">
              Law Mate is an AI-powered legal assistant designed to provide general legal information and guidance. We aim to make legal information more accessible to everyone.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#4a90e2] transition duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-[#4a90e2] transition duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-[#4a90e2] transition duration-300">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-300 hover:text-white transition duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-gray-300 hover:text-white transition duration-300">
                  Chat
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-gray-300 hover:text-white transition duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition duration-300">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal Disclaimer */}
          <div>
            <h3 className="text-xl font-bold mb-4">Legal Disclaimer</h3>
            <p className="text-gray-300">
              Law Mate provides information for educational purposes only. It is not a substitute for professional legal advice. Always consult with a qualified attorney for specific legal matters.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Law Mate. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-[#1a2f54] text-gray-300 text-xs px-3 py-1 rounded-full">Legal</span>
            <span className="bg-[#1a2f54] text-gray-300 text-xs px-3 py-1 rounded-full">Chatbot</span>
            <span className="bg-[#1a2f54] text-gray-300 text-xs px-3 py-1 rounded-full">Support</span>
            <span className="bg-[#1a2f54] text-gray-300 text-xs px-3 py-1 rounded-full">Law</span>
            <span className="bg-[#1a2f54] text-gray-300 text-xs px-3 py-1 rounded-full">Assistance</span>
            <span className="bg-[#1a2f54] text-gray-300 text-xs px-3 py-1 rounded-full">FAQ</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
