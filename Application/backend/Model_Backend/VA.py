import pandas as pd
import numpy as np
from pydantic import BaseModel
from typing import List, Dict, Any

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

        # Extract feature importance
        feature_importance = {}
        
        if hasattr(va_model, "feature_importances_"):
            # For tree-based models (Random Forest, XGBoost, etc.)
            importances = va_model.feature_importances_
            for i, col in enumerate(expected_columns):
                # Make feature name more readable
                readable_name = col.replace('_', ' ').title()
                if readable_name.startswith('Had '):
                    readable_name = readable_name[4:]  # Remove "Had " prefix
                feature_importance[readable_name] = float(importances[i])
        elif hasattr(va_model, "coef_"):
            # For linear models (Logistic Regression, SVM, etc.)
            coefs = va_model.coef_[0] if len(va_model.coef_.shape) > 1 else va_model.coef_
            for i, col in enumerate(expected_columns):
                readable_name = col.replace('_', ' ').title()
                if readable_name.startswith('Had '):
                    readable_name = readable_name[4:]  # Remove "Had " prefix
                feature_importance[readable_name] = float(coefs[i])
        else:
            # If model doesn't expose feature importance, use permutation importance
            # as a fallback (this is a simplified approach)
            base_prediction = va_model.predict_proba(input_encoded)[:, 1] if hasattr(va_model, "predict_proba") else va_model.predict(input_encoded)
            
            for i, col in enumerate(expected_columns):
                # Make a copy and shuffle one feature
                perturbed = input_encoded.copy()
                perturbed.iloc[0, i] = 1 - perturbed.iloc[0, i]  # Flip the feature value
                
                # See how prediction changes
                perturbed_prediction = va_model.predict_proba(perturbed)[:, 1] if hasattr(va_model, "predict_proba") else va_model.predict(perturbed)
                
                # Calculate importance as change in prediction
                importance = abs(perturbed_prediction[0] - base_prediction[0])
                
                readable_name = col.replace('_', ' ').title()
                if readable_name.startswith('Had '):
                    readable_name = readable_name[4:]  # Remove "Had " prefix
                feature_importance[readable_name] = float(importance)
        
        # Sort feature importance
        feature_importance = dict(sorted(
            feature_importance.items(), 
            key=lambda item: abs(item[1]), 
            reverse=True
        ))

        # Create message based on prediction
        if prediction[0] == 1:
            message = "The analysis indicates that heart disease was a significant factor in the death."
            result = "Heart-related death"
        else:
            message = "The analysis suggests that heart disease was likely not a significant factor in the death."
            result = "Not heart-related"

        # Return the response
        return {
            "message": message,
            "prediction": result,
            "prediction_probability": float(probabilities[0]) if hasattr(va_model, "predict_proba") else None,
            "feature_importance": feature_importance 
        }

    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        raise Exception(f"Error in prediction: {str(e)}")