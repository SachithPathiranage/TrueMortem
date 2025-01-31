import React, { useState } from "react";
import axios from "axios";

function App() {
    const [formData, setFormData] = useState({
        age: "",
        gender: "",
        medical_history: "",
        symptoms: "",
        other_factors: "",
    });

    const [prediction, setPrediction] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/predict", formData);
            setPrediction(response.data.cause_of_death);
        } catch (error) {
            console.error("Error fetching prediction:", error);
        }
    };

    return (
        <div className="container">
            <h1>TrueMortem - Cause of Death Prediction</h1>
            <form onSubmit={handleSubmit}>
                <label>Age:</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} required />

                <label>Gender:</label>
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <label>Medical History:</label>
                <textarea name="medical_history" value={formData.medical_history} onChange={handleChange} required />

                <label>Symptoms:</label>
                <textarea name="symptoms" value={formData.symptoms} onChange={handleChange} required />

                <label>Other Factors:</label>
                <textarea name="other_factors" value={formData.other_factors} onChange={handleChange} required />

                <button type="submit">Predict</button>
            </form>

            {prediction && (
                <div className="result">
                    <h2>Predicted Cause of Death:</h2>
                    <p>{prediction}</p>
                </div>
            )}
        </div>
    );
}

export default App;
