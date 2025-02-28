import requests
from rasa_sdk import Action
from rasa_sdk.events import UserUtteranceReverted

# OpenRouter API Key
API_KEY = "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"  # Replace with your actual key

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

        try:
            # OpenRouter API Request
            url = "https://openrouter.ai/api/v1/chat/completions"
            headers = {
                "Authorization": f"Bearer {API_KEY}",
                "Content-Type": "application/json",
                "HTTP-Referer": "your_project_name",  # Replace with your project name
            }
            data = {
                "model": "mistralai/mixtral-8x7b-instruct",  # Mixtral 8x7B-Instruct
                "messages": [
                    {"role": "system", "content": system_instruction},
                    {"role": "user", "content": user_message}
                ],
                "temperature": 0.7
            }

            response = requests.post(url, headers=headers, json=data)

            # Check if the API request was successful (status code 200)
            if response.status_code != 200:
                llm_response = f"API request failed with status code {response.status_code}: {response.text}"
            else:
                # Get the response text from API
                response_json = response.json()

                # Ensure the response contains valid data
                llm_response = response_json.get("choices", [{}])[0].get("message", {}).get("content", "I'm not sure, but I can try to learn!")

                # If no valid response, show more specific fallback
                if llm_response == "I'm not sure, but I can try to learn!":
                    llm_response = "Sorry, I couldn't process your request. Please try again."

        except Exception as e:
            llm_response = f"An error occurred: {str(e)}"

        # Send the response to the user
        dispatcher.utter_message(text=llm_response)
        return [UserUtteranceReverted()]
