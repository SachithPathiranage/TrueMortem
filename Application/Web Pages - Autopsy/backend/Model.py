from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import pandas as pd
import numpy as np

app = FastAPI()

# Configure CORS - Allow all origins for testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=False,  # Set to False when using "*" for origins
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
    model_path = "va_model.pkl"  
    with open(model_path, 'rb') as file:
        model = pickle.load(file)
    expected_columns = model.feature_names_in_
except Exception as e:
    print(f"Error loading model: {str(e)}")
    expected_columns = []

@app.get("/")
def read_root():
    return {"message": "Heart Disease Prediction API"}

@app.post("/predict")
async def predict_heart_disease(data: HealthData):
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

        # Get prediction and probability
        prediction = model.predict(input_encoded)
        probability = model.predict_proba(input_encoded)
        prob_value = float(probability[0][1])

        # Create straightforward message
        if prediction[0] == 1:
            conclusion = "Heart Disease was the likely cause of death"
            explanation = f"The analysis indicates with {(prob_value * 100):.1f}% probability that heart disease was a significant factor in the death."
        else:
            conclusion = "Heart Disease was likely NOT the cause of death"
            explanation = f"The analysis suggests that heart disease was likely not a significant factor in the death (probability: {(prob_value * 100):.1f}%)."

        return {
            "conclusion": conclusion,
            "explanation": explanation,
            "probability": prob_value
        }

    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)