import React from "react";
import HomeHeader from "../components/HomeHeader";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
import Performance from "../components/Performance";
import Heart from "../components/Heart";

const Home = () => {
  return (
    <div className="">
      <HomeHeader />
      <div className="flex flex-col items-center text-center max-w-[1240px] mx-auto rounded-[3rem]">
        {/* Title */}
        <div className="flex items-center mt-10">
          <p className="text-[4rem] font-medium leading-tight text-black">
            Our Focus
          </p>
          <div className="p-[0.6rem] rounded-full bg-blue-600 mt-10 ml-2"></div>
        </div>

        {/* Image with Circular Rings */}
        <div className="relative inline-block mt-17">
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-100 h-100 rounded-full border-4 border-white bg-[#ffffffb1] absolute"></div>
            <div className="w-120 h-120 rounded-full border-4 border-white bg-[#ffffff75] absolute"></div>
          </div>
          <Heart />
        </div>

        {/* Subtitle */}
        <div className="text-[4rem] font-semibold text-gray-700 mt-[-80px]">
          Heart Diseases
        </div>
      </div>

      <div className="flex flex-col items-center h-screen text-center max-w-[1240px] mx-auto">
        {/* Title */}
        <div className="flex items-center mt-25">
          <p className="text-[4rem] font-medium leading-tight text-black">
            Our Services
          </p>
          <div className="p-[0.6rem] rounded-full bg-blue-600 mt-10 ml-2"></div>
        </div>
        <Cards />
      </div>
      <div className="bg-[#0000ffb6] text-white text-[1.6rem] font-medium p-8 text-center mt-10">
        <div className="max-w-[1240px] mx-auto flex justify-between w-full px-30">
          <span>Our Models</span>
          <span className="text-4xl font-bold text-[#7CB9FF]">+</span>
          <span>Our Models</span>
          <span className="text-4xl font-bold text-[#7CB9FF]">+</span>
          <span>Our Models</span>
        </div>
      </div>
      <Performance />

      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
