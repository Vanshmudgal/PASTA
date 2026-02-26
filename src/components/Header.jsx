import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi"; 
import React from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Added Scroll Effect Listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Updated navigation items with correct paths
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Contact", path: "/contact" }
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#FFFDF5]/95 backdrop-blur-sm shadow-md border-b border-[#E5DCC5]" 
          : "bg-[#FFFDF5] border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Main Navigation */}
        <div className="flex justify-between items-center">
          
          {/* Logo - Matches Footer Style */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-3xl group-hover:rotate-12 transition-transform duration-300">🍝</span>
            <span className="text-2xl font-serif font-bold text-[#1A1814] tracking-wide">
              INESA <span className="text-[#D4A373]">PASTAZ</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="font-sans font-medium text-[#5A4D44] hover:text-[#D4A373] transition-colors tracking-wide uppercase text-sm"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Checkout Button (Desktop) */}
            <Link 
              to="/checkout"
              className="bg-[#1A1814] hover:bg-[#D4A373] hover:-translate-y-0.5 transform text-white font-medium py-2 px-6 rounded-full transition-all shadow-md text-sm"
            >
              Checkout
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#1A1814] focus:outline-none p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#FFFDF5] border-t border-[#E5DCC5] shadow-xl px-6 py-6 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-lg font-serif text-[#1A1814] border-b border-[#E5DCC5]/50 pb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Checkout Button (Mobile) */}
            <Link 
              to="/checkout"
              className="w-full bg-[#1A1814] text-white py-3 rounded-full mt-2 font-medium text-center block"
              onClick={() => setIsMenuOpen(false)}
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}