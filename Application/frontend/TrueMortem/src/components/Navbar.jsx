import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { BsChatLeftText } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

const Navbar = ({ isAuthenticated }) => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  // Function to handle Predict navigation
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
        <img src="/trueMortem.png" alt="TrueMortem Logo" className="w-auto h-[23px] grow-0 my-auto" />
        <span className="px-1.5 mx-auto my-auto text-xl">TrueMortem</span>
      </a>

      {/* Desktop Menu */}
      <ul className="hidden md:flex flex-1 justify-center items-center gap-1">
        <li
          className="shadow-lg flex items-center justify-center text-sm w-[70px] h-[35px] bg-[#efefef] rounded-[25px] text-[#737373] hover:text-[#494646] hover:bg-[#e2e0e0] transition"
        >
          <Link to="/">Home</Link>
        </li>
        <li
          className="shadow-lg flex items-center justify-center text-sm w-[70px] h-[35px] bg-[#efefef] rounded-[25px] text-[#737373] hover:text-[#494646] hover:bg-[#e2e0e0] transition cursor-pointer"
          onClick={handlePredictClick}
        >
          Predict
        </li>
        <li
          className="shadow-lg flex items-center justify-center text-sm w-[70px] h-[35px] bg-[#efefef] rounded-[25px] text-[#737373] hover:text-[#494646] hover:bg-[#e2e0e0] transition"
        >
          <Link to="/about">About</Link>
        </li>
        <li
          className="shadow-lg flex items-center justify-center text-sm w-[70px] h-[35px] bg-[#efefef] rounded-[25px] text-[#737373] hover:text-[#494646] hover:bg-[#e2e0e0] transition"
        >
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      {/* Right Section */}
      <ul className="flex items-center gap-2">
        <li className="shadow-lg flex items-center justify-center text-[20px] w-[55px] h-[50px] bg-[#efefef] rounded-[25px] text-black hover:bg-[#e2e0e0] transition">
          <Link to="/chatbot">
            <BsChatLeftText />
          </Link>
        </li>
        <li className="shadow-lg flex items-center justify-center text-[25px] w-[55px] h-[50px] bg-[#efefef] rounded-[25px] text-black hover:bg-[#e2e0e0] transition">
          <Link to="/signin">
            <CgProfile />
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
