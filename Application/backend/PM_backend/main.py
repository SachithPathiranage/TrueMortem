from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pickle
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import shap  # SHAP for interpretability

app = FastAPI()

# Allow requests from React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to the actual frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (POST, GET, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Load the trained model
with open('rf_classifier_2.pkl', 'rb') as f:
    model = pickle.load(f)
    

# Define the encoding mappings
encoding_mappings = {
    "sex": {"Male": "M", "Female": "F"},
    "nourished": {"well": 1, "moderately": 2, "poorly": 3},
    "age": {"young": 1, "middle": 2, "old": 3},
    "ChestcavityFreeairoradhesions": {"yes": 1, "no": 0},
    "HeartSizeinconfiguration": {"normal": 0, "enlarged": 1},
    "HeartInjuries": {"yes": 1, "no": 0},
    "normalMyocardium": {"yes": 1, "no": 0},
    "recentIschaemicChanges": {"yes": 1, "no": 0},
    "Myocardialfibrosispresentin": {
        "posterior free wall": 1,
        "antero lateral wall": 2,
        "inter-ventricular septum": 3,
        "not present": 0
    },
    "Concentrichypertrophydetected": {"yes": 1, "no": 0},
    "HeartValvesnormal": {"yes": 1, "no": 0},
    "BloodVesselsCoronaryarteries": {"calcified": 1, "patent": 2, "non": 0},
    "FreeofStenosis": {"yes": 1, "no": 0},
    "BloodVesselsCoronaryarterycondition": {"thrombosis": 1, "anomaly": 2, "non": 0},
    "BloodVesselsclacifiedandstenosedwithpatchyatheromatousplaques": {"yes": 1, "no": 0},
    "Aortacondition": {"remarkable": 1, "unremarkable": 0},
    "AortaInjuries": {"yes": 1, "no": 0},
    "Atheromatousplaquespresentintheaorta": {"calcified": 1, "ulcerated": 2, "non": 0},
}

# Define the request model
class PostMortemData(BaseModel):
    sex: str
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

# Load the trained scaler and PCA model (if you saved them)
scaler = StandardScaler()
pca = PCA(n_components=1)

@app.post("/predict")
def predict_death_cause(data: PostMortemData):
    try:
        # Convert input data to dictionary
        data_dict = data.dict()
        print("Received Data:", data_dict)  # Debugging

        # Encode categorical values
        encoded_features = []
        pca_input = []  # Store PCA-related features separately

        for key, value in data_dict.items():
            if key in encoding_mappings:
                encoded_value = encoding_mappings[key].get(value, 0)  # Default to 0 if not found
                
                # Check if it's one of the PCA-related columns
                if key in [
                    "BloodVesselsclacifiedandstenosedwithpatchyatheromatousplaques"
                ]:
                    pca_input.append(encoded_value)  # Append encoded value to PCA input
                else:
                    encoded_features.append(encoded_value)
            
            elif key in [
                "BloodVesselsLeftanteriordescendingartery",
                "BloodVesselsrightcoronaryartery",
                "BloodVesselsLeftcircumflexartery"
            ]:
                pca_input.append(float(value))  # Collect numerical PCA-related features
            else:
                encoded_features.append(float(value))  # Convert numerical values

        print("Encoded Features Before PCA:", encoded_features)  
        print("PCA Input Features:", pca_input)  # Debugging

        # Apply PCA Transformation
        pca_scaled = scaler.fit_transform([pca_input])  # Standardize
        pca_component = pca.fit_transform(pca_scaled)  # Apply PCA

        print("PCA Component:", pca_component[0][0])  

        # Add PCA component to encoded features
        encoded_features.append(pca_component[0][0])

        print("Final Encoded Features (With PCA):", encoded_features)

        # Convert to NumPy array and reshape for prediction
        input_features = np.array(encoded_features).reshape(1, -1)

        print("Input Features Shape:", input_features.shape)  # Debugging

        # Make a prediction
        prediction = model.predict(input_features)  
        print("Raw Prediction:", prediction)  # Debugging

        # Convert to human-readable result
        result = "Heart-related death" if prediction[0] == 1 else "Not heart-related"

        # SHAP Explanationi
        explainer = shap.TreeExplainer(model)
        # explainer = shap.KernelExplainer(model.predict, shap.sample(X_train, 100))  # Use this for other models

        shap_values = explainer(np.array(encoded_features).reshape(1, -1))
        
        feature_contributions = {
            feature: round(value, 4)
            for feature, value in zip(data_dict.keys(), shap_values.values.flatten())
        }

        # Generate report
        report = f"**Heart Disease Prediction Report**\n\n"
        report += f"**Prediction:** {result}\n\n"
        report += "**Feature Contributions:**\n"
        for feature, contribution in feature_contributions.items():
            report += f"- {feature}: {contribution}\n"
        
        report += "\nThis prediction is based on the provided autopsy details and the model's learned relationships."

        print(report)

        return {
            "prediction": result,
            "feature_contributions": feature_contributions,
            "report": report
        } 
    

    except Exception as e:
        print("Error:", str(e))  # Print the error for debugging
        return {"error": str(e)}
