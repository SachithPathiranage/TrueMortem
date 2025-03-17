import pandas as pd
import numpy as np
from pydantic import BaseModel

# Define the HealthData model for prediction input
class HealthData(BaseModel):
    age: int  
    had_diabetes: str
    had_heart_disease: str
    had_hypertension: str
    had_obesity: str
    had_stroke: str
    had_blue_lips: str
    had_ankle_swelling: str
    had_puffiness: str
    had_diff_breathing: str
    breathing_on_off: str
    fast_breathing: str
    had_wheezed: str
    had_chest_pain: str
    chest_pain_duration: str
    physical_action_painful: str
    pain_location: str
    urine_stop: str
    had_lost_consciousness: str
    had_confusion: str

def predict_heart_disease(data: HealthData, expected_columns, va_model):
    try:
        # Convert input to DataFrame
        input_data = pd.DataFrame([data.dict()])
        print("Received data:", input_data)

        # One-hot encode categorical columns
        categorical_columns = [col for col in input_data.columns if col != 'age']
        input_encoded = pd.get_dummies(input_data, columns=categorical_columns)

        # Align input features with model's expected columns
        for col in expected_columns:
            if col not in input_encoded.columns:
                input_encoded[col] = 0

        input_encoded = input_encoded[expected_columns]
        input_encoded = input_encoded.astype(float)

        # Debug: Print input data for prediction
        print("Input Data for Prediction:", input_encoded)

        # Get prediction probabilities
        if hasattr(va_model, "predict_proba"):
            probabilities = va_model.predict_proba(input_encoded)[:, 1]  # Probability of class 1 (heart disease)
            print("Prediction Probabilities:", probabilities)
            threshold = 0.3  # Adjust this value
            prediction = (probabilities >= threshold).astype(int)
        else:
            prediction = va_model.predict(input_encoded)

        # Debug: Print raw prediction
        print("Raw Prediction:", prediction)

        # Create message based on prediction
        if prediction[0] == 1:
            message = "The analysis indicates that heart disease was a significant factor in the death."
        else:
            message = "The analysis suggests that heart disease was likely not a significant factor in the death."

        # Return the response
        return {
            "message": message,
        }

    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        raise Exception(f"Error in prediction: {str(e)}")