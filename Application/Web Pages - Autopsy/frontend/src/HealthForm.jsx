import React, { useState } from 'react';
import './HealthForm.css';

const HealthForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    had_diabetes: '',
    had_heart_disease: '',
    had_hypertension: '',
    had_obesity: '',
    had_stroke: '',
    had_blue_lips: '',
    had_ankle_swelling: '',
    had_puffiness: '',
    had_diff_breathing: '',
    breathing_on_off: '',
    fast_breathing: '',
    had_wheezed: '',
    had_chest_pain: '',
    chest_pain_duration: '',
    physical_action_painful: '',
    pain_location: '',
    urine_stop: '',
    had_lost_consciousness: '',
    had_confusion: ''
  });

  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState(null);

  const standardOptions = [
    { value: '', label: 'Select an option' },
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
    { value: "Don't Know", label: "Don't Know" },
    { value: 'Refused to Answer', label: 'Refused to Answer' }
  ];

  const painLocationOptions = [
    { value: '', label: 'Select an option' },
    { value: 'Upper/middle chest', label: 'Upper/middle chest' },
    { value: 'Lower chest', label: 'Lower chest' },
    { value: 'Left Arm', label: 'Left Arm' },
    { value: 'Other', label: 'Other' },
    { value: 'Refused to Answer', label: 'Refused to Answer' },
    { value: "Don't Know", label: "Don't Know" }
  ];

  const breathingOptions = [
    { value: '', label: 'Select an option' },
    { value: 'Continuous', label: 'Continuous' },
    { value: 'On and Off', label: 'On and Off' },
    { value: "Don't Know", label: "Don't Know" }
  ];

  const painDurationOptions = [
    { value: '', label: 'Select an option' },
    { value: '<30 minutes', label: 'Less than 30 minutes' },
    { value: '0.5-24 hours', label: '30 minutes to 24 hours' },
    { value: '>24 hr', label: 'More than 24 hours' },
    { value: "Don't Know", label: "Don't Know" },
    { value: 'Refused to Answer', label: 'Refused to Answer' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Prediction failed');
      }

      const result = await response.json();
      setPredictionResult(result);
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    }
  };

  return (
    <div className="health-form-container">
      <h2>Cause Of Death Prediction</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        {/* Standard yes/no questions */}
        {[
          { id: 'had_diabetes', label: 'Did deceased have diabetes?' },
          { id: 'had_heart_disease', label: 'Did deceased have heart disease?' },
          { id: 'had_hypertension', label: 'Did deceased have hypertension?' },
          { id: 'had_obesity', label: 'Did deceased have obesity?' },
          { id: 'had_stroke', label: 'Did deceased have a stroke?' },
          { id: 'had_blue_lips', label: 'Did deceased have blue lips?' },
          { id: 'had_ankle_swelling', label: 'Did deceased have ankle swelling?' },
          { id: 'had_puffiness', label: 'Did deceased experience puffiness?' },
          { id: 'had_diff_breathing', label: 'Did deceased have difficulty breathing?' },
          { id: 'fast_breathing', label: 'Did deceased experience fast breathing?' },
          { id: 'had_wheezed', label: 'Did deceased experience wheezing?' },
          { id: 'had_chest_pain', label: 'Did deceased have chest pain?' },
          { id: 'physical_action_painful', label: 'Was physical activity painful?' },
          { id: 'urine_stop', label: 'Did deceased have difficulty urinating?' },
          { id: 'had_lost_consciousness', label: 'Did deceased lose consciousness?' },
          { id: 'had_confusion', label: 'Did deceased experience confusion?' }
        ].map(question => (
          <div className="form-group" key={question.id}>
            <label htmlFor={question.id}>{question.label}</label>
            <select
              id={question.id}
              name={question.id}
              value={formData[question.id]}
              onChange={handleChange}
              required
            >
              {standardOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}

        {/* Pain Location */}
        <div className="form-group">
          <label htmlFor="pain_location">Where was the pain located?</label>
          <select
            id="pain_location"
            name="pain_location"
            value={formData.pain_location}
            onChange={handleChange}
            required
          >
            {painLocationOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Breathing Pattern */}
        <div className="form-group">
          <label htmlFor="breathing_on_off">Breathing Pattern:</label>
          <select
            id="breathing_on_off"
            name="breathing_on_off"
            value={formData.breathing_on_off}
            onChange={handleChange}
            required
          >
            {breathingOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Chest Pain Duration */}
        <div className="form-group">
          <label htmlFor="chest_pain_duration">Chest Pain Duration:</label>
          <select
            id="chest_pain_duration"
            name="chest_pain_duration"
            value={formData.chest_pain_duration}
            onChange={handleChange}
            required
          >
            {painDurationOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>

      {predictionResult && (
        <div className="prediction-result">
          <h3>Prediction Result</h3>
          <p><strong>Risk Level:</strong> {predictionResult.risk_level}</p>
          <p><strong>Probability:</strong> {(predictionResult.probability * 100).toFixed(2)}%</p>
          <p><strong>Message:</strong> {predictionResult.message}</p>
        </div>
      )}
    </div>
  );
};

export default HealthForm;