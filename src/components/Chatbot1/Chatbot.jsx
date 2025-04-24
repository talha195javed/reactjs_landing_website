import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import Message from './Message';
import InputArea from './InputArea';
import './styles.css';

const Chatbot = ({ title, onClose }) => {
    const initialMessage = {
        text: "Hello! I'm here to help. Please select an option:",
        isUser: false,
        options: [
            "Product Information",
            "Pricing Questions",
            "Technical Support",
            "Account Help"
        ]
    };

    const [messages, setMessages] = useState([initialMessage]);
    const [showContactOptions, setShowContactOptions] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, showContactOptions]);

    const handleSend = (message) => {
        // Add user message
        const newMessages = [...messages, { text: message, isUser: true }];
        setMessages(newMessages);
        setShowContactOptions(false);

        // Process user response
        setTimeout(() => {
            handleBotResponse(message, newMessages);
        }, 800);
    };

    const handleQuickReply = (option) => {
        handleSend(option);
    };

    const restartConversation = () => {
        // Clear all messages and restart
        setMessages([initialMessage]);
        setShowContactOptions(false);
    };

    const endConversation = () => {
        // Show thank you message
        setMessages(prev => [...prev, {
            text: "Thank you for your time! Please don't hesitate to reach out if you have any more questions.",
            isUser: false
        }]);

        // Restart conversation after a delay
        setTimeout(() => {
            restartConversation();
        }, 2000);
    };

    const handleBotResponse = (userMessage, previousMessages) => {
        const lowerCaseMessage = userMessage.toLowerCase();
        let response = {};

        // Check for restart triggers
        if (userMessage === "Main Options" ||
            userMessage === "New Question" ||
            userMessage === "Start Over") {
            restartConversation();
            return;
        }

        // Check for conversation end
        if (userMessage === "No, I'm done" || userMessage === "No, thank you") {
            endConversation();
            return;
        }

        // Main options responses
        if (userMessage === "Product Information") {
            response = {
                text: "Our product helps you streamline workflows with AI-powered features. Key benefits include:\n\n• Security First\n" +
                    "Enterprise-grade protection for every visitor interaction, with compliance built into our DNA.\n• Innovation Driven\n" +
                    "Continuous improvement through emerging technologies and user feedback.\n• Exceptional Experiences\n" +
                    "Delighting both visitors and administrators with thoughtful, human-centered design.\n\nWould you like more details about any specific feature?",
                isUser: false,
                options: ["Feature Details", "Pricing", "No, thanks", "Main Options"]
            };
        }
        else if (userMessage === "Pricing Questions") {
            response = {
                text: "We offer flexible pricing plans:\n\n• Basic: AED100.99/month\n• Pro: AED200.99/month\n• Enterprise: Custom pricing\n\nAll plans come with a 14-day free trial. Would you like to compare features?",
                isUser: false,
                options: ["Compare Plans", "Start Free Trial", "Talk to Sales", "Main Options"]
            };
        }
        else if (userMessage === "Technical Support") {
            response = {
                text: "For technical issues, please try:\n\n1. Restarting the application\n2. Clearing your browser cache\n3. Checking our knowledge base\n\nDid this help resolve your issue?",
                isUser: false,
                options: ["Yes, resolved", "No, I need more help", "Main Options"]
            };
        }
        else if (userMessage === "Account Help") {
            response = {
                text: "For account-related questions:\n\n• Reset password: Visit our login page\n• Update billing: Go to Account Settings\n• Close account: Requires email confirmation\n\nWhat specific account help do you need?",
                isUser: false,
                options: ["Password Reset", "Billing Help", "Delete Account", "Main Options"]
            };
        }
        // Secondary level responses
        else if (lowerCaseMessage.includes("feature") || userMessage === "Feature Details") {
            response = {
                text: "Our advanced features include:\n\n• Smart Check-In Experience: \nPre Register Visitor Option\n CheckIn and CheckOut Easy and User Friendly Flows\n Accessibility features for all users\n " +
                    "• Advanced Security Controls: \nReal-time Visitor Records\nID Capture and Facial Image Capture\nUser Agreement\n" +
                    "• Comprehensive Visitor Analytics: Real-time visitor tracking\nComplete Visitors History\nSeparate Dashboard for CheckIn and Checkout Users\n" +
                    "\nWould you like a demo or pricing information?",
                isUser: false,
                options: ["Schedule Demo", "Pricing Info", "No, thanks", "Main Options"]
            };
        }
        else if (lowerCaseMessage.includes("no") || lowerCaseMessage.includes("thanks")) {
            response = {
                text: "You're welcome! Is there anything else I can help you with today?",
                isUser: false,
                options: ["New Question", "No, I'm done"]
            };
        }
        else if (lowerCaseMessage.includes("more help") || lowerCaseMessage.includes("contact")) {
            setShowContactOptions(true);
            return;
        }
        else {
            response = {
                text: "I'm not sure I understand. Would you like to:\n\n1. Choose from our main options\n2. Contact support directly",
                isUser: false,
                options: ["Main Options", "Contact Support"]
            };
        }

        setMessages(prev => [...prev, response]);
    };

    const handleContactChoice = (method) => {
        let contactInfo = "";
        switch(method) {
            case "call":
                contactInfo = "Please call our support team at +971-123-4567. Our hours are Mon-Sat, 9AM-6PM EST.";
                break;
            case "email":
                contactInfo = "Email us at support@smartvisitor.com. We typically respond within 1 business day.";
                break;
            case "livechat":
                contactInfo = "For further Information and Details. Please visit the 'Contact Us' page on our website and Send us detailed Message.";
                break;
            default:
                contactInfo = "You can reach us at support@smartvisitor.com or +971-123-4567.";
        }

        setMessages(prev => [
            ...prev,
            {
                text: contactInfo + "\n\nIs there anything else I can help with?",
                isUser: false,
                options: ["Yes, another question", "No, thank you"]
            }
        ]);
        setShowContactOptions(false);
    };

    return (
        <div className="chatbot-container">
            <Header title={title} onClose={onClose} />

            <div className="chatbot-messages">
                {messages.map((msg, index) => (
                    <React.Fragment key={index}>
                        <Message
                            message={msg.text}
                            isUser={msg.isUser}
                        />
                        {msg.options && !msg.isUser && (
                            <div className="quick-replies">
                                {msg.options.map((option, i) => (
                                    <button
                                        key={i}
                                        className="quick-reply-btn"
                                        onClick={() => handleQuickReply(option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </React.Fragment>
                ))}

                {showContactOptions && (
                    <div className="contact-options">
                        <p>How would you like to contact us?</p>
                        <button onClick={() => handleContactChoice("call")}>Phone Call</button>
                        <button onClick={() => handleContactChoice("email")}>Email</button>
                        <button onClick={() => handleContactChoice("livechat")}>Live Chat</button>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <InputArea onSend={handleSend} />
        </div>
    );
};

export default Chatbot;
