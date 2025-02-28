from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib]]\

import numpy as np
import pandas as pd

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the input data model
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

# Load the trained model
try:
    model = joblib.load('model/heart_disease_model.joblib')
except:
    print("Error: Model file not found. Please ensure the model is saved in the correct location.")

@app.get("/")
def read_root():
    return {"message": "Heart Disease Prediction API"}

@app.post("/predict")
async def predict_heart_disease(data: HealthData):
    try:
        # Convert input data to DataFrame
        input_data = pd.DataFrame([data.dict()])
        
        # Preprocess the input data (similar to training preprocessing)
        # Note: You'll need to apply the same preprocessing steps used during training
        # This includes handling categorical variables, scaling, etc.
        
        # Make prediction
        prediction = model.predict(input_data)
        probability = model.predict_proba(input_data)
        
        return {
            "prediction": int(prediction[0]),
            "probability": float(probability[0][1]),
            "message": "High risk of heart disease" if prediction[0] == 1 else "Low risk of heart disease"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 