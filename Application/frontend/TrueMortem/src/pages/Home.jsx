import React from "react";
import HomeHeader from "../components/HomeHeader";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="">
      <HomeHeader />
      <div className="w-full h-screen bg-[#5152522b] rounded-t-[3rem] rounded-b-[3rem] lg:rounded-t-[7rem] lg:rounded-b-[7rem]">
        <div className="max-w-[1240px] mx-auto">
          {/* Flex container for H1 and Button */}
          <div className="flex flex-wrap justify-between items-center pl-4 md:pl-0">
            <div>
              <h1 className="text-2xl md:text-[3rem] pt-10 font-semibold">
                Redefining Forensic Analysis,
              </h1>
              <h1 className="text-2xl md:text-[3rem] font-semibold">
                One Insight at a Time
              </h1>
            </div>

            {/* Button scales with H1 */}
            <button className="px-6 py-3 mt-10 mr-10 md:mr-0 md:rounded-4xl text-sm md:text-[1.5rem] font-medium bg-blue-600 text-white rounded-3xl hover:bg-blue-700 transition transform scale-100 hover:scale-105">
              Predict
            </button>
          </div>

          <p className="text-sm mt-6 md:text-xl pl-4 md:pl-0">
            Assisting Cause Of Death Predictions With Data-Driven Insights.
          </p>
        </div>
        {/* Grid Container */}
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 h-[60%] md:grid-cols-3 gap-10 mt-12">
          {/* Grid Items */}
          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            Item 1
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            Item 2
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            Item 3
          </div>
        </div>
      </div>
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
