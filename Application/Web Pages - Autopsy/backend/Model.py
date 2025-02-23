from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
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
    expected_columns = model.feature_names_in_  # Ensure correct column alignment
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

        # One-hot encode categorical columns
        categorical_columns = [col for col in input_data.columns if col != 'age']
        input_encoded = pd.get_dummies(input_data, columns=categorical_columns)

        # Align input features with model's expected columns
        for col in expected_columns:
            if col not in input_encoded.columns:
                input_encoded[col] = 0  # Add missing columns

        input_encoded = input_encoded[expected_columns]  # Drop extra columns

        # Convert all columns to float (Fixing "astype(flo)" issue)
        input_encoded = input_encoded.astype(float)

        # Debugging print
        print(f"✅ Processed Input Data Shape: {input_encoded.shape}")

        # Validate feature count
        if input_encoded.shape[1] != model.n_features_in_:
            raise HTTPException(status_code=400, detail=f"Feature mismatch: Model expects {model.n_features_in_}, but received {input_encoded.shape[1]}")

        # Predict
        prediction = model.predict(input_encoded)
        probability = model.predict_proba(input_encoded)

        # Feature importance (if available)
        feature_importance = None
        if hasattr(model, 'feature_importances_'):
            feature_importance = dict(zip(input_encoded.columns, model.feature_importances_))
            feature_importance = dict(sorted(feature_importance.items(), key=lambda x: x[1], reverse=True)[:5])

        return {
            "prediction": int(prediction[0]),
            "probability": float(probability[0][1]),
            "risk_level": "High" if probability[0][1] > 0.7 else "Medium" if probability[0][1] > 0.3 else "Low",
            "feature_importance": feature_importance,
            "message": "High risk of heart disease" if prediction[0] == 1 else "Low risk of heart disease"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")
