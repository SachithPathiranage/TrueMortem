from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from PM import predict_death_cause, PostMortemData
from VA import predict_heart_disease, HealthData
from auth import router as auth_router
import pickle
import os

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register the authentication router
app.include_router(auth_router, prefix="/auth")  # Now auth endpoints will be at /auth

# Load models
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PM_MODEL_PATH = os.path.join(BASE_DIR, "../Models/rf_classifier_2.pkl")
VA_MODEL_PATH = os.path.join(BASE_DIR, "../Models/va_model.pkl")

with open(PM_MODEL_PATH, "rb") as f:
    pm_model = pickle.load(f)

with open(VA_MODEL_PATH, "rb") as f:
    va_model = pickle.load(f)
expected_columns = va_model.feature_names_in_

# Prediction Endpoints
@app.post("/predict/postmortem")
def postmortem_prediction(data: PostMortemData):
    return predict_death_cause(data, pm_model)

@app.post("/predict/verbal_autopsy")
async def verbal_autopsy_prediction(data: HealthData):
    return predict_heart_disease(data, expected_columns, va_model)

@app.get("/")
def root():
    return {"message": "Unified TrueMortem API for Postmortem and Verbal Autopsy Models"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
