import React from "react";

const Contact = () => {
  return (
    <div>
      <div className="w-full h-[calc(100vh-13vh)] flex items-center justify-center">
        <div className="flex flex-col items-center text-center justify-center max-w-[1240px] mx-auto my-auto">
          <h1 className="text-[17px] mt-1">Contact Us</h1>
          <h1 className="text-[40px] font-bold max-w-[60%] mt-7 md:text-[50px]">
            Our Team of Experts are here to help
          </h1>
          <p className="max-w-[45%] text-[17px] mt-7 mb-20">
            Our philosophy is simple: harness the power of AI to empower
            professionals with fast, reliable, and accurate predictions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
