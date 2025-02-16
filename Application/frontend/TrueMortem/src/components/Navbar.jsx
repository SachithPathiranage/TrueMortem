import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons for the mobile menu

const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 w-full bg-[#f6f6f6]">
      <nav className="flex justify-around items-center">
        {/* Logo (Left) */}
        <a href="/" className="shrink-0">
          <img
            src="/trueMortem-full.png"
            alt="TrueMortem Logo"
            className="w-auto h-[23px] sm:h-[20px] md:h-[30px] grow-0"
          />
        </a>

        {/* Desktop Menu (Middle) */}
        <ul className="flex-1 flex justify-center grow-0 items-center gap-3">
          <li>
            <Link
              to="/"
              className="px-4 py-2 bg-white rounded-lg text-black hover:bg-gray-100 transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/predict"
              className="px-4 py-2 bg-white rounded-lg text-black hover:bg-gray-100 transition"
            >
              Predict
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="px-4 py-2 bg-white rounded-lg text-black hover:bg-gray-100 transition"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="px-4 py-2 bg-white rounded-lg text-black hover:bg-gray-100 transition"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Right Section (Chat, Bell, Profile) */}
        <ul className="flex-1 flex justify-center grow-0 items-center gap-4">
          <li>
            <Link
              to="/chat"
              className="px-4 py-2 bg-white rounded-lg text-black hover:bg-gray-100 transition"
            >
              Chat
            </Link>
          </li>
          <li>
            <Link
              to="/notifications"
              className="px-4 py-2 bg-white rounded-lg text-black hover:bg-gray-100 transition"
            >
              Bell
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="px-4 py-2 bg-white rounded-lg text-black hover:bg-gray-100 transition"
            >
              DP
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
