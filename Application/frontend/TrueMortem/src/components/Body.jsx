import React, { useState } from "react";

function Body() {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="shadow-lg mx-auto relative group md:h-[calc(100vh-13vh)]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Image */}
      <img
        className="relative object-cover w-[41.5%] md:w-[79%] mx-auto h-auto md:ml-10 transition-transform duration-300 hover:scale-105 -z-10 group-hover:z-0"
        src="/body.png"
        alt="Human Body"
      />

      {/* Marker 1 */}
      <div
        className={`absolute left-[49.5%] top-[34%] w-8 h-8 flex items-center justify-center rounded-full bg-[#ffffff54] transition-opacity duration-300 ${
          hover ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-3 h-3 rounded-full bg-white" />
      </div>

      {/* Label 1 */}
      <div
        className={`absolute left-[62%] top-[34%] flex items-center bg-white p-2 rounded-full shadow-lg transition-all duration-300 ${
          hover ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 mr-2">
          <span className="text-sm font-bold text-black">50%</span>
        </div>
        <p className="text-sm font-medium text-black pr-2">Heart Diseases</p>
      </div>

      {/* Marker 2 */}
      <div
        className={`absolute left-[59.5%] top-[44%] w-8 h-8 flex items-center justify-center rounded-full bg-[#ffffff54] transition-opacity duration-300 ${
          hover ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-3 h-3 rounded-full bg-white" />
      </div>

      {/* Label 2 */}
      <div
        className={`absolute left-[62%] top-[44%] flex items-center bg-white p-2 rounded-full shadow-lg transition-all duration-300 ${
          hover ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 mr-2">
          <span className="text-sm font-bold text-black">30%</span>
        </div>
        <p className="text-sm font-medium text-black pr-2">Cancers</p>
      </div>

      {/* Marker 3 */}
      <div
        className={`absolute left-[41%] top-[54%] w-8 h-8 flex items-center justify-center rounded-full bg-[#ffffff54] transition-opacity duration-300 ${
          hover ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-3 h-3 rounded-full bg-white" />
      </div>

      {/* Label 3 */}
      <div
        className={`absolute left-[44%] top-[54%] flex items-center bg-white p-2 rounded-full shadow-lg transition-all duration-300 ${
          hover ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 mr-2">
          <span className="text-sm font-bold text-black">15%</span>
        </div>
        <p className="text-sm font-medium text-black pr-2">
          Respiratory Diseases
        </p>
      </div>

      {/* Marker 4 */}
      <div
        className={`absolute left-[51.5%] top-[69%] w-8 h-8 flex items-center justify-center rounded-full bg-[#ffffff54] transition-opacity duration-300 ${
          hover ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-3 h-3 rounded-full bg-white" />
      </div>

      {/* Label 4 */}
      <div
        className={`absolute left-[54%] top-[69%] flex items-center bg-white p-2 rounded-full shadow-lg transition-all duration-300 ${
          hover ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 mr-2">
          <span className="text-sm font-bold text-black">5%</span>
        </div>
        <p className="text-sm font-medium text-black pr-2">Other Diseases</p>
      </div>
    </div>
  );
}

export default Body;
