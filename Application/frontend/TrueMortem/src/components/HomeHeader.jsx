import React from "react";
import HeaderStat from "./HeaderStat";

function HomeHeader() {
  return (
    <div className="max-w-[1240px] mx-auto md:mb-35">
      <div className="grid md:grid-cols-[33%_67%] md:h-[calc(100vh-13vh)] md:gap-4 relative">
        <div className="shadow-lg">
          <img
            className="relative -z-10 w-[41.5%] md:w-[80%] mx-auto h-auto md:ml-15"
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