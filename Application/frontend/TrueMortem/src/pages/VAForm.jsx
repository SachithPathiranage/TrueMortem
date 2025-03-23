import React, { useState, useEffect } from "react";
import AnimatedBackground from "../components/Animation";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register the required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

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
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [importanceChartData, setImportanceChartData] = useState(null);
  const [showAllFactors, setShowAllFactors] = useState(false);

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

  useEffect(() => {
    if (predictionResult && predictionResult.feature_importance) {
      prepareImportanceChart();
    }
  }, [predictionResult]);

  const prepareImportanceChart = () => {
    // Get the feature importance data
    const importanceData = predictionResult.feature_importance;
    
    // Sort features by importance value
    const sortedFeatures = Object.entries(importanceData)
      .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));
    
    // Take only top 10 for the chart (to keep it readable)
    const topFeatures = sortedFeatures.slice(0, 10);
    
    // Prepare chart data
    const chartData = {
      labels: topFeatures.map(([feature, _]) => feature),
      datasets: [
        {
          label: 'Feature Importance',
          data: topFeatures.map(([_, value]) => Math.abs(value)),
          backgroundColor: topFeatures.map(() => 'rgba(54, 162, 235, 0.6)'),
          borderColor: topFeatures.map(() => 'rgba(54, 162, 235, 1)'),
          borderWidth: 1,
        }
      ]
    };
    
    setImportanceChartData(chartData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Age validation
    if (name === "age") {
      const ageValue = parseInt(value);
      if (value && (ageValue < 1 || ageValue > 125)) {
        setValidationErrors({
          ...validationErrors,
          age: "Age must be between 1 and 125"
        });
      } else {
        // Clear error if valid
        const newValidationErrors = {...validationErrors};
        delete newValidationErrors.age;
        setValidationErrors(newValidationErrors);
      }
    }
    
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check validation errors before submitting
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    
    setError(null);
    setPredictionResult(null);
    setLoading(true);

    try {
      console.log("Submitting form data...");
      
      // Create form data for submission
      const submissionData = {
        ...formData,
        age: parseInt(formData.age),
      };
      
      console.log("Data being sent:", submissionData);

      const response = await fetch("http://localhost:8000/predict/verbal_autopsy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = await response.json();
      console.log("Prediction result:", result);
      setPredictionResult(result);
      
      // Reset show all flag
      setShowAllFactors(false);
      
      // Auto-scroll to the results section
      setTimeout(() => {
        const resultElement = document.getElementById("prediction-result");
        if (resultElement) {
          resultElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "An error occurred during prediction");
    } finally {
      setLoading(false);
    }
  };

  const toggleShowAllFactors = () => {
    setShowAllFactors(!showAllFactors);
  };

  const chartOptions = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Importance Score'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Top 10 Important Factors'
      }
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
                min="1"
                max="125"
                required
                className={`w-full p-3 border ${validationErrors.age ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102 mt-2`}
              />
              {validationErrors.age && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.age}</p>
              )}
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

            {/* Pain Location */}
            <div>
              <label
                htmlFor="pain_location"
                className="block text-gray-700 font-medium"
              >
                Where was the chest pain located
              </label>
              <select
                id="pain_location"
                name="pain_location"
                value={formData.pain_location}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102 mt-2"
              >
                {painLocationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Breathing Pattern */}
            <div>
              <label
                htmlFor="breathing_on_off"
                className="block text-gray-700 font-medium"
              >
                Breathing Pattern:
              </label>
              <select
                id="breathing_on_off"
                name="breathing_on_off"
                value={formData.breathing_on_off}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102 mt-2"
              >
                {breathingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Chest Pain Duration */}
            <div>
              <label
                htmlFor="chest_pain_duration"
                className="block text-gray-700 font-medium"
              >
                Chest Pain Duration:
              </label>
              <select
                id="chest_pain_duration"
                name="chest_pain_duration"
                value={formData.chest_pain_duration}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102 mt-2"
              >
                {painDurationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 shadow-md transition duration-300 transform hover:scale-105"
              disabled={Object.keys(validationErrors).length > 0 || loading}
            >
              {loading ? "Analyzing..." : "Submit"}
            </button>
          </div>
        </form>

        {/* Prediction Results */}
        {predictionResult && (
          <div 
            id="prediction-result" 
            className="mt-10 p-6 bg-gradient-to-r from-blue-50 to-blue-50 rounded-2xl shadow-xl max-w-6xl mx-auto mb-8"
          >
            <h3 className="text-2xl font-bold text-center mb-6">
              Prediction Results
            </h3>
            
            {/* Result Summary */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h4 className="text-xl font-bold mb-2">Diagnosis</h4>
                  <p className={`text-xl font-semibold ${
                    predictionResult.prediction === "Heart-related death" ? 
                    "text-red-600" : "text-green-600"
                  }`}>
                    {predictionResult.prediction}
                  </p>
                  <p className="mt-2">{predictionResult.message}</p>
                  
                  {predictionResult.prediction_probability !== null && (
                    <p className="mt-4">
                      Confidence: <span className="font-bold">{(predictionResult.prediction_probability * 100).toFixed(2)}%</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Feature Importance Chart */}
            {importanceChartData && (
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h4 className="text-xl font-bold mb-4">Feature Importance</h4>
                <div className="h-96">
                  <Bar data={importanceChartData} options={chartOptions} />
                </div>
              </div>
            )}
            
            {/* Feature Importance Table */}
            {predictionResult.feature_importance && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xl font-bold">Contributing Factors</h4>
                  <button
                    onClick={toggleShowAllFactors}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    {showAllFactors ? "Show Top Factors" : "Show All Factors"}
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-4 border-b text-left">Factor</th>
                        <th className="py-2 px-4 border-b text-right">Importance Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(predictionResult.feature_importance)
                        .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
                        // If showAllFactors is true, show all factors, otherwise show top 15
                        .filter((_, index) => showAllFactors || index < 15)
                        .map(([feature, value], index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                            <td className="py-2 px-4 border-b">{feature}</td>
                            <td className="py-2 px-4 border-b text-right font-mono">
                              {Math.abs(value).toFixed(4)}
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VAForm;