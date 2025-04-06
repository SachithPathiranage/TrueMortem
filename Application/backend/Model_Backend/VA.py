import pandas as pd
import numpy as np
from pydantic import BaseModel
from typing import Dict, Any
import shap
from sklearn.ensemble import VotingClassifier

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
    """
    Predicts heart disease risk and explains the prediction using SHAP values.
    Handles VotingClassifier with LGBM, RandomForest, and SVM components.
    
    Args:
        data: HealthData - Input health metrics
        expected_columns: List[str] - Features the model expects
        va_model: VotingClassifier - Trained ensemble model
        
    Returns:
        Dict with prediction results and SHAP-based explanations
    """
    try:
        # --- Data Preparation ---
        # Convert input to DataFrame and one-hot encode
        input_data = pd.DataFrame([data.dict()])
        categorical_columns = [col for col in input_data.columns if col != 'age']
        input_encoded = pd.get_dummies(input_data, columns=categorical_columns)
        
        # Ensure all expected columns are present
        for col in expected_columns:
            if col not in input_encoded.columns:
                input_encoded[col] = 0
        input_encoded = input_encoded[expected_columns].astype(float)

        # --- Prediction ---
        if hasattr(va_model, "predict_proba"):
            probabilities = va_model.predict_proba(input_encoded)[:, 1]
            threshold = 0.3
            prediction = (probabilities >= threshold).astype(int)
        else:
            prediction = va_model.predict(input_encoded)
            probabilities = None

        # --- SHAP Explanation ---
        # Initialize SHAP explainer for each base model
        shap_values_list = []
        feature_importances = {}
        
        for name, model in va_model.named_estimators_.items():
            try:
                # Create appropriate explainer for each model type
                if name == 'svm':
                    # For SVM, use KernelExplainer with a sample of background data
                    background = shap.sample(input_encoded, 10)
                    explainer = shap.KernelExplainer(model.predict_proba, background)
                    shap_values = explainer.shap_values(input_encoded)[1]  # Class 1
                else:
                    # For tree-based models (LGB, RF)
                    explainer = shap.TreeExplainer(model)
                    shap_values = explainer.shap_values(input_encoded)
                    if isinstance(shap_values, list):  # For classification
                        shap_values = shap_values[1]  # Class 1
                
                # Store SHAP values and calculate feature importance
                shap_values_list.append(shap_values)
                
                # Calculate mean absolute SHAP for each feature
                for i, col in enumerate(expected_columns):
                    readable_name = col.replace('_', ' ').replace('had ', '').title()
                    if readable_name not in feature_importances:
                        feature_importances[readable_name] = 0
                    feature_importances[readable_name] += np.abs(shap_values[:, i]).mean()
            
            except Exception as e:
                print(f"Warning: SHAP failed for {name} model: {str(e)}")
                continue

        # Average feature importance across all models
        if feature_importances:
            for key in feature_importances:
                feature_importances[key] /= len(shap_values_list)
        
        # Sort features by importance
        feature_importance = dict(sorted(
            feature_importances.items(),
            key=lambda item: item[1],
            reverse=True
        ))

        # --- Prepare Results ---
        result = {
            "message": "Heart-related death" if prediction[0] == 1 else "Not heart-related",
            "prediction": "Heart-related death" if prediction[0] == 1 else "Not heart-related",
            "prediction_probability": float(probabilities[0]) if probabilities is not None else None,
            "feature_importance": feature_importance,
            "model_used": "VotingClassifier (LGBM + RF + SVM)"
        }

        return result

    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        raise Exception(f"Prediction failed: {str(e)}")