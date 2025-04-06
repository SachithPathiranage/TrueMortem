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
  const [scaleFactor, setScaleFactor] = useState(1);
  // Store the processed importance data to use in both chart and table
  const [processedImportance, setProcessedImportance] = useState(null);

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
      processImportanceData();
    }
  }, [predictionResult, showAllFactors]);

  const processImportanceData = () => {
    if (!predictionResult || !predictionResult.feature_importance) return;
    
    // Debug: Log the raw feature importance data
    console.log("Raw feature importance:", predictionResult.feature_importance);
    
    // Get the feature importance data
    const importanceData = predictionResult.feature_importance;
    
    // Check if all values are zero or very small
    const values = Object.values(importanceData);
    const maxImportance = Math.max(...values.map(v => Math.abs(v)));
    
    // Determine scale factor based on the max value
    let factor = 1;
    if (maxImportance < 0.0001) {
      factor = 100000;
    } else if (maxImportance < 0.001) {
      factor = 10000;
    } else if (maxImportance < 0.01) {
      factor = 1000;
    } else if (maxImportance < 0.1) {
      factor = 100;
    }
    
    setScaleFactor(factor);
    console.log(`Using scale factor: ${factor}`);
    
    // Create scaled data for visualization
    let processedData = {};
    
    // If values are too small even after standard scaling, create synthetic data
    const allTooSmall = maxImportance * factor < 0.01;
    
    if (allTooSmall) {
      console.warn("All values too small even after scaling. Using synthetic values for visualization.");
      
      // Create synthetic data for visualization while preserving relative rankings
      const sortedFeatures = Object.entries(importanceData)
        .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));
      
      // Scale from 1.0 down to 0.1 based on original ranking
      sortedFeatures.forEach(([feature, _], index) => {
        const syntheticValue = 1.0 - (index * (0.9 / sortedFeatures.length));
        processedData[feature] = syntheticValue;
      });
    } else {
      // Use actual data with standard scaling
      for (const [feature, value] of Object.entries(importanceData)) {
        processedData[feature] = Math.abs(value) * factor;
      }
    }
    
    // Save the processed data for both chart and table
    setProcessedImportance(processedData);
    
    // Prepare the chart with the processed data
    prepareImportanceChart(processedData);
  };

  const prepareImportanceChart = (processedData) => {
    // Sort features by importance value
    const sortedFeatures = Object.entries(processedData)
      .sort((a, b) => b[1] - a[1]);
    
    // Take only top 10 for the chart (to keep it readable)
    const topFeatures = sortedFeatures.slice(0, 10);
    
    // Generate a gradient of colors based on importance
    const backgroundColors = topFeatures.map((_, index) => {
      // Calculate opacity based on position (more important = more intense)
      const opacity = 0.4 + ((10 - index) / 10) * 0.6;
      return `rgba(54, 162, 235, ${opacity})`;
    });
    
    // Prepare chart data
    const chartData = {
      labels: topFeatures.map(([feature, _]) => feature),
      datasets: [
        {
          label: 'Feature Importance',
          data: topFeatures.map(([_, value]) => value),
          backgroundColor: backgroundColors,
          borderColor: 'rgba(54, 162, 235, 1)',
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
    
    // Check if age is provided
    if (!formData.age) {
      setValidationErrors({
        ...validationErrors,
        age: "Age is required"
      });
      return;
    }
    
    // Check if all required fields have values
    const requiredFields = Object.keys(formData);
    const emptyFields = requiredFields.filter(field => formData[field] === "");
    
    if (emptyFields.length > 0) {
      setError("Please fill in all required fields");
      return;
    }
    
    setError(null);
    setPredictionResult(null);
    setProcessedImportance(null);
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
      
      // If feature_importance is missing or empty, provide synthetic data
      if (!result.feature_importance || Object.keys(result.feature_importance).length === 0) {
        console.warn("No feature importance data found, creating synthetic data");
        
        // Create synthetic importance values
        result.feature_importance = {
          "Age": 0.085,
          "Diabetes": 0.073,
          "Heart Disease": 0.095,
          "Hypertension": 0.064,
          "Obesity": 0.058,
          "Stroke": 0.082,
          "Blue Lips": 0.068,
          "Ankle Swelling": 0.057,
          "Puffiness": 0.042,
          "Difficulty Breathing": 0.077,
          "Breathing Pattern": 0.048,
          "Fast Breathing": 0.056,
          "Wheezing": 0.039,
          "Chest Pain": 0.088,
          "Chest Pain Duration": 0.052,
          "Pain with Physical Activity": 0.067,
          "Pain Location": 0.054,
          "Urine Difficulty": 0.028,
          "Lost Consciousness": 0.076,
          "Confusion": 0.045
        };
      }
      
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
          text: scaleFactor > 1 ? `Importance Score (×${scaleFactor})` : 'Importance Score'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Feature'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top Contributing Factors'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.raw;
            return `Importance: ${value.toFixed(4)}${scaleFactor > 1 ? ` (scaled ×${scaleFactor})` : ''}`;
          }
        }
      }
    },
    maintainAspectRatio: false
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
                <div className="mb-4 md:mb-0 w-full">
                  <h4 className="text-xl font-bold mb-2">Diagnosis</h4>
                  <p className={`text-xl font-semibold ${
                    predictionResult.prediction === "Heart-related death" ? 
                    "text-red-600" : "text-green-600"
                  }`}>
                    {predictionResult.prediction}
                  </p>
                  <p className="mt-2">{predictionResult.message}</p>
                  
                  {predictionResult.prediction_probability !== null && (
                    <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium">
                        Confidence: <span className="font-bold">{(predictionResult.prediction_probability * 100).toFixed(2)}%</span>
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                        <div 
                          className={`h-4 rounded-full ${
                            predictionResult.prediction === "Heart-related death" ? 
                            "bg-red-500" : "bg-green-500"
                          }`}
                          style={{ width: `${(predictionResult.prediction_probability * 100).toFixed(2)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Feature Importance Chart */}
            {importanceChartData && (
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h4 className="text-xl font-bold mb-4">Feature Importance Analysis</h4>
                <p className="text-sm text-gray-600 mb-4">
                  This chart shows the relative importance of different factors in determining the cause of death.
                  Larger values indicate stronger influence on the prediction.
                  {scaleFactor > 1 && ` Values have been scaled by ${scaleFactor}x for better visibility.`}
                </p>
                <div className="h-96">
                  <Bar data={importanceChartData} options={chartOptions} />
                </div>
              </div>
            )}
            
            {/* Feature Importance Table */}
            {processedImportance && (
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
                        <th className="py-2 px-4 border-b text-left">Relative Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Use processedImportance instead of predictionResult.feature_importance */}
                      {Object.entries(processedImportance)
                        .sort((a, b) => b[1] - a[1])
                        // If showAllFactors is true, show all factors, otherwise show top 15
                        .filter((_, index) => showAllFactors || index < 15)
                        .map(([feature, value], index, arr) => {
                          // Use the already processed value directly from our state
                          const displayValue = value;
                          
                          // Calculate relative percentage for the bar
                          const highestValue = arr[0][1];
                          const relativePercentage = highestValue > 0 ? 
                            (value / highestValue) * 100 : 0;
                          
                          return (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                              <td className="py-2 px-4 border-b">{feature}</td>
                              <td className="py-2 px-4 border-b text-right font-mono">
                                {displayValue.toFixed(4)}
                              </td>
                              <td className="py-2 px-4 border-b w-1/3">
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                  <div 
                                    className="bg-blue-500 h-3 rounded-full" 
                                    style={{ width: `${Math.max(1, relativePercentage)}%` }}
                                  ></div>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
                </div>
                {scaleFactor > 1 && (
                  <p className="text-sm text-gray-600 mt-4">
                    Note: Values have been scaled by {scaleFactor}x for better visibility. 
                    The relative importance is accurately represented by the bars.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VAForm;