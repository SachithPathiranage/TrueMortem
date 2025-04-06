import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  const handleFAQClick = (e) => {
    e.preventDefault(); // Prevent default navigation
    // You can add any other logic here if needed
  };

  const navigate = useNavigate();

  const handlePredictClick = (e) => {
    e.preventDefault(); // prevent <button> from triggering default nav

    const isAuthenticated = localStorage.getItem("token") !== null; // Example authentication check

    if (isAuthenticated) {
      navigate("/predict");
    } else {
      localStorage.setItem("redirectAfterLogin", "/predict");
      navigate("/signin");
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-600 rounded-t-[3rem] lg:rounded-t-[7rem]">
      <div className="max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-4 gap-8 text-gray-300">
        {/* Brand Section */}
        <div>
          <a href="/" className="shrink-0 flex">
            <img
              src="/trueMortem.png"
              alt="TrueMortem Logo"
              className="w-auto h-[2.3rem] grow-0 my-auto"
            />
            <span className="px-2.5 my-auto text-[1.8rem]">TrueMortem</span>
          </a>
          <p className="py-4">
            Harnessing AI to uncover heart disease related causes of death with
            precision and insight.
          </p>
          <div className="flex justify-between md:w-[75%] my-6">
            <a
              href="https://facebook.com"
              className="hover:text-white transition"
            >
              <FaFacebookSquare size={30} />
            </a>
            <a
              href="https://instagram.com"
              className="hover:text-white transition"
            >
              <FaInstagram size={30} />
            </a>
            <a
              href="https://twitter.com"
              className="hover:text-white transition"
            >
              <FaTwitterSquare size={30} />
            </a>
            <a
              href="https://github.com"
              className="hover:text-white transition"
            >
              <FaGithubSquare size={30} />
            </a>
            <a
              href="https://dribbble.com"
              className="hover:text-white transition"
            >
              <FaDribbbleSquare size={30} />
            </a>
          </div>
        </div>

        {/* Footer Sections */}
        <div className="lg:col-span-3 flex justify-start gap-8 md:mx-[60%] mx-auto mr-10">
          {/* Navigations Section */}
          <div>
            <h6 className="font-medium text-gray-400">Navigations</h6>
            <ul>
              <li className="py-2 text-sm">
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li className="py-2 text-sm">
                <button
                  onClick={handlePredictClick}
                  className="hover:underline text-sm text-left bg-transparent p-0 m-0 text-gray-300"
                >
                  Predict
                </button>
              </li>
              <li className="py-2 text-sm">
                <a href="/about" className="hover:underline">
                  About
                </a>
              </li>
              <li className="py-2 text-sm">
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions Section */}
          <div>
            <h6 className="font-medium text-gray-400">Solutions</h6>
            <ul>
              <li className="py-2 text-sm">
                <a href="/predict" className="hover:underline">
                  Postmortem Predictions
                </a>
              </li>
              <li className="py-2 text-sm">
                <a href="/predict" className="hover:underline">
                  Autopsy Predictions
                </a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h6 className="font-medium text-gray-400">Support</h6>
            <ul>
              <li className="py-2 text-sm">
                <a
                  href="#"
                  onClick={handleFAQClick}
                  className="hover:underline"
                >
                  FAQ
                </a>
              </li>
              <li className="py-2 text-sm">
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
