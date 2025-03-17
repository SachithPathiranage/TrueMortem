import React, { useState } from "react";

// Import your existing components
import PMForm from "./PMForm";
import VAForm from "./VAForm";

const NotFound = () => {
  // State to toggle between forms
  const [activeForm, setActiveForm] = useState("postMortem");

  // Function to handle switching between forms
  const handleFormToggle = (form) => {
    setActiveForm(form);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      {/* Pop-up buttons to toggle between forms */}
      <div className="flex justify-between mb-4">
        <button
          className={`px-4 py-2 font-semibold rounded-md transition-all duration-300 ${
            activeForm === "postMortem"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleFormToggle("postMortem")}
        >
          Post Mortem
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded-md transition-all duration-300 ${
            activeForm === "verbalAutopsy"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleFormToggle("verbalAutopsy")}
        >
          Verbal Autopsy
        </button>
      </div>

      {/* Forms Section */}
      <div className="mt-4">
        {activeForm === "postMortem" ? (
          // Render the Post Mortem Form Component
          <PMForm />
        ) : (
          // Render the Verbal Autopsy Form Component
          <VAForm />
        )}
      </div>
    </div>
  );
};

export default NotFound;
