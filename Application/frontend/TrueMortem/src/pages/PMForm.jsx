import React, { useState } from "react";
import AnimatedBackground from "../components/Animation";
import { Bar, Pie } from "react-chartjs-2"; // Import visualization libraries
import "chart.js/auto"; // Required for Chart.js to work
import "../PMform.css";
import ReactMarkdown from "react-markdown";
import axios from "axios";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    sex: "",
    nourished: "",
    age: "",
    ChestcavityFreeairoradhesions: "",
    pericardialFluid: "",
    heartSize: "",
    HeartSizeinconfiguration: "",
    HeartInjuries: "",
    normalMyocardium: "",
    recentIschaemicChanges: "",
    Myocardialfibrosispresentin: "",
    Concentrichypertrophydetected: "",
    HeartValvesnormal: "",
    BloodVesselsCoronaryarteries: "",
    FreeofStenosis: "",
    BloodVesselsCoronaryarterycondition: "",
    BloodVesselsclacifiedandstenosedwithpatchyatheromatousplaques: "",
    BloodVesselsLeftanteriordescendingartery: "",
    BloodVesselsrightcoronaryartery: "",
    BloodVesselsLeftcircumflexartery: "",
    Aortacondition: "",
    AortaInjuries: "",
    Atheromatousplaquespresentintheaorta: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [featureContributions, setFeatureContributions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Remove error message for this field when user enters valid input
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (value) {
        delete newErrors[name]; // Remove error if value is entered
      }
      return newErrors;
    });
  };

  const validateForm = () => {
    let newErrors = {};

    // Validate sex
    if (!formData.sex) {
      newErrors.sex = "Sex is required";
    }

    // Validate nourished
    if (!formData.nourished) {
      newErrors.nourished = "Nourishment status is required";
    }

    // Validate age
    if (!formData.age) {
      newErrors.age = "Age group is required";
    }

    // Validate chest cavity condition
    if (!formData.ChestcavityFreeairoradhesions) {
      newErrors.ChestcavityFreeairoradhesions =
        "Chest cavity condition is required";
    }

    // Validate pericardial fluid (should be a number)
    if (isNaN(formData.pericardialFluid)) {
      newErrors.pericardialFluid = "Pericardial fluid must be a number";
    }

    if (!formData.pericardialFluid) {
      newErrors.pericardialFluid = "Amount of pericardial fluid is required";
    }

    // Validate heart size (should be a number)
    if (!formData.heartSize || isNaN(formData.heartSize)) {
      newErrors.heartSize = "Heart size must be a number";
    }

    if (!formData.heartSize) {
      newErrors.heartSize = "Heart size is required";
    }

    // Validate heart size configuration
    if (!formData.HeartSizeinconfiguration) {
      newErrors.HeartSizeinconfiguration =
        "Heart size configuration is required";
    }

    // Validate heart injuries
    if (!formData.HeartInjuries) {
      newErrors.HeartInjuries = "Heart injuries status is required";
    }

    // Validate myocardium condition
    if (!formData.normalMyocardium) {
      newErrors.normalMyocardium = "Mycardium condition is required";
    }

    // Validate Recent Ischaemic Changes
    if (!formData.recentIschaemicChanges) {
      newErrors.recentIschaemicChanges =
        "Recent Ischaemic Changes row needs to be filled";
    }

    // Validate myocardial fibrosis
    if (!formData.Myocardialfibrosispresentin) {
      newErrors.Myocardialfibrosispresentin =
        "Heart myocardial fibrosis condition is required";
    }

    // Validate concentric hypertrophy
    if (!formData.Concentrichypertrophydetected) {
      newErrors.Concentrichypertrophydetected =
        "Heart concentric hypertrophy detection is required";
    }

    // Validate heart valves
    if (!formData.HeartValvesnormal) {
      newErrors.HeartValvesnormal = "Heart valves status is required";
    }

    // Validate coronary arteries condition
    if (!formData.BloodVesselsCoronaryarteries) {
      newErrors.BloodVesselsCoronaryarteries =
        "Coronary arteries condition is required";
    }

    // Validate stenosis
    if (!formData.FreeofStenosis) {
      newErrors.FreeofStenosis = "Blood vessels' stenosis status is required";
    }

    // Validate coronary artery condition
    if (!formData.BloodVesselsCoronaryarterycondition) {
      newErrors.BloodVesselsCoronaryarterycondition =
        "Coronary artery condition is required";
    }

    // Validate blood vessels calcified
    if (
      !formData.BloodVesselsclacifiedandstenosedwithpatchyatheromatousplaques
    ) {
      newErrors.BloodVesselsclacifiedandstenosedwithpatchyatheromatousplaques =
        "Blood vessels' calcification status is required";
    }

    // Validate aorta condition
    if (!formData.Aortacondition) {
      newErrors.Aortacondition = "Aorta condition is required";
    }

    // Validate aorta injuries
    if (!formData.AortaInjuries) {
      newErrors.AortaInjuries = "Aorta injuries status is required";
    }

    // Validate atheromatous plaques in aorta
    if (!formData.Atheromatousplaquespresentintheaorta) {
      newErrors.Atheromatousplaquespresentintheaorta =
        "Atheromatous plaques in the aorta status is required";
    }

    // Validate percentage fields (0-100)
    const percentageFields = [
      "BloodVesselsLeftanteriordescendingartery",
      "BloodVesselsrightcoronaryartery",
      "BloodVesselsLeftcircumflexartery",
    ];

    percentageFields.forEach((field) => {
      const value = formData[field];
      if (value === "") {
        newErrors[field] = "This field is required";
      } else if (isNaN(Number(value)) || value < 0 || value > 100) {
        newErrors[field] = "Value must be between 0 and 100";
      }
    });

    // If there are errors, show an alert
    if (Object.keys(newErrors).length > 0) {
      alert("Please complete all required fields before submitting.");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    

    if (validateForm()) {
      alert("Form submitted successfully!");
    }

    else{
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/predict/postmortem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const data = await response.json();

      setPrediction(data.prediction);
      console.log("Response Data:", data); // Debugging output
      setConfidence(data.confidence);
      alert(`Prediction: ${data.prediction}`); // Display the prediction result
      setFeatureContributions(data.feature_contributions); // Feature importance from the model

      // Auto-scroll to the prediction result
      setTimeout(() => {
        const resultElement = document.getElementById("prediction-result");
        if (resultElement) {
          resultElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching the prediction.");
    } finally {
      setLoading(false);
    }
  };

  const [report, setReport] = useState("");
  const generateReport = async () => {
    setLoading(true);
    try {
      const allFeatures = Object.entries(featureContributions)
        .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1])) // Sort by absolute contribution
        .map(([feature, contribution]) => `${feature}: ${contribution.toFixed(4)}`);

      const response = await axios.post("http://127.0.0.1:8000/generate-report", {
        prediction,
        features: allFeatures, // Send all features, not just the top 10
      });

      setReport(response.data);
    } catch (error) {
      console.error("Error generating report:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <AnimatedBackground />
      <div className="w-full mx-auto bg-white bg-opacity-80 rounded-b-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 pt-6">
          Cause of Death Prediction
        </h2>
        <div className="relative z-10">
          <form onSubmit={handleSubmit} className="space-y-6 p-8 max-w-6xl">
            {/* Row 1: Three Columns */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Sex */}
              <div>
                <label className="block font-semibold">Sex</label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  className="w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102 "
                >
                  <option value="">Select</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
                {errors.sex && <p className="error">{errors.sex}</p>}
              </div>

              {/* Nourished */}
              <div>
                <label className="block font-semibold">Nourished</label>
                <select
                  name="nourished"
                  value={formData.nourished}
                  onChange={handleChange}
                  className="w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102"
                >
                  <option value="">Select</option>
                  <option value="well">Well</option>
                  <option value="moderately">Moderately</option>
                  <option value="poorly">Poorly</option>
                </select>
                {errors.nourished && (
                  <p className="error">{errors.nourished}</p>
                )}
              </div>
            </div>

            {/* Row 2: Two Columns */}
            {/* Age */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold">Age</label>
                <select
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102"
                >
                  <option value="">Select</option>
                  <option value="young">Young</option>
                  <option value="middle">Middle</option>
                  <option value="old">Old</option>
                </select>
                {errors.age && <p className="error">{errors.age}</p>}
              </div>

              {/* Chest cavity-Free air or adhesions*/}
              <div>
                <label className="block font-semibold">
                  Chest cavity-Free air or adhesions
                </label>
                <select
                  name="ChestcavityFreeairoradhesions"
                  value={formData.ChestcavityFreeairoradhesions}
                  onChange={handleChange}
                  className="w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.ChestcavityFreeairoradhesions && (
                  <p className="error">
                    {errors.ChestcavityFreeairoradhesions}
                  </p>
                )}
              </div>

              {/* Row 3: Three Columns */}
              {/* Pericardial Fluid */}
              <div>
                <label className="block font-semibold">
                  Pericardial Fluid in (ml)
                </label>
                <input
                  type="number"
                  name="pericardialFluid"
                  value={formData.pericardialFluid}
                  onChange={handleChange}
                  className="w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102"
                />
                {errors.pericardialFluid && (
                  <p className="error">{errors.pericardialFluid}</p>
                )}
              </div>

              {/* Heart Size */}
              <div>
                <label className="block font-semibold">Heart Size (g)</label>
                <input
                  type="number"
                  name="heartSize"
                  value={formData.heartSize}
                  onChange={handleChange}
                  className="w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102"
                />
                {errors.heartSize && (
                  <p className="error">{errors.heartSize}</p>
                )}
              </div>
            </div>

            {/* Row 4: Three Columns */}
            {/* Heart-Size in configuration */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold">
                  Heart-Size in configuration
                </label>
                <select
                  name="HeartSizeinconfiguration"
                  value={formData.HeartSizeinconfiguration}
                  onChange={handleChange}
                  className="w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102"
                >
                  <option value="">Select</option>
                  <option value="normal">Normal</option>
                  <option value="enlarged">Enlarged</option>
                </select>
                {errors.HeartSizeinconfiguration && (
                  <p className="error">{errors.HeartSizeinconfiguration}</p>
                )}
              </div>

              {/* Heart-Injuries */}
              <div>
                <label className="block font-semibold">Injuries in Heart</label>
                <select
                  name="HeartInjuries"
                  value={formData.HeartInjuries}
                  onChange={handleChange}
                  className="w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.HeartInjuries && (
                  <p className="error">{errors.HeartInjuries}</p>
                )}
              </div>
            </div>

            {/* Row 5: Three Columns */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Normal Myocardium */}
              <div>
                <label className="block font-semibold">Normal Myocardium</label>
                <select
                  name="normalMyocardium"
                  value={formData.normalMyocardium}
                  onChange={handleChange}
                  className="w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.normalMyocardium && (
                  <p className="error">{errors.normalMyocardium}</p>
                )}
              </div>

              <div>
                {/*Recent ischaemic changes*/}
                <label className="block font-semibold">
                  Recent ischaemic changes
                </label>
                <select
                  name="recentIschaemicChanges"
                  value={formData.recentIschaemicChanges}
                  onChange={handleChange}
                  className="w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.recentIschaemicChanges && (
                  <p className="error">{errors.recentIschaemicChanges}</p>
                )}
              </div>
            </div>

            {/* Row 6: Three Columns */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                {/*Heart-Myocardial fibrosis present in*/}
                <label className="block font-semibold">
                  Myocardial fibrosis present in Heart
                </label>
                <select
                  name="Myocardialfibrosispresentin"
                  value={formData.Myocardialfibrosispresentin}
                  onChange={handleChange}
                  className="w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102"
                >
                  <option value="">Select</option>
                  <option value="posterior free wall">
                    posterior free wall
                  </option>
                  <option value="antero lateral wall">
                    antero lateral wall
                  </option>
                  <option value="inter-ventricular septum">
                    inter-ventricular septum
                  </option>
                  <option value="not present">not present</option>
                </select>
                {errors.Myocardialfibrosispresentin && (
                  <p className="error">{errors.Myocardialfibrosispresentin}</p>
                )}
              </div>

              <div>
                {/*Heart-Concentric hypertrophy detected*/}
                <label className="block font-semibold">
                  Concentric hypertrophy detected in Heart
                </label>
                <select
                  name="Concentrichypertrophydetected"
                  value={formData.Concentrichypertrophydetected}
                  onChange={handleChange}
                  className="w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.Concentrichypertrophydetected && (
                  <p className="error">
                    {errors.Concentrichypertrophydetected}
                  </p>
                )}
              </div>
            </div>

            {/* Row 7: Three Columns */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                {/*Heart-Valves normal*/}
                <label className="block font-semibold">
                  Heart-Valves normal
                </label>
                <select
                  name="HeartValvesnormal"
                  value={formData.HeartValvesnormal}
                  onChange={handleChange}
                  className="w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.HeartValvesnormal && (
                  <p className="error">{errors.HeartValvesnormal}</p>
                )}
              </div>

              <div>
                {/*Blood Vessels-Coronary arteries*/}
                <label className="block font-semibold">
                  Coronary arteries condition
                </label>
                <select
                  name="BloodVesselsCoronaryarteries"
                  value={formData.BloodVesselsCoronaryarteries}
                  onChange={handleChange}
                  className="w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102"
                >
                  <option value="">Select</option>
                  <option value="calcified">calcified</option>
                  <option value="patent">patent</option>
                  <option value="non">non</option>
                </select>
                {errors.BloodVesselsCoronaryarteries && (
                  <p className="error">{errors.BloodVesselsCoronaryarteries}</p>
                )}
              </div>
            </div>

            {/* Row 8: two Columns */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                {/*Blood Vessels-Free of Stenosis*/}
                <label className="block font-semibold">
                  Blood Vessels-Free of Stenosis
                </label>
                <select
                  name="FreeofStenosis"
                  value={formData.FreeofStenosis}
                  onChange={handleChange}
                  className="w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.FreeofStenosis && (
                  <p className="error">{errors.FreeofStenosis}</p>
                )}
              </div>

              <div>
                {/*Blood Vessels-Coronary artery condition*/}
                <label className="block font-semibold">
                  Blood Vessels-Coronary artery condition
                </label>
                <select
                  name="BloodVesselsCoronaryarterycondition"
                  value={formData.BloodVesselsCoronaryarterycondition}
                  onChange={handleChange}
                  className="w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102"
                >
                  <option value="">Select</option>
                  <option value="thrombosis">thrombosis</option>
                  <option value="anomaly">anomaly</option>
                  <option value="non">non</option>
                </select>
                {errors.BloodVesselsCoronaryarterycondition && (
                  <p className="error">
                    {errors.BloodVesselsCoronaryarterycondition}
                  </p>
                )}
              </div>
            </div>

            {/* Row 9: one Column */}
            <div>
              {/*Blood Vessels-clacified and stenosed with patchy atheromatous plaques*/}
              <label className="block font-semibold">
                Blood Vessels-clacified and stenosed with patchy atheromatous
                plaques
              </label>
              <select
                name="BloodVesselsclacifiedandstenosedwithpatchyatheromatousplaques"
                value={
                  formData.BloodVesselsclacifiedandstenosedwithpatchyatheromatousplaques
                }
                onChange={handleChange}
                className="w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.BloodVesselsclacifiedandstenosedwithpatchyatheromatousplaques && (
                <p className="error">
                  {
                    errors.BloodVesselsclacifiedandstenosedwithpatchyatheromatousplaques
                  }
                </p>
              )}
            </div>

            {/* Row 10: one Columns */}
            {/* Blood Vessels-Left anterior descending artery*/}
            <div>
              <label className="block font-semibold">
                Patchy Atheromatous plaques percentage in Left anterior
                descending artery
              </label>
              <input
                type="number"
                name="BloodVesselsLeftanteriordescendingartery"
                value={formData.BloodVesselsLeftanteriordescendingartery}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102"
              />
              {errors.BloodVesselsLeftanteriordescendingartery && (
                <p className="error">
                  {errors.BloodVesselsLeftanteriordescendingartery}
                </p>
              )}
            </div>

            {/* Blood Vessels-right coronary artery */}
            <div>
              <label className="block font-semibold">
                Patchy Atheromatous plaques percentage in Right coronary artery
              </label>
              <input
                type="number"
                name="BloodVesselsrightcoronaryartery"
                value={formData.BloodVesselsrightcoronaryartery}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102"
              />
              {errors.BloodVesselsrightcoronaryartery && (
                <p className="error">
                  {errors.BloodVesselsrightcoronaryartery}
                </p>
              )}
            </div>

            {/* Blood Vessels-Left circumflex artery */}
            <div>
              <label className="block font-semibold">
                Patchy Atheromatous plaques percentage in Left circumflex artery
              </label>
              <input
                type="number"
                name="BloodVesselsLeftcircumflexartery"
                value={formData.BloodVesselsLeftcircumflexartery}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102"
              />
              {errors.BloodVesselsLeftcircumflexartery && (
                <p className="error">
                  {errors.BloodVesselsLeftcircumflexartery}
                </p>
              )}
            </div>

            {/* Row 8: three Columns */}
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                {/*Aorta condition */}
                <label className="block font-semibold">Aorta condition</label>
                <select
                  name="Aortacondition"
                  value={formData.Aortacondition}
                  onChange={handleChange}
                  className="w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102"
                >
                  <option value="">Select</option>
                  <option value="remarkable">Remarkable</option>
                  <option value="unremarkable">Unremarkable</option>
                </select>
                {errors.Aortacondition && (
                  <p className="error">{errors.Aortacondition}</p>
                )}
              </div>

              {/*Aorta Injuries*/}
              <div>
                <label className="block font-semibold">Aorta Injuries</label>
                <select
                  name="AortaInjuries"
                  value={formData.AortaInjuries}
                  onChange={handleChange}
                  className="w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.AortaInjuries && (
                  <p className="error">{errors.AortaInjuries}</p>
                )}
              </div>

              {/*Atheromatous plaques present in the aorta*/}
              <div>
                <label className="block font-semibold">
                  Atheromatous plaques present in the aorta
                </label>
                <select
                  name="Atheromatousplaquespresentintheaorta"
                  value={formData.Atheromatousplaquespresentintheaorta}
                  onChange={handleChange}
                  className="w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 transform hover:scale-102"
                >
                  <option value="">Select</option>
                  <option value="calcified">calcified</option>
                  <option value="uncalcified">uncalcified</option>
                  <option value="non">non</option>
                </select>
                {errors.Atheromatousplaquespresentintheaorta && (
                  <p className="error">
                    {errors.Atheromatousplaquespresentintheaorta}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 shadow-md transition duration-300 transform hover:scale-105"
            >
              {loading ? "Predicting..." : "Submit"}
            </button>
          </form>
        </div>

      </div>

      {/* Dashboard Visualization */}
      {prediction && featureContributions && (
        <div
          id="prediction-result"
          className="mt-10 p-6 bg-gradient-to-r from-blue-50 to-blue-50 rounded-2xl shadow-xl max-w-6xl mx-auto"
        >
          <h3 className="text-4xl font-bold text-center text-gray-800">
            Prediction Results
          </h3>
          <p
            className={`text-center text-xl font-semibold mt-4 ${
              prediction === "Heart-related death"
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {prediction}
          </p>

          <p className="text-lg">
            <strong>Confidence:</strong> {confidence}%
          </p>

          <div className="w-full bg-gray-200 h-4 rounded-lg mt-2">
            <div
              className="bg-blue-500 h-4 rounded-lg"
              style={{ width: `${confidence}%` }}
            />
          </div>

          {/* Feature Contribution Bar Chart */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-black">
              Feature Contributions
            </h3>
            <div className="relative w-full h-[600px]">
          <Bar
            data={{
              labels: Object.keys(featureContributions),
              datasets: [
                {
                  label: "Feature Importance",
                  data: Object.values(featureContributions),
                  backgroundColor: "rgba(54, 162, 235, 0.7)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  borderWidth: 1.5,
                  barThickness: 18, // Increase bar size
                },
              ],
            }}
            options={{
              responsive: true,
              indexAxis: "y",
              maintainAspectRatio: false,
              scales: {
                x: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Contribution Score",
                    color: "#000",
                    font: { size: 16, weight: "bold" },
                  },
                  ticks: {
                    color: "#333",
                    font: { size: 14 },
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Features",
                    color: "#000",
                    font: { size: 16, weight: "bold" },
                  },
                  ticks: {
                    color: "#000",
                    font: { size: 14, weight: "bold" }, // Make labels bold
                  },
                },
              },
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (context) =>
                      `${context.label}: ${context.parsed.x.toFixed(4)}`,
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Feature Contribution Table */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-black">Feature Contribution Table</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3 text-left font-bold text-black">Feature</th>
                <th className="border p-3 text-left font-bold text-black">Contribution Score</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(featureContributions)
                .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
                .map(([feature, contribution], index) => {
                  const maxContribution = Math.max(
                    ...Object.values(featureContributions).map((v) => Math.abs(v))
                  );
                  const barWidth = (Math.abs(contribution) / maxContribution) * 100;
                  const barColor = contribution > 0 ? "bg-green-500" : "bg-red-500";

                  return (
                    <tr key={index} className="border-b">
                      <td className="border p-3 text-black font-semibold">{feature}</td>
                      <td className="border p-3 text-black">
                        <div className="flex items-center gap-2">
                          <span className="w-14">{contribution.toFixed(4)}</span>
                          <div className="flex-1 bg-gray-200 h-4 rounded-lg overflow-hidden">
                            <div
                              className={`${barColor} h-4`}
                              style={{ width: `${barWidth}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

          {/* Feature Contribution Pie Chart */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-700">
              Feature Contribution Distribution
            </h3>
            <div className="relative w-full h-96">
              <Pie
                data={{
                  labels: Object.keys(featureContributions),
                  datasets: [
                    {
                      data: Object.values(featureContributions),
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.6)",
                        "rgba(54, 162, 235, 0.6)",
                        "rgba(255, 206, 86, 0.6)",
                        "rgba(75, 192, 192, 0.6)",
                        "rgba(153, 102, 255, 0.6)",
                        "rgba(255, 159, 64, 0.6)",
                      ],
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
            <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
      {/* Generate Report Button */}
      <button
        onClick={generateReport}
        className="px-6 py-2 bg-green-500 text-white font-bold rounded-md shadow-md hover:bg-green-600 transition"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Report"}
      </button>

      {/* Show Generated Report Below Charts */}
      {report && (
        <div className="mt-6 p-6 bg-white rounded-md shadow-lg border border-gray-200">
          <div className="medical-report">
            <ReactMarkdown>{report}</ReactMarkdown>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
            >
              Print Report
            </button>
            <button
              onClick={() => {
                const blob = new Blob([report], { type: "text/markdown" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `Medical_Report_${new Date().toISOString().split("T")[0]}.md`;
                a.click();
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Download Report
            </button>
          </div>
        </div>
      )}
    </div>
          </div>
        </div>
      )}
      <div className="mt-8"></div>
    </div>
  );
};

export default FormComponent;
