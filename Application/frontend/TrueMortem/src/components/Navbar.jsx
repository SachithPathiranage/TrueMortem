import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons for the mobile menu

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-[#f6f6f6] z-50 mb">
      <nav className="flex justify-between items-center px-6 md:px-12 py-4">
        {/* Logo */}
        <a href="/" className="flex items-left space-x-2 inline-block align-middle">
          <img src="/trueMortem-full.png" alt="TrueMortem Logo" className="h-4 w-auto md:h-6 lg:h-9.5" />
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="text-black hover:text-gray-300 transition">Home</Link></li>
          <li><Link to="/predict" className="text-black hover:text-gray-300 transition">Predict</Link></li>
          <li><Link to="/about" className="text-black hover:text-gray-300 transition">About</Link></li>
          <li><Link to="/contact" className="text-black hover:text-gray-300 transition">Contact</Link></li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg absolute top-full left-0 w-full py-4">
          <ul className="flex flex-col items-center space-y-4">
            <li><Link to="/" className="text-white hover:text-gray-300 transition" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link to="/predict" className="text-white hover:text-gray-300 transition" onClick={() => setIsOpen(false)}>Predict</Link></li>
            <li><Link to="/about" className="text-white hover:text-gray-300 transition" onClick={() => setIsOpen(false)}>About</Link></li>
            <li><Link to="/contact" className="text-white hover:text-gray-300 transition" onClick={() => setIsOpen(false)}>Contact</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
