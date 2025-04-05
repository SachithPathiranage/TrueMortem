import React, { useState } from "react";

function Heart() {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="mx-auto"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Image */}
      <img
        src="/HomeHeart.png"
        alt="Medical Focus"
        className="w-110 object-fit drop-shadow-lg relative top-[-40px]"
      />

      {/* Marker 1 */}
      <div
        className={`absolute left-[30%] top-[28%] w-8 h-8 flex items-center justify-center rounded-full bg-[#ffffff54] transition-opacity duration-300 ${
          hover ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-3 h-3 rounded-full bg-white" />
      </div>

      {/* Label 1 */}
      <div
        className={`absolute left-[-30%] top-[25%] flex items-center bg-white p-2 rounded-full shadow-lg transition-all duration-300 ${
          hover ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 mr-2">
          <span className="text-sm font-bold text-black">53%</span>
        </div>
        <p className="text-sm font-medium text-black pr-2">
          Coronary Artery Disease
        </p>
      </div>

      {/* Marker 2 */}
      <div
        className={`absolute left-[62%] top-[38%] w-8 h-8 flex items-center justify-center rounded-full bg-[#ffffff54] transition-opacity duration-300 ${
          hover ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-3 h-3 rounded-full bg-white" />
      </div>

      {/* Label 2 */}
      <div
        className={`absolute left-[74%] top-[35%] flex items-center bg-white p-2 rounded-full shadow-lg transition-all duration-300 ${
          hover ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 mr-2">
          <span className="text-sm font-bold text-black">17%</span>
        </div>
        <p className="text-sm font-medium text-black pr-2">Stroke</p>
      </div>

      {/* Marker 3 */}
      <div
        className={`absolute left-[36%] top-[57%] w-8 h-8 flex items-center justify-center rounded-full bg-[#ffffff54] transition-opacity duration-300 ${
          hover ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-3 h-3 rounded-full bg-white" />
      </div>

      {/* Label 3 */}
      <div
        className={`absolute left-[-1%] top-[54%] flex items-center bg-white p-2 rounded-full shadow-lg transition-all duration-300 ${
          hover ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 mr-2">
          <span className="text-sm font-bold text-black">15%</span>
        </div>
        <p className="text-sm font-medium text-black pr-2">Heart Failure</p>
      </div>

      {/* Marker 4 */}
      <div
        className={`absolute left-[56%] top-[68%] w-8 h-8 flex items-center justify-center rounded-full bg-[#ffffff54] transition-opacity duration-300 ${
          hover ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-3 h-3 rounded-full bg-white" />
      </div>

      {/* Label 4 */}
      <div
        className={`absolute left-[65%] top-[65%] flex items-center bg-white p-2 rounded-full shadow-lg transition-all duration-300 ${
          hover ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 mr-2">
          <span className="text-sm font-bold text-black">15%</span>
        </div>
        <p className="text-sm font-medium text-black pr-2">Other Causes</p>
      </div>
    </div>
  );
}

export default Heart;
