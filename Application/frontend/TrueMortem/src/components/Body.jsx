import React, { useState } from "react";

function Body() {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="mx-auto relative group md:h-[calc(100vh-13vh)]"
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
        className={`absolute left-[54%] top-[28%] w-8 h-8 flex items-center justify-center rounded-full bg-[#ffffff54] transition-opacity duration-300 ${
          hover ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-3 h-3 rounded-full bg-white" />
      </div>

      {/* Label 1 */}
      <div
        className={`absolute left-[55%] top-[19%] flex items-center bg-white p-2 rounded-full shadow-lg transition-all duration-300 ${
          hover ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 mr-2">
          <span className="text-sm font-bold text-white">33%</span>
        </div>
        <p className="text-sm font-medium text-black pr-2">Heart Diseases</p>
      </div>

      {/* Marker 2 */}
      <div
        className={`absolute left-[47%] top-[44%] w-8 h-8 flex items-center justify-center rounded-full bg-[#ffffff54] transition-opacity duration-300 ${
          hover ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-3 h-3 rounded-full bg-white" />
      </div>

      {/* Label 2 */}
      <div
        className={`absolute left-[58%] top-[42%] flex items-center bg-white p-2 rounded-full shadow-lg transition-all duration-300 ${
          hover ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 mr-2">
          <span className="text-sm font-bold text-white">18%</span>
        </div>
        <p className="text-sm font-medium text-black pr-2">Cancers</p>
      </div>

      {/* Marker 3 */}
      <div
        className={`absolute left-[40%] top-[32%] w-8 h-8 flex items-center justify-center rounded-full bg-[#ffffff54] transition-opacity duration-300 ${
          hover ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-3 h-3 rounded-full bg-white" />
      </div>

      {/* Label 3 */}
      <div
        className={`absolute left-[-15%] top-[28%] flex items-center bg-white p-2 rounded-full shadow-lg transition-all duration-300 ${
          hover ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 mr-2">
          <span className="text-sm font-bold text-white">7%</span>
        </div>
        <p className="text-sm font-medium text-black pr-2">
          Respiratory Diseases
        </p>
      </div>

      {/* Marker 4 */}
      <div
        className={`absolute left-[33%] top-[68%] w-8 h-8 flex items-center justify-center rounded-full bg-[#ffffff54] transition-opacity duration-300 ${
          hover ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-3 h-3 rounded-full bg-white" />
      </div>

      {/* Label 4 */}
      <div
        className={`absolute left-[-14%] top-[66%] flex items-center bg-white p-2 rounded-full shadow-lg transition-all duration-300 ${
          hover ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 mr-2">
          <span className="text-sm font-bold text-white">42%</span>
        </div>
        <p className="text-sm font-medium text-black pr-2">Other Diseases</p>
      </div>
    </div>
  );
}

export default Body;
