import React, { useState } from "react";
// import ReportCard from "./ReportCard"; // Import ReportCard component
import './index.css';
import { Bar, Pie } from "react-chartjs-2"; // Import visualization libraries
import "chart.js/auto"; // Required for Chart.js to work
import "./index.css";


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
  const [featureContributions, setFeatureContributions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
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
      setFeatureContributions(data.feature_contributions); // Feature importance from the model
      console.log("Response Data:", data); // Debugging output
      console.log("Report Data:", data.prediction)
      
      alert(`Prediction: ${data.prediction}`); // Display the prediction result
  
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching the prediction.");
    }
    finally {
      setLoading(false);
  }
  };
  

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Post-Mortem Data Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Sex */}
        <label className="block">Sex</label>
        <select name="sex" value={formData.sex} onChange={handleChange} className="w-full p-2 border rounded-lg">
          <option value="">Select</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>

        {/* Nourished */}
        <label className="block">Nourished</label>
        <select name="nourished" value={formData.nourished} onChange={handleChange} className="w-full p-2 border rounded-lg">
          <option value="">Select</option>
          <option value="well">Well</option>
          <option value="moderately">Moderately</option>
          <option value="poorly">Poorly</option>
        </select>

        {/* Age */}
        <label className="block">Age</label>
        <select name="age" value={formData.age} onChange={handleChange} className="w-full p-2 border rounded-lg">
          <option value="">Select</option>
          <option value="young">Young</option>
          <option value="middle">Middle</option>
          <option value="old">Old</option>
        </select>

        {/* Chest cavity-Free air or adhesions*/}
        <label className="block">Chest cavity-Free air or adhesions</label>
        <select name="ChestcavityFreeairoradhesions" value={formData.ChestcavityFreeairoradhesions} onChange={handleChange} className="w-full p-2 border rounded-lg">
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        {/* Pericardial Fluid */}
        <label className="block">Pericardial Fluid in (ml)</label>
        <input type="number" name="pericardialFluid" value={formData.pericardialFluid} onChange={handleChange} className="w-full p-2 border rounded-lg" />

        {/* Heart Size */}
        <label className="block">Heart Size (g)</label>
        <input type="number" name="heartSize" value={formData.heartSize} onChange={handleChange} className="w-full p-2 border rounded-lg" />

        {/* Heart-Size in configuration */}
        <label className="block">Heart-Size in configuration</label>
        <select name="HeartSizeinconfiguration" value={formData.HeartSizeinconfiguration} onChange={handleChange} className="w-full p-2 border rounded-lg">
          <option value="">Select</option>
          <option value="normal">Normal</option>
          <option value="enlarged">Enlarged</option>
        </select>

        {/* Heart-Injuries */}
        <label className="block"> Heart-Injuries</label>
        <select name="HeartInjuries" value={formData.HeartInjuries} onChange={handleChange} className="w-full p-2 border rounded-lg">
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        {/* Normal Myocardium */}
        <label className="block">Normal Myocardium</label>
        <select name="normalMyocardium" value={formData.normalMyocardium} onChange={handleChange} className="w-full p-2 border rounded-lg">
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        {/*Recent ischaemic changes*/}
        <label className="block">Recent ischaemic changes</label>
        <select name="recentIschaemicChanges" value={formData.recentIschaemicChanges} onChange={handleChange} className="w-full p-2 border rounded-lg">
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        {/*Heart-Myocardial fibrosis present in*/}
        <label className="block">Heart-Myocardial fibrosis present in</label>
        <select name="Myocardialfibrosispresentin" value={formData.Myocardialfibrosispresentin} onChange={handleChange} className="w-full p-2 border rounded-lg">
          <option value="">Select</option>
          <option value="posterior free wall">posterior free wall</option>
          <option value="antero lateral wall">antero lateral wall</option>
          <option value="inter-ventricular septum">inter-ventricular septum</option>
          <option value="not present">not present</option>
        </select>

        {/*Heart-Concentric hypertrophy detected*/}
        <label className="block">Heart-Concentric hypertrophy detected</label>
        <select name="Concentrichypertrophydetected" value={formData.Concentrichypertrophydetected} onChange={handleChange} className="w-full p-2 border rounded-lg">
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        {/*Heart-Valves normal*/}
        <label className="block">Heart-Valves normal</label>
        <select name="HeartValvesnormal" value={formData.HeartValvesnormal} onChange={handleChange} className="w-full p-2 border rounded-lg">
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        {/*Blood Vessels-Coronary arteries*/}
        <label className="block">Blood Vessels-Coronary arteries</label>
        <select name="BloodVesselsCoronaryarteries" value={formData.BloodVesselsCoronaryarteries} onChange={handleChange} className="w-full p-2 border rounded-lg">
          <option value="">Select</option>
          <option value="calcified">calcified</option>
          <option value="patent">patent</option>
          <option value="non">non</option>
        </select>

        {/*Blood Vessels-Free of Stenosis*/}
        <label className="block">Blood Vessels-Free of Stenosis</label>
        <select name="FreeofStenosis" value={formData.FreeofStenosis} onChange={handleChange} className="w-full p-2 border rounded-lg">
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        {/*Blood Vessels-Coronary artery condition*/}
        <label className="block">Blood Vessels-Coronary artery condition</label>
        <select name="BloodVesselsCoronaryarterycondition" value={formData.BloodVesselsCoronaryarterycondition} onChange={handleChange} className="w-full p-2 border rounded-lg">
          <option value="">Select</option>
          <option value="thrombosis">thrombosis</option>
          <option value="anomaly">anomaly</option>
          <option value="non">non</option>
        </select>

        {/*Blood Vessels-clacified and stenosed with patchy atheromatous plaques*/}
        <label className="block">Blood Vessels-clacified and stenosed with patchy atheromatous plaques</label>
        <select name="BloodVesselsclacifiedandstenosedwithpatchyatheromatousplaques" value={formData.BloodVesselsclacifiedandstenosedwithpatchyatheromatousplaques} onChange={handleChange} className="w-full p-2 border rounded-lg">
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        {/* Blood Vessels-Left anterior descending artery*/}
        <label className="block">Blood Vessels-Left anterior descending artery</label>
        <input type="number" name="BloodVesselsLeftanteriordescendingartery" value={formData.BloodVesselsLeftanteriordescendingartery} onChange={handleChange} className="w-full p-2 border rounded-lg" />

        {/* Blood Vessels-right coronary artery */}
        <label className="block">Blood Vessels-right coronary artery</label>
        <input type="number" name="BloodVesselsrightcoronaryartery" value={formData.BloodVesselsrightcoronaryartery} onChange={handleChange} className="w-full p-2 border rounded-lg" />

        {/* Blood Vessels-Left circumflex artery */}
        <label className="block">Blood Vessels-Left circumflex artery</label>
        <input type="number" name="BloodVesselsLeftcircumflexartery" value={formData.BloodVesselsLeftcircumflexartery} onChange={handleChange} className="w-full p-2 border rounded-lg" />

        {/*Aorta condition */}
        <label className="block">Aorta condition</label>
        <select name="Aortacondition" value={formData.Aortacondition} onChange={handleChange} className="w-full p-2 border rounded-lg">
          <option value="">Select</option>
          <option value="remarkable">Remarkable</option>
          <option value="unremarkable">Unremarkable</option>
        </select>

        {/*Aorta Injuries*/}
        <label className="block">Aorta Injuries</label>
        <select name="AortaInjuries" value={formData.AortaInjuries} onChange={handleChange} className="w-full p-2 border rounded-lg">
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        {/*Atheromatous plaques present in the aorta*/}
        <label className="block">Atheromatous plaques present in the aorta</label>
        <select name="Atheromatousplaquespresentintheaorta" value={formData.Atheromatousplaquespresentintheaorta} onChange={handleChange} className="w-full p-2 border rounded-lg">
          <option value="">Select</option>
          <option value="calcified">calcified</option>
          <option value="uncalcified">uncalcified</option>
          <option value="non">non</option>
        </select>

        {/* Submit Button */}
        <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
        {loading ? "Predicting..." : "Submit"}
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {/* Dashboard Visualization */}
      {prediction && featureContributions && (
        <div className="mt-8 p-6 bg-gray-100 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-center">Prediction Result</h3>
          <p className="text-center text-lg font-bold mt-2">{prediction}</p>

          {/* Feature Contribution Bar Chart */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Feature Contributions</h3>
            <Bar
              data={{
                labels: Object.keys(featureContributions),
                datasets: [
                  {
                    label: "Feature Importance",
                    data: Object.values(featureContributions),
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          </div>

          {/* Feature Contribution Pie Chart */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Feature Contribution Distribution</h3>
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
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FormComponent;
