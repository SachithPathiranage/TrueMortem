import React from "react";

function HeaderStat() {
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-2 h-[50%] gap-5">
        <div className="flex justify-center rounded-lg shadow-lg">
          <h1 className="mt-8">Main Causes</h1>
          <div></div>
        </div>
        <div className="flex justify-center rounded-lg shadow-lg">
          <h1 className="mt-8 font-bold">Our focus</h1>
        </div>
      </div>
      {/* Second row */}
      <div className=" h-[48%] md:h-[46%] flex items-center justify-center rounded-lg shadow-lg mt-6">
        <h1 className="mt-8 font-bold">Model performance</h1>
      </div>
    </div>
  );
}

export default HeaderStat;
