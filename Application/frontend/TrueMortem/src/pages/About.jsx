import React from "react";

const About = () => {
  return (
    <div className="w-full h-[calc(100vh-13vh)] flex items-center justify-center">
      <div className="flex flex-col items-center text-center justify-center max-w-[1240px] mx-auto my-auto">
        <h1 className="text-[20px] mt-1">About Us</h1>
        <h1 className="text-[50px] font-bold max-w-[60%] mt-7">
          We combine the precision of AI with expertise in forensic science.
        </h1>
        <p className="max-w-[55%] text-[17px] mt-7">
          Our philosophy is simple: harness the power of AI to empower
          professionals with fast, reliable, and accurate predictions.
        </p>
      </div>
    </div>
  );
};

export default About;
