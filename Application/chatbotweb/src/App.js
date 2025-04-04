import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import axios from "axios";
import { FiSend } from "react-icons/fi";
import SignIn from "./SignIn";
import Register from "./Register";
import "./App.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async (messageText) => {
    if (messageText.trim() === "") return;

    const newMessages = [...messages, { text: messageText, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post("http://localhost:5005/webhooks/rest/webhook", {
        sender: "user",
        message: messageText,
      });

      if (response.data.length > 0) {
        const botResponse = response.data[0].text;
        setMessages([...newMessages, { text: botResponse, sender: "bot" }]);
      } else {
        setMessages([...newMessages, { text: "No response from chatbot.", sender: "bot" }]);
      }
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
          <button onClick={() => handleSend(input)}>
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/chat" /> : <SignIn setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/chat" element={isAuthenticated ? <Chatbot /> : <Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
};

export default App;
