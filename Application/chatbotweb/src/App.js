import React, { useState } from "react";
import "./App.css";
import { FiSend } from "react-icons/fi";

const App = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      setMessages([...newMessages, { text: "I'm just a simple chatbot!", sender: "bot" }]);
    }, 1000);
  };

  const handleQuickReply = (text) => {
    setInput(text);
    handleSend();
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
            <button onClick={() => handleQuickReply("What is heart disease?")}>What’s a heart disease?</button>
            <button onClick={() => handleQuickReply("Tell me about hypertension.")}>Tell me about hypertension?</button>
            <button onClick={() => handleQuickReply("What is CAD?")}>What is CAD?</button>
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
