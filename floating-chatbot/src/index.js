// src/index.js
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import ChatAPP from './components/ChatAPP';

const Chatbot = () => {
  return (
    chatbotData.isAdmin || chatbotData.isSubscribed
      ?
      <ChatAPP />
      : null


  );
};

const chatbotContainer = document.createElement('div');
chatbotContainer.id = 'floating-chatbot-container';
document.body.appendChild(chatbotContainer);
ReactDOM.render(<Chatbot />, chatbotContainer);
