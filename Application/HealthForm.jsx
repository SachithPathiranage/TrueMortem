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

  const standardOptions = [
    { value: '', label: 'Select an option' },
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
    { value: "Don't Know", label: "Don't Know" },
    { value: 'Refused to Answer', label: 'Refused to Answer' }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add API call here to send data to backend
  };

  return (
    <div className="health-form-container">
      <h2>Heart Disease Risk Assessment</h2>
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
          { id: 'had_diabetes', label: 'Do you have diabetes?' },
          { id: 'had_heart_disease', label: 'Do you have heart disease?' },
          { id: 'had_hypertension', label: 'Do you have hypertension?' },
          { id: 'had_obesity', label: 'Do you have obesity?' },
          { id: 'had_stroke', label: 'Have you had a stroke?' },
          { id: 'had_blue_lips', label: 'Have you experienced blue lips?' },
          { id: 'had_ankle_swelling', label: 'Do you have ankle swelling?' },
          { id: 'had_puffiness', label: 'Do you experience puffiness?' },
          { id: 'had_diff_breathing', label: 'Do you have difficulty breathing?' },
          { id: 'fast_breathing', label: 'Do you experience fast breathing?' },
          { id: 'had_wheezed', label: 'Have you experienced wheezing?' },
          { id: 'had_chest_pain', label: 'Do you have chest pain?' },
          { id: 'physical_action_painful', label: 'Is physical activity painful?' },
          { id: 'had_lost_consciousness', label: 'Have you lost consciousness?' },
          { id: 'had_confusion', label: 'Do you experience confusion?' }
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

        {/* Special questions with different options */}
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
    </div>
  );
};

export default HealthForm;