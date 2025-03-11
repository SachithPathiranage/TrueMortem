import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../Chatbot.css";
import { FiSend } from "react-icons/fi";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  
  // Create a reference for the chat box
  const chatBoxRef = useRef(null);

  const handleSend = async (messageText) => {
    if (messageText.trim() === "") return;

    // Add user message to chat
    const newMessages = [...messages, { text: messageText, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      // Send user message to Rasa's REST API directly
      const response = await axios.post(
        "http://localhost:5005/webhooks/rest/webhook",
        {
          sender: "user",
          message: messageText,
        }
      );

      // Check if Rasa sent a response
      if (response.data.length > 0) {
        const botResponse = response.data[0].text; // Get response text
        setMessages([...newMessages, { text: botResponse, sender: "bot" }]);
      } else {
        setMessages([
          ...newMessages,
          { text: "No response from chatbot.", sender: "bot" },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([
        ...newMessages,
        { text: "Error connecting to chatbot.", sender: "bot" },
      ]);
    }
  };

  // Scroll to the bottom of the chat when messages change
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle pressing Enter to send the message
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent new line in input
      handleSend(input); // Send the message
    }
  };

  return (
    <div className="app-background">
      <div className="chat-container">
        <div className="chat-header">
          <img src="/trueMortem.png" alt="Bot Logo" className="bot-logo" />
          <h2>What can I help with?</h2>
          <p>Choose a prompt below or write your own to start chatting.</p>
        </div>

        {/* Fix button click handlers */}
        <div className="quick-replies">
          <button onClick={() => handleSend("What is heart disease?")}>
            What’s a heart disease?
          </button>
          <button onClick={() => handleSend("Tell me about hypertension.")}>
            Tell me about hypertension?
          </button>
          <button onClick={() => handleSend("What is CAD?")}>
            What is CAD?
          </button>
        </div>

        <div className="chat-box" ref={chatBoxRef}>
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
            onKeyDown={handleKeyDown} // Add event handler for Enter key
          />
          <button onClick={() => handleSend(input)}>
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
