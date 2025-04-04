from fastapi import FastAPI, HTTPException
import requests
from fastapi.middleware.cors import CORSMiddleware
from PM import predict_death_cause, PostMortemData
from VA import predict_heart_disease, HealthData
from auth import router as auth_router
import pickle
from dotenv import load_dotenv
import os

app = FastAPI()

env_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".env"))
load_dotenv(dotenv_path=env_path)

# ✅ Get API Key from .env file
API_KEY = os.getenv("OPENROUTER_API_KEY")

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

@app.post("/generate-report")
@app.post("/generate-report/")
def generate_report(data: dict):
    print("Received data:", data)
    prediction = data.get("prediction")
    features = data.get("features", [])

    if not prediction or not features:
        raise HTTPException(status_code=400, detail="Missing prediction data")

    # Create a more structured prompt that explicitly requests a point-by-point format
    prompt = f"""
    Generate a structured medical analysis report explaining the prediction: '{prediction}'.
    
    Format the report with the following components:
    
    1. HEADING: A clear title for the report
    2. SUMMARY: A brief overview of the prediction and key findings (2-3 sentences)
    3. KEY FACTORS: List the top contributing features with their values, each with:
       - Feature name and numeric impact
       - A detailed medical explanation of how this feature influences the prediction
       - Clinical significance of this finding
    4. SECONDARY FACTORS: Brief mention of less impactful features that still contribute to the overall prediction
    5. CONCLUSION: A concise summary of the medical implications
    
    Use professional medical terminology. Do NOT format as a letter or email.
    Present information in clear, numbered sections with proper headings.
    
    Base your analysis on these feature contributions:
    {features}
    """
    
    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={"Authorization": f"Bearer {API_KEY}"},
            json={
                "model": "mistralai/mistral-7b-instruct",  # Updated model ID
                "messages": [
                    {
                        "role": "system", 
                        "content": "You are an expert medical analyst who creates structured, professional medical reports. You focus on clarity, organization, and medical precision. You never write in letter format or include salutations."
                    },
                    {"role": "user", "content": prompt}
                ],
                "temperature": 0.7
            },
        )
        
        response.raise_for_status()
        result = response.json()
        
        if "choices" not in result or not result.get("choices"):
            return {"error": "Invalid response format from OpenRouter API", "details": result}
            
        return result.get("choices")[0]["message"]["content"]
    except requests.exceptions.RequestException as e:
        print(f"OpenRouter API Error: {str(e)}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Response content: {e.response.text}")
        
        # Try fallback models if the first one fails
        fallback_models = ["openai/gpt-3.5-turbo", "anthropic/claude-instant-v1"]
        
        for model in fallback_models:
            try:
                print(f"Trying fallback model: {model}")
                response = requests.post(
                    "https://openrouter.ai/api/v1/chat/completions",
                    headers={"Authorization": f"Bearer {API_KEY}"},
                    json={
                        "model": model,
                        "messages": [
                            {
                                "role": "system", 
                                "content": "You are an expert medical analyst who creates structured, professional medical reports. You focus on clarity, organization, and medical precision. You never write in letter format or include salutations."
                            },
                            {"role": "user", "content": prompt}
                        ],
                        "temperature": 0.7
                    },
                )
                
                response.raise_for_status()
                result = response.json()
                
                if "choices" in result and result.get("choices"):
                    return result.get("choices")[0]["message"]["content"]
            except Exception as inner_e:
                print(f"Error with fallback model {model}: {str(inner_e)}")
                continue
                
        # If all models fail
        raise HTTPException(
            status_code=500, 
            detail="Failed to generate report with any available model"
        )

@app.post("/predict/verbal_autopsy")
async def verbal_autopsy_prediction(data: HealthData):
    return predict_heart_disease(data, expected_columns, va_model)

@app.get("/")
def root():
    return {"message": "Unified TrueMortem API for Postmortem and Verbal Autopsy Models"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
