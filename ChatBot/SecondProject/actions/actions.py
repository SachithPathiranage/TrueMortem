import google.generativeai as genai
from rasa_sdk import Action
from rasa_sdk.events import UserUtteranceReverted

# Configure API Key
genai.configure(api_key="AIzaSyD0jub9BcZ2o5d8ccXVfo04KE9LXBVPNz0")

class ActionFallbackLLM(Action):
    def name(self):
        return "action_fallback_llm"

    def run(self, dispatcher, tracker, domain):
        user_message = tracker.latest_message.get("text")  # Get the user's message

        # Define system instruction to keep responses limited to medical topics
        system_instruction = (
            "You are a medical AI assistant specialized in cardiology and heart diseases. "
            "You should only answer questions related to heart diseases, including symptoms, diagnosis, treatments, medications, lifestyle changes, and advanced medical research. "
            "If a question is unrelated to heart diseases, politely reply: 'Sorry, I specialize in heart disease and related medical topics.' "
            "Provide detailed and scientifically accurate answers based on the latest cardiology research."
        )

        # Call Gemini API for a response
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(f"{system_instruction}\nUser: {user_message}")

        # Ensure a response is available
        llm_response = response.text if response else "I'm not sure, but I can try to learn!"

        dispatcher.utter_message(text=llm_response)
        return [UserUtteranceReverted()]
