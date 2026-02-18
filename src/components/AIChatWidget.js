import React, { useState, useEffect, useRef } from 'react';
import '../styles/AIChatWidget.css';
import axios from 'axios';

const AIChatWidget = ({ topic = 'general', position = 'bottom-right' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4'
  };

  useEffect(() => {
    // Initial greeting
    setMessages([
      {
        id: 1,
        text: `Hello! I'm your AstroLearn AI assistant. Ask me anything about ${topic}!`,
        sender: 'ai'
      }
    ]);
  }, [topic]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user'
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // In a real app, you would call your AI API here
      // This is a mock implementation
      const response = await mockAIResponse(inputValue);
      
      const aiMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'ai'
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI request failed:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: 'ai'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const mockAIResponse = async (question) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple mock responses based on keywords
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('rocket') && lowerQuestion.includes('work')) {
      return "Rockets work based on Newton's Third Law of Motion. They burn fuel to create high-pressure gas that's expelled out the back, which creates an equal and opposite force that propels the rocket forward.";
    } else if (lowerQuestion.includes('stages') || lowerQuestion.includes('staging')) {
      return "Rockets have stages to become more efficient as they ascend. Each stage has its own engines and fuel. When a stage runs out of fuel, it's jettisoned to reduce weight, making the remaining rocket more efficient.";
    } else if (lowerQuestion.includes('fuel') || lowerQuestion.includes('propellant')) {
      return "Most rockets use chemical propellants that combine fuel (like kerosene or liquid hydrogen) with an oxidizer (like liquid oxygen). The specific combination depends on the rocket's design and mission requirements.";
    } else if (lowerQuestion.includes('water bottle rocket')) {
      return "Water bottle rockets demonstrate rocket principles using water and compressed air. When launched, the compressed air forces water out rapidly, creating thrust. They're great for learning about pressure, thrust, and aerodynamics!";
    } else {
      return "I'm an AI focused on rocket science. Could you ask me something more specific about rockets, propulsion, or space travel? For example, you could ask 'How do rocket engines work?' or 'What are rocket stages?'";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={`ai-chat-widget ${positionClasses[position]}`}>
      {isOpen ? (
        <div className="chat-container">
          <div className="chat-header">
            <h3>AstroLearn AI Assistant</h3>
            <button 
              className="close-chat"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message ${message.sender}`}
              >
                {message.text}
              </div>
            ))}
            {isLoading && (
              <div className="message ai loading">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Ask about ${topic}...`}
              disabled={isLoading}
            />
            <button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button 
          className="chat-toggle"
          onClick={() => setIsOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12,3C6.5,3,2,6.6,2,11c0,2.1,1.1,4,3,5.3V21l3.6-2c0.9,0.3,1.9,0.4,2.9,0.4c5.5,0,10-3.6,10-8S17.5,3,12,3z"/>
          </svg>
        </button>
      )}
    </div>
  );
};

export default AIChatWidget;