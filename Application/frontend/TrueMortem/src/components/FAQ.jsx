import React from "react";

function FAQ() {
  return (
    <div className="max-w-[1240px] mx-auto px-4 py-10">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-semibold text-center">
        Frequently Asked Questions
      </h2>
      <p className="text-gray-500 text-center mb-8">
        Find answers to your questions here
      </p>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-[40%_60%] gap-8 items-center w-full">
        {/* Left Side - Placeholder for Image */}
        <div className="w-full h-[300px] md:h-[400px] rounded-2xl flex items-center justify-center">
          <img
            className="w-full h-full object-cover rounded-[3rem] shadow-lg"
            src="/operating.png"
            alt=""
          />
        </div>

        {/* Right Side - FAQ Section */}
        <div className="space-y-4">
          {/* Single FAQ Item */}
          <div className="bg-gray-100 p-4 rounded-xl shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">What is TrueMortem?</h3>
              <button className="w-8 h-8 bg-blue-500 text-white rounded-full">
                -
              </button>
            </div>
            <p className="text-gray-600 mt-2">
              TrueMortem is an AI platform that predicts causes of death using
              post-mortem organ data.
            </p>
          </div>

          {/* Collapsed FAQs */}
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 p-4 rounded-xl shadow-sm flex justify-between items-center"
            >
              <span className="text-gray-600">Question {i + 2}</span>
              <button className="w-8 h-8 bg-blue-500 text-white rounded-full">
                +
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;
