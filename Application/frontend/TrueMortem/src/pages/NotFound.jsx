import React, { useState } from "react";

// Import your existing components
import PMForm from "./PM2";
import VAForm from "./VA2";
import Footer from "../components/Footer";

const NotFound = () => {
  // State to toggle between forms
  const [activeForm, setActiveForm] = useState("postMortem");

  // Function to handle switching between forms
  const handleFormToggle = (form) => {
    setActiveForm(form);
  };

  return (
    <div className="w-full mt-6 mx-auto">
      {/* Pop-up buttons to toggle between forms */}
      <div className="flex justify-center mb-0 max-w-6xl mx-auto">
        <button
          className={`px-4 py-8 w-[50%] font-semibold rounded-tl-lg transition-all duration-300 ${
            activeForm === "postMortem"
              ? "bg-[#0000ffb2] text-white"
              : "bg-[#fafafae9] text-gray-700"
          }`}
          onClick={() => handleFormToggle("postMortem")}
        >
          Post Mortem
        </button>
        <button
          className={`px-4 py-8 w-[50%] font-semibold rounded-tr-lg transition-all duration-300 ${
            activeForm === "verbalAutopsy"
              ? "bg-[#0000ffb2] text-white"
              : "bg-[#fafafae9] text-gray-700"
          }`}
          onClick={() => handleFormToggle("verbalAutopsy")}
        >
          Verbal Autopsy
        </button>
      </div>

      {/* Main Form Container */}
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-b-lg">
        {/* Forms Section */}
        <div className="">
          {activeForm === "postMortem" ? (
            // Render the Post Mortem Form Component
            <PMForm />
          ) : (
            // Render the Verbal Autopsy Form Component
            <VAForm />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
