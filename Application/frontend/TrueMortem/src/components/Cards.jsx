import React from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { BiWater } from "react-icons/bi";
import { LuFileText } from "react-icons/lu";

const Card = ({ image, title, label, link, isBlurred }) => {
  return (
    <div className="relative w-[250px] h-[300px] bg-gray-200 rounded-2xl p-4 flex flex-col justify-between shadow-lg overflow-hidden">
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className={`absolute inset-0 w-full h-full object-cover transition-all ${
          isBlurred ? "blur-md" : "blur-0"
        }`}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>

      {/* Top Buttons */}
      <div className="absolute top-3 left-3 flex flex-col gap-2">
        <button className="w-8 h-8 flex items-center justify-center bg-white/30 rounded-full text-white">
          <AiOutlineClose />
        </button>
        <button className="w-8 h-8 flex items-center justify-center bg-white/30 rounded-full text-white">
          <BiWater />
        </button>
      </div>
      <button className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/30 rounded-full text-white">
        <LuFileText />
      </button>

      {/* Content */}
      <div className="relative text-white p-4">
        <span className="bg-white/30 px-2 py-1 rounded-lg text-sm">
          {label}
        </span>
        <h2 className="text-2xl font-semibold mt-2">{title}</h2>
      </div>

      {/* Arrow Button */}
      <a
        href={link}
        className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
      >
        <BsArrowUpRight className="text-black text-xl" />
      </a>
    </div>
  );
};

const Cards = () => {
  const cards = [
    {
      image: "/path/to/image1.jpg",
      title: "Osteoporosis",
      label: "Bisphosphonate drugs",
      link: "/osteoporosis",
      isBlurred: true,
    },
    {
      image: "/path/to/image2.jpg",
      title: "Arthritis",
      label: "Anti-inflammatory drugs",
      link: "/arthritis",
      isBlurred: false,
    },
    {
      image: "/path/to/image3.jpg",
      title: "Diabetes",
      label: "Insulin Therapy",
      link: "/diabetes",
      isBlurred: true,
    },
  ];

  return (
    <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mt-12 shadow-lg justify-between">
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
};
export default Cards;
