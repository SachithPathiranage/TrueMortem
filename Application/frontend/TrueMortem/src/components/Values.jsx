import React from "react";

function Values() {
  return (
    <div className="max-w-[1240px] mx-auto mb-20">
      <h1 className="text-2xl text-center mb-18 font-bold">Core Values</h1>
      <div className="grid md:grid-cols-2 gap-16 items-center mb-8 mx-auto my-auto">
        <div className="w-full h-full flex:grow shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <img
            className="w-20 mx-auto mt-[-3rem]"
            src="/accuracy2.png"
            alt="/"
          />
          <h2 className="text-2xl font-bold text-center pt-8">Precision</h2>
          <p className="text-justify text-sm text-[#737373] w-[75%] mx-auto">
            Data-driven insights are paramount in supporting critical forensic
            decisions. TrueMortem is built on rigorous scientific research and
            machine learning, ensuring that every prediction is backed by
            accuracy and integrity.
          </p>
        </div>
        <div className="w-full h-full flex:grow shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <img className="w-20 mx-auto mt-[-3rem]" src="/trust.png" alt="/" />
          <h2 className="text-2xl font-bold text-center pt-8">Trust</h2>
          <p className="text-justify text-sm text-[#737373] w-[75%] mx-auto">
            Trust comes from clarity. TrueMortem provides full transparency,
            explaining every prediction so you stay in control. With ethical AI
            and explainable models, you can rely on insights you understand.
          </p>
        </div>
        <div className="w-full h-full flex:grow shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <img
            className="w-20 mx-auto mt-[-3rem]"
            src="/innovation.png"
            alt="/"
          />
          <h2 className="text-2xl font-bold text-center pt-8">Innovation</h2>
          <p className="text-justify text-sm text-[#737373] w-[75%] mx-auto">
            Technology should work for you, not the other way around. TrueMortem
            continuously evolves, integrating the latest AI and forensic science
            advancements to help you uncover critical insights.
          </p>
        </div>
        <div className="w-full h-full flex:grow shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <img className="w-19 mx-auto mt-[-3rem]" src="/person.png" alt="/" />
          <h2 className="text-2xl font-bold text-center pt-8">Accessibility</h2>
          <p className="text-justify text-sm text-[#737373] w-[75%] mx-auto">
            Your work is complex, but your tools shouldn’t be. TrueMortem is
            designed for ease of use, with an intuitive interface that fits
            seamlessly into your workflow. From streamlined data entry to
            actionable insights, we ensure you can focus on what matters most
          </p>
        </div>
      </div>
    </div>
  );
}

export default Values;
