import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { FiSend } from "react-icons/fi";

const App = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Add user message to chat
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      // Send user message to FastAPI
      const response = await axios.post("http://127.0.0.1:8000/chat", {
        message: input
      });

      // Add bot response to chat
      setMessages([...newMessages, { text: response.data.response, sender: "bot" }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([...newMessages, { text: "Error connecting to chatbot.", sender: "bot" }]);
    }
  };

  return (
    <div className="app-background">
      <div className="chat-container">
        <div className="chat-header">
          <img src="/chatbot.png" alt="Bot Logo" className="bot-logo" />
          <h2>What can I help with?</h2>
          <p>Choose a prompt below or write your own to start chatting.</p>
        </div>

        <div className="quick-replies">
          <button onClick={() => handleSend("What is heart disease?")}>What’s a heart disease?</button>
          <button onClick={() => handleSend("Tell me about hypertension.")}>Tell me about hypertension?</button>
          <button onClick={() => handleSend("What is CAD?")}>What is CAD?</button>
        </div>

        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="Type here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSend}>
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
