from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import numpy as np
import pandas as pd

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the input data model
class HealthData(BaseModel):
    age: str  # Changed to str since  model expects it
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

# Load the trained model
# Load the trained model
try:
    model_path = r"C:\Users\ahame\Downloads\ML Model\va_model.pkl"  # Use raw string
    with open(model_path, 'rb') as file:
        model = pickle.load(file)
except Exception as e:
    print(f"Error loading model: {str(e)}")
    print(f"Attempted to load from path: {model_path}")

@app.get("/")
def read_root():
    return {"message": "Heart Disease Prediction API"}

@app.post("/predict")
async def predict_heart_disease(data: HealthData):
    try:
        # Convert input data to DataFrame
        input_data = pd.DataFrame([data.dict()])
        
        # Create dummy variables for categorical columns
        categorical_columns = [col for col in input_data.columns if col != 'age']
        input_encoded = pd.get_dummies(input_data, columns=categorical_columns)
        
        # Ensure the input data has the same columns as the model expects
        # Load the expected columns (saved during training)
        expected_columns = [
    'age',
    'had_diabetes_Yes', 'had_diabetes_No', 'had_diabetes_Don\'t Know', 'had_diabetes_Refused to Answer',
    'had_heart_disease_Yes', 'had_heart_disease_No', 'had_heart_disease_Don\'t Know', 'had_heart_disease_Refused to Answer',
    'had_hypertension_Yes', 'had_hypertension_No', 'had_hypertension_Don\'t Know', 'had_hypertension_Refused to Answer',
    'had_obesity_Yes', 'had_obesity_No', 'had_obesity_Don\'t Know', 'had_obesity_Refused to Answer',
    'had_stroke_Yes', 'had_stroke_No', 'had_stroke_Don\'t Know', 'had_stroke_Refused to Answer',
    'had_blue_lips_Yes', 'had_blue_lips_No', 'had_blue_lips_Don\'t Know', 'had_blue_lips_Refused to Answer',
    'had_ankle_swelling_Yes', 'had_ankle_swelling_No', 'had_ankle_swelling_Don\'t Know', 'had_ankle_swelling_Refused to Answer',
    'had_puffiness_Yes', 'had_puffiness_No', 'had_puffiness_Don\'t Know', 'had_puffiness_Refused to Answer',
    'had_diff_breathing_Yes', 'had_diff_breathing_No', 'had_diff_breathing_Don\'t Know', 'had_diff_breathing_Refused to Answer',
    'breathing_on_off_Continuous', 'breathing_on_off_On and Off', 'breathing_on_off_Don\'t Know',
    'fast_breathing_Yes', 'fast_breathing_No', 'fast_breathing_Don\'t Know', 'fast_breathing_Refused to Answer',
    'had_wheezed_Yes', 'had_wheezed_No', 'had_wheezed_Don\'t Know', 'had_wheezed_Refused to Answer',
    'had_chest_pain_Yes', 'had_chest_pain_No', 'had_chest_pain_Don\'t Know', 'had_chest_pain_Refused to Answer',
    'chest_pain_duration_<30 minutes', 'chest_pain_duration_0.5-24 hours', 'chest_pain_duration_>24 hr', 'chest_pain_duration_Don\'t Know', 'chest_pain_duration_Refused to Answer',
    'physical_action_painful_Yes', 'physical_action_painful_No', 'physical_action_painful_Don\'t Know', 'physical_action_painful_Refused to Answer',
    'pain_location_Chest', 'pain_location_Other', 'pain_location_Don\'t Know', 'pain_location_Refused to Answer',
    'urine_stop_Yes', 'urine_stop_No', 'urine_stop_Don\'t Know', 'urine_stop_Refused to Answer',
    'had_lost_consciousness_Yes', 'had_lost_consciousness_No', 'had_lost_consciousness_Don\'t Know', 'had_lost_consciousness_Refused to Answer',
    'had_confusion_Yes', 'had_confusion_No', 'had_confusion_Don\'t Know', 'had_confusion_Refused to Answer'
]
        
        # Add missing columns with default value 0
        for column in expected_columns:
            if column not in input_encoded.columns:
                input_encoded[column] = 0
        
        # Reorder columns to match the model's expected input
        input_encoded = input_encoded[expected_columns]
        
        # Make prediction
        prediction = model.predict(input_encoded)
        probability = model.predict_proba(input_encoded)
        
        # Get feature importance if available
        feature_importance = None
        if hasattr(model, 'feature_importances_'):
            feature_importance = dict(zip(input_encoded.columns, model.feature_importances_))
            # Sort and get top 5 features
            feature_importance = dict(sorted(feature_importance.items(), 
                                          key=lambda x: x[1], 
                                          reverse=True)[:5])
        
        return {
            "prediction": int(prediction[0]),
            "probability": float(probability[0][1]),
            "risk_level": "High" if probability[0][1] > 0.7 
                         else "Medium" if probability[0][1] > 0.3 
                         else "Low",
            "feature_importance": feature_importance,
            "message": "High risk of heart disease" if prediction[0] == 1 
                      else "Low risk of heart disease"
        }
    except Exception as e:
        raise HTTPException(status_code=500, 
                          detail=f"Prediction error: {str(e)}")