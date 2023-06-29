import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import Footer from '../components/Footer';

function MessageInterface() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setIsLoggedIn(true); 
        return isLoggedIn;
      }else
        setIsLoggedIn(false)
        return isLoggedIn;
    });
  const [messages, setMessages] = useState([
    { id: 1, text: 'Merhaba!', sender: 'User' },
    { id: 2, text: 'Nasılsın?', sender: 'User' },
    { id: 3, text: 'İyiyim, teşekkür ederim. Sen nasılsın?', sender: 'Other' },
    { id: 4, text: 'Ben de iyiyim, teşekkürler.', sender: 'Other' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        sender: 'User',
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  return (
    <>
    <style>{`
.message-interface {
    display: flex;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f0f0f0;
    border-radius: 8px;
  }
  
  .message-sidebar {
    flex: 0 0 200px;
    padding-right: 20px;
  }
  
  .message-sidebar h2 {
    margin-bottom: 10px;
  }
  
  .contact-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .contact {
    padding: 10px;
    margin-bottom: 5px;
    background-color: #e9ecef;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .contact:hover {
    background-color: #ccc;
  }
  
  .message-container {
    flex: 1;
  }
  
  .message {
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    font-size: 14px;
  }
  
  .user {
    background-color: #007bff;
    color: #fff;
  }
  
  .other {
    background-color: #e9ecef;
    color: #000;
  }
  
  .input-container {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
  
  .input-field {
    flex: 1;
    padding: 8px;
    border-radius: 5px;
    border: none;
    font-size: 14px;
  }
  
  .send-button {
    padding: 8px 16px;
    margin-left: 10px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
  }
  
  .send-button:hover {
    background-color: #0056b3;
  }
  
    `}

    </style>
    <Navbar/>
    <div style={{marginTop:"100px"}} className="message-interface">
      <div className="message-sidebar">
        <h2>Mesajlaştığınız Kişiler</h2>
        <ul className="contact-list">
          <li className="contact">Zeynep Demir</li>
          <li className="contact">Ali Kaya</li>
          <li className="contact">Mehmet Özçelik</li>
        </ul>
      </div>
      <div className="message-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === 'User' ? 'user' : 'other'}`}
          >
            {message.text}
          </div>
        ))}
        <div className="input-container">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Mesajınızı yazın..."
            className="input-field"
          />
          <button onClick={handleSendMessage} className="send-button">
            Gönder
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default MessageInterface;