import React from "react";
import HeaderStat from "./HeaderStat";

function HomeHeader() {
  return (
    <div className="max-w-[1240px] mx-auto md:mb-35">
      <div className="grid md:grid-cols-[33%_67%] md:h-[calc(100vh-13vh)] md:gap-4 relative">
        <div className="shadow-lg mx-auto relative group">
          <img
            className="relative object-cover w-[41.5%] md:w-[80%] mx-auto h-auto md:ml-15 transition-transform duration-300 hover:scale-105 -z-10 group-hover:z-0"
            src="/body.png"
            alt=""
          />
        </div>
        <div className="p-8 md:p-0 flex items-center justify-center shadow-lg h-screen md:h-[calc(100vh-13vh)] z-10">
          <HeaderStat />
        </div>
      </div>
    </div>
  );
}

export default HomeHeader;
