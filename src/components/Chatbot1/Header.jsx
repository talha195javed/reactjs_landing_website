import React from 'react';
import './styles.css';

const Header = ({ onClose, title }) => {
    return (
        <div className="chatbot-header">
            <div className="chatbot-title">{title || 'Chatbot'}</div>
            <button className="chatbot-close-btn" onClick={onClose}>
                ×
            </button>
        </div>
    );
};

export default Header;
