import React from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowUpRight } from "react-icons/bs";
import { LuFileText } from "react-icons/lu";

const Card = ({ image, title, label, isBlurred, onClick }) => {
  return (
    <div
      className="relative w-[21rem] h-[25rem] bg-gray-200 rounded-2xl p-4 flex flex-col justify-between shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl cursor-pointer"
      onClick={onClick}
    >
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className={`absolute inset-0 w-full h-full object-cover transition-all ${
          isBlurred ? "blur-[0px]" : "blur-0"
        }`}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>

      {/* Top Row: Label and Icon */}
      <div className="relative z-10 flex justify-between items-center">
        <span className="bg-white/30 px-2 py-1 rounded-lg text-sm text-white">
          {label}
        </span>
        <button className="w-8 h-8 flex items-center justify-center bg-white/30 rounded-full text-white">
          <LuFileText />
        </button>
      </div>

      {/* Arrow Button */}
      <div className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md z-10">
        <BsArrowUpRight className="text-black text-xl" />
      </div>
    </div>
  );
};

const Cards = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const handleCardClick = (link, requiresAuth) => {
    if (requiresAuth && !isAuthenticated) {
      localStorage.setItem("redirectAfterLogin", "/predict");
      navigate("/signin");
    } else {
      navigate(link);
    }
  };

  const cards = [
    {
      image: "/pm.png",
      title: "Post Mortem Prediction",
      label: "Post Mortem Prediction",
      link: "/osteoporosis",
      isBlurred: true,
      requiresAuth: true,
    },
    {
      image: "/va.png",
      title: "Verbal Autopsy Prediction",
      label: "Verbal Autopsy Prediction",
      link: "/arthritis",
      isBlurred: true,
      requiresAuth: true,
    },
    {
      image: "/rasa.png",
      title: "Chatbot",
      label: "Chatbot",
      link: "/chatbot",
      isBlurred: true,
      requiresAuth: false,
    },
  ];

  return (
    <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mt-15 justify-between">
      {cards.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          title={card.title}
          label={card.label}
          isBlurred={card.isBlurred}
          onClick={() => handleCardClick(card.link, card.requiresAuth)}
        />
      ))}
    </div>
  );
};

export default Cards;
