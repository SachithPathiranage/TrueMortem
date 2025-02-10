from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np


app = FastAPI()

# Allow requests from React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to the actual frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (POST, GET, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Define the request model
class PostMortemData(BaseModel):
    built: str
    nourished: str
    age: str
    ChestcavityFreeairoradhesions: str
    pericardialFluid: float
    heartSize: float
    HeartSizeinconfiguration: str
    HeartInjuries: str
    normalMyocardium: str
    recentIschaemicChanges: str
    Myocardialfibrosispresentin: str
    Concentrichypertrophydetected: str
    HeartValvesnormal: str
    BloodVesselsCoronaryarteries: str
    FreeofStenosis: str
    BloodVesselsCoronaryarterycondition: str
    BloodVesselsclacifiedandstenosedwithpatchyatheromatousplaques: str
    BloodVesselsLeftanteriordescendingartery: float
    BloodVesselsrightcoronaryartery: float
    BloodVesselsLeftcircumflexartery: float
    Aortacondition: str
    AortaInjuries: str
    Atheromatousplaquespresentintheaorta: str

# Load the trained model
model = joblib.load("rf_classifier_2.pkl")

@app.post("/predict")
def predict(data: PostMortemData):
    try:
        # Convert input data to a NumPy array for prediction
        input_features = np.array([
            [
                float(data.age),
                data.pericardialFluid,
                data.heartSize,
                data.BloodVesselsLeftanteriordescendingartery,
                data.BloodVesselsrightcoronaryartery,
                data.BloodVesselsLeftcircumflexartery
            ]
        ])  # Include only numeric values for the model

        # Make a prediction
        prediction = model.predict(input_features)[0]

        # Interpret prediction (assuming 1 = Heart-related, 0 = Other)
        result = "Heart-related death" if prediction == 1 else "Not heart-related"
        return {"prediction": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
