import { useState } from "react";
import { Link, useLocation } from "wouter";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-[#0a1f44] text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              Law Mate
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={`font-bold hover:underline transition duration-200 ${
                location === "/" ? "underline" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/#about"
              className="font-bold hover:underline transition duration-200"
            >
              About Us
            </Link>
            <Link
              href="/chat"
              className={`font-bold hover:underline transition duration-200 ${
                location === "/chat" ? "underline" : ""
              }`}
            >
              Chat
            </Link>
            <Link
              href="/#contact"
              className="font-bold hover:underline transition duration-200"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col space-y-4 mt-4 pb-4">
            <Link
              href="/"
              className="font-bold hover:underline transition duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/#about"
              className="font-bold hover:underline transition duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/chat"
              className="font-bold hover:underline transition duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Chat
            </Link>
            <Link
              href="/#contact"
              className="font-bold hover:underline transition duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
