import React from "react";
import Body from "./Body";

function HomeHeader() {
  return (
    <div>
      <div className="max-w-[1240px] mx-auto">
        <div className="grid md:grid-cols-[30%_70%] md:gap-4 relative">
          <Body />
          <div className="p-2 md:p-0 md:h-[calc(100vh-13vh)] z-10">
            <div className="flex items-start justify-start">
              <p className="text-[8.6rem] font-medium leading-tight text-black mt-20 ml-25">
                AI Death
              </p>
              <button
                className="mt-35 py-6 px-10 ml-15 text-xl font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600 transition"
                onClick={handlePredictClick}
              >
                Predict
              </button>
            </div>
            <div className="flex items-center">
              <p className="text-[8.6rem] font-medium leading-tight text-black ml-23">
                Diagnosis
              </p>
              <div className="p-[0.7rem] rounded-full bg-blue-600 mt-23 ml-2"></div>
            </div>

            <p className="text-[#737373] w-[45%] align-baseline ml-25 mt-10">
              We are revolutionizing forensic analysis providing data-driven
              insights to assist in accurate cause of death prediction.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#0000ffb6] text-white text-[1.6rem] font-medium p-8 text-center mt-10">
        <p>Redefining Forensic Analysis, One Insight At A Time</p>
      </div>
    </div>
  );
}

export default HomeHeader;
