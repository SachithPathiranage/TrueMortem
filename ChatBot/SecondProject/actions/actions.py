from openai import OpenAI
from rasa_sdk import Action
from rasa_sdk.events import UserUtteranceReverted

# Configure OpenRouter API Key
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key="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",
)

class ActionFallbackLLM(Action):
    def name(self):
        return "action_fallback_llm"

    def run(self, dispatcher, tracker, domain):
        user_message = tracker.latest_message.get("text")  # Get the user's message

        # Define system instruction to keep responses limited to heart disease topics
        system_instruction = (
            "You are a medical AI assistant specialized in cardiology and heart diseases. "
            "You should only answer questions related to heart diseases, including symptoms, diagnosis, treatments, medications, lifestyle changes, and advanced medical research. "
            "If a question is unrelated to heart diseases, politely reply: 'Sorry, I specialize in heart disease and related medical topics.' "
            "Provide detailed and scientifically accurate answers based on the latest cardiology research."
        )

        try:
            # Call OpenRouter API using DeepSeek R1 (Free version)
            completion = client.chat.completions.create(
                model="deepseek/deepseek-chat:free",
                messages=[
                    {"role": "system", "content": system_instruction},
                    {"role": "user", "content": user_message},
                ],
                extra_headers={
                    "HTTP-Referer": "your_website_url",  # Optional, for rankings on openrouter.ai
                    "X-Title": "your_project_name"  # Optional, for rankings on openrouter.ai
                },
                extra_body={},  # Can be used for additional OpenRouter settings
            )

            # Extract response text
            llm_response = completion.choices[0].message.content if completion.choices else "I'm not sure, but I can try to learn!"

        except Exception as e:
            llm_response = "I'm sorry, but I couldn't retrieve an answer at the moment."

        # Send response back to user
        dispatcher.utter_message(text=llm_response)
        return [UserUtteranceReverted()]