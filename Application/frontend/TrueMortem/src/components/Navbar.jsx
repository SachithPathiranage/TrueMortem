import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BsChatLeftText } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center w-full bg-[#f6f6f6] h-24 max-w-[1240px] mx-auto px-4">
      {/* Logo (Left) */}
      <a href="/" className="shrink-0 flex">
        <img
          src="/trueMortem.png"
          alt="TrueMortem Logo"
          className="w-auto h-[23px] grow-0 my-auto"
        />
        <a href="/" className="px-1.5 mx-auto my-auto text-xl">
          TrueMortem
        </a>
      </a>

      {/* Desktop Menu (Middle) */}
      <ul className="flex-1 flex justify-center grow-0 items-center gap-1">
        <li className="shadow-lg flex items-center justify-center text-sm w-[70px] h-[35px] bg-[#efefef] rounded-[25px] text-[#737373] hover:text-[#494646] hover:bg-[#e2e0e0] transition align-middle">
          <Link to="/">Home</Link>
        </li>
        <li className="shadow-lg flex items-center justify-center text-sm w-[70px] h-[35px] bg-[#efefef] rounded-[25px] text-[#737373] hover:text-[#494646] hover:bg-[#e2e0e0] transition align-middle">
          <Link to="/PMform">PMpred</Link>
        </li>
        <li className="shadow-lg flex items-center justify-center text-sm w-[70px] h-[35px] bg-[#efefef] rounded-[25px] text-[#737373] hover:text-[#494646] hover:bg-[#e2e0e0] transition align-middle">
          <Link to="/VAform">VApred</Link>
        </li>
        <li className="shadow-lg flex items-center justify-center text-sm w-[70px] h-[35px] bg-[#efefef] rounded-[25px] text-[#737373] hover:text-[#494646] hover:bg-[#e2e0e0] transition align-middle">
          <Link to="/about">About</Link>
        </li>
        <li className="shadow-lg flex items-center justify-center text-sm w-[70px] h-[35px] bg-[#efefef] rounded-[25px] text-[#737373] hover:text-[#494646] hover:bg-[#e2e0e0] transition align-middle">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      {/* Right Section (Chat, Bell, Profile) */}
      <ul className="flex-1 flex justify-center grow-0 items-center gap-1">
        <li className="shadow-lg flex items-center justify-center text-[20px] w-[55px] h-[50px] bg-[#efefef] rounded-4xl text-black hover:bg-[#e2e0e0] transition align-middle">
          <Link to="/chatbot">
            <BsChatLeftText />
          </Link>
        </li>
        <li className="shadow-lg flex items-center justify-center text-[25px] w-[55px] h-[50px] bg-[#efefef] rounded-[25px] text-black hover:bg-[#e2e0e0] transition align-middle">
          <Link to="/notifications">
            <IoMdNotificationsOutline />
          </Link>
        </li>
        <li className="shadow-lg flex items-center justify-center text-[25px] w-[55px] h-[50px] bg-[#efefef] rounded-[25px] text-black hover:bg-[#e2e0e0] transition align-middle">
          <Link to="/profile">
            <CgProfile />
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
