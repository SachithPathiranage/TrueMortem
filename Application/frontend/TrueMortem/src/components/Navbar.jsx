import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BsChatLeftText } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <header className="flex justify-between items-center w-full bg-[#f6f6f6] h-24 max-w-[1240px] mx-auto px-4">
      {/* Logo (Left) */}
      <a href="/" className="shrink-0 flex">
        <img
          src="/trueMortem.png"
          alt="TrueMortem Logo"
          className="w-auto h-[23px] grow-0 my-auto"
        />
        <span className="px-1.5 mx-auto my-auto text-xl">TrueMortem</span>
      </a>

      {/* Desktop Menu (Hidden in Mobile) */}
      <ul className="hidden md:flex flex-1 justify-center items-center gap-1">
        {[
          { to: "/", label: "Home" },
          { to: "/predict", label: "Predict" },
          { to: "/about", label: "About" },
          { to: "/contact", label: "Contact" },
        ].map((item) => (
          <li
            key={item.to}
            className="shadow-lg flex items-center justify-center text-sm w-[70px] h-[35px] bg-[#efefef] rounded-[25px] text-[#737373] hover:text-[#494646] hover:bg-[#e2e0e0] transition"
          >
            <Link to={item.to}>{item.label}</Link>
          </li>
        ))}
      </ul>

      {/* Right Section */}
      <ul className="flex items-center gap-2">
        {[
          { to: "/chatbot", icon: <BsChatLeftText />, size: "text-[20px]" },
          { to: "/signin", icon: <CgProfile />, size: "text-[25px]" },
        ].map((item, index) => (
          <li
            key={index}
            className={`shadow-lg flex items-center justify-center ${item.size} w-[55px] h-[50px] bg-[#efefef] rounded-[25px] text-black hover:bg-[#e2e0e0] transition`}
          >
            <Link to={item.to}>{item.icon}</Link>
          </li>
        ))}

        {/* Mobile Menu Button */}
        <div
          onClick={handleNav}
          className="md:hidden flex items-center justify-center cursor-pointer p-2 shadow-lg mx-auto my-auto w-[55px] h-[50px] bg-[#efefef] rounded-[25px] text-black hover:bg-[#e2e0e0] transition"
        >
          {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
        </div>
      </ul>

      {/* Mobile Sidebar */}
      <ul
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-gray-300 bg-[#f6f6f6] ease-in-out duration-500 p-6"
            : "ease-in-out duration-500 fixed left-[-100%]"
        }
      >
        {/* Logo (Left) */}
        <a href="/" className="shrink-0 flex">
          <img
            src="/trueMortem.png"
            alt="TrueMortem Logo"
            className="w-auto h-[23px] grow-0 my-auto"
          />
          <span className="px-1.5 my-auto text-xl">TrueMortem</span>
        </a>
        {[
          { to: "/", label: "Home" },
          { to: "/predict", label: "Predict" },
          { to: "/about", label: "About" },
          { to: "/contact", label: "Contact" },
        ].map((item) => (
          <li
            key={item.to}
            className="p-4 border-b border-gray-300 text-[#737373] hover:text-[#494646] hover:bg-[#e2e0e0] transition"
          >
            <Link to={item.to} onClick={handleNav}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Navbar;
