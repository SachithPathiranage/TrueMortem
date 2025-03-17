import React, { useState } from "react";
import AnimatedBackground from "../components/Animation";

const VAForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    had_diabetes: "",
    had_heart_disease: "",
    had_hypertension: "",
    had_obesity: "",
    had_stroke: "",
    had_blue_lips: "",
    had_ankle_swelling: "",
    had_puffiness: "",
    had_diff_breathing: "",
    breathing_on_off: "",
    fast_breathing: "",
    had_wheezed: "",
    had_chest_pain: "",
    chest_pain_duration: "",
    physical_action_painful: "",
    pain_location: "",
    urine_stop: "",
    had_lost_consciousness: "",
    had_confusion: "",
  });

  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState(null);

  const standardOptions = [
    { value: "", label: "Select an option" },
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
    { value: "Don't Know", label: "Don't Know" },
    { value: "Refused to Answer", label: "Refused to Answer" },
  ];

  const painLocationOptions = [
    { value: "", label: "Select an option" },
    { value: "Upper/middle chest", label: "Upper/middle chest" },
    { value: "Lower chest", label: "Lower chest" },
    { value: "Left Arm", label: "Left Arm" },
    { value: "Other", label: "Other" },
    { value: "Refused to Answer", label: "Refused to Answer" },
    { value: "Don't Know", label: "Don't Know" },
  ];

  const breathingOptions = [
    { value: "", label: "Select an option" },
    { value: "Continuous", label: "Continuous" },
    { value: "On and Off", label: "On and Off" },
    { value: "Don't Know", label: "Don't Know" },
  ];

  const painDurationOptions = [
    { value: "", label: "Select an option" },
    { value: "<30 minutes", label: "Less than 30 minutes" },
    { value: "0.5-24 hours", label: "30 minutes to 24 hours" },
    { value: ">24 hr", label: "More than 24 hours" },
    { value: "Don't Know", label: "Don't Know" },
    { value: "Refused to Answer", label: "Refused to Answer" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPredictionResult(null);

    try {
      const response = await fetch(
        "http://localhost:8000/predict/verbal_autopsy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            age: parseInt(formData.age),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Prediction failed");
      }

      const result = await response.json();
      setPredictionResult(result);
    } catch (error) {
      setError(error.message);
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <AnimatedBackground />
      <div className="max-w-6xl mx-auto bg-white rounded-b-2xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-center mb-6 pt-6">
          Cause of Death Prediction
        </h2>
        {error && (
          <div className="bg-red-500 text-white py-2 px-4 mb-4 text-center rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 bg-opacity-80 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="age" className="block text-gray-700 font-medium">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102 mt-2"
              />
            </div>

            {[
              ...Object.entries({
                had_diabetes: "Did deceased have diabetes",
                had_heart_disease: "Did deceased have heart disease",
                had_hypertension: "Did deceased have hypertension",
                had_obesity: "Did deceased have obesity",
                had_stroke: "Did deceased have a stroke",
                had_blue_lips: "Did deceased have blue lips",
                had_ankle_swelling: "Did deceased have ankle swelling",
                had_puffiness: "Did deceased experience puffiness",
                had_diff_breathing: "Did deceased have difficulty breathing",
                fast_breathing: "Did deceased experience fast breathing",
                had_wheezed: "Did deceased experience wheezing",
                had_chest_pain: "Did deceased have chest pain",
                physical_action_painful: "Was physical activity painful",
                urine_stop: "Did deceased have difficulty urinating",
                had_lost_consciousness: "Did deceased lose consciousness",
                had_confusion: "Did deceased experience confusion",
              }),
            ].map(([id, label]) => (
              <div key={id}>
                <label htmlFor={id} className="block text-gray-700 font-medium">
                  {label}
                </label>
                <select
                  id={id}
                  name={id}
                  value={formData[id]}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102 mt-2"
                >
                  {standardOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 shadow-md transition duration-300 transform hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VAForm;
