import React, { useState } from "react";
import './index.css';


const FormComponent = () => {
  const [formData, setFormData] = useState({
    built: "",
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
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
      alert(`Prediction: ${data.prediction}`); // Display the prediction result
  
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching the prediction.");
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Post-Mortem Data Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Built */}
        <label className="block">Built</label>
        <select name="built" value={formData.built} onChange={handleChange} className="w-full p-2 border rounded-lg">
          <option value="">Select</option>
          <option value="well">Well</option>
          <option value="average">Average</option>
          <option value="small">Small</option>
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
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;
