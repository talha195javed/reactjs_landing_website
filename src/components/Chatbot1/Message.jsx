import React from 'react';
import './styles.css';

const Message = ({ message, isUser }) => {
    return (
        <div className={`message ${isUser ? 'user-message' : 'bot-message'}`}>
            <div className="message-content">
                {message}
            </div>
            <div className="message-time">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
    );
};

export default Message;
