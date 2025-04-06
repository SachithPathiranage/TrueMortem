import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsChatLeftText } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

const Navbar = ({ isAuthenticated }) => {
  const [nav, setNav] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  const getActiveClass = (path) =>
    location.pathname === path
      ? "bg-white text-black"
      : "bg-[#efefef] text-[#737373] hover:text-[#494646] hover:bg-[#e2e0e0]";

  // Handle Predict Click Navigation
  const handlePredictClick = () => {
    if (isAuthenticated) {
      navigate("/predict");
    } else {
      localStorage.setItem("redirectAfterLogin", "/predict"); // Store intended page
      navigate("/signin");
    }
  };

  return (
    <header className="flex justify-between items-center w-full h-24 max-w-[1240px] mx-auto px-4">
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
        {["Home", "Predict", "About", "Contact"].map((label, index) => {
          const path = `/${
            label.toLowerCase() === "home" ? "" : label.toLowerCase()
          }`;
          return (
            <li
              key={index}
              className={`shadow-lg flex items-center justify-center text-sm w-[90px] h-[50px] rounded-[25px] transition ${getActiveClass(
                path
              )} ${label === "Predict" ? "cursor-pointer" : ""}`}
              onClick={label === "Predict" ? handlePredictClick : null} // Attach handler for Predict
            >
              {label !== "Predict" ? <Link to={path}>{label}</Link> : label}
            </li>
          );
        })}
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
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-gray-300 bg-[#f6f6f6] ease-in-out duration-500 p-6 z-50"
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
        {["Home", "Predict", "About", "Contact"].map((label, index) => {
          const path = `/${
            label.toLowerCase() === "home" ? "" : label.toLowerCase()
          }`;
          return (
            <li
              key={index}
              className="p-4 border-b border-gray-300 text-[#737373] hover:text-[#494646] hover:bg-[#e2e0e0] transition"
              onClick={label === "Predict" ? handlePredictClick : handleNav}
            >
              {label !== "Predict" ? <Link to={path}>{label}</Link> : label}
            </li>
          );
        })}
      </ul>
    </header>
  );
};

export default Navbar;
