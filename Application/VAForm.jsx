import React, { useState } from 'react';

const [formData, setFormData] = useState({
  age: "",
  had_diabetes: "",
  // ... existing code ...
});

const [predictionResult, setPredictionResult] = useState(null);
const [error, setError] = useState(null);
const [validationErrors, setValidationErrors] = useState({});

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

  // ... existing code ...
};

return (
  // ... existing code ...
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
  // ... existing code ...
); 