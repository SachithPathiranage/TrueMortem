#!/bin/bash

echo "Starting Model Backend..."
(cd Application/backend/Model_Backend && python main.py) &

echo "Starting Chatbot Rasa Server..."
(cd Application/backend/ChatBot/SecondProject && rasa run --enable-api --cors '*') &

echo "Starting Rasa Actions..."
(cd Application/backend/ChatBot/SecondProject && rasa run actions) &

echo "Starting Frontend..."
(cd Application/frontend/TrueMortem && npm run dev) &

# Wait for all background processes to finish
wait

echo "✅ All services started successfully!"
