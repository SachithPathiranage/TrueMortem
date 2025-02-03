from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import uvicorn

app = FastAPI()

# Define input data model
class PredictionInput(BaseModel):
    age: int
    gender: str
    medical_history: str
    symptoms: str
    other_factors: str

# Load model
with open("rf_classifier_2.pkl", "rb") as f:
    model = pickle.load(f)

@app.post("/predict")
def predict_cause_of_death(data: PredictionInput):
    input_data = [data.age, data.gender, data.medical_history, data.symptoms, data.other_factors]
    prediction = model.predict([input_data])  # Adjust based on your model
    return {"cause_of_death": prediction[0]}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)