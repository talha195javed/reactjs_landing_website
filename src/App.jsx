import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import Chatbot from '@/components/Chatbot1/Chatbot';
import ChatFAB from "@/components/chatBot/ChatFAB.jsx"; // Adjust path as needed

function App() {
    const { pathname } = useLocation();
    const [showChatbot, setShowChatbot] = useState(false);

    // Optional: Initial messages
    const initialMessages = [
        { text: "Hello! I'm your assistant. How can I help you today?", isUser: false }
    ];

    return (
        <>
            {/* Navbar always shown above the routed views */}
            <Navbar routes={routes} />

            {/* All your routes */}
            <Routes>
                {routes.map(
                    ({ path, element }, key) =>
                        element && <Route key={key} exact path={path} element={element} />
                )}
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
            <ChatFAB/>
        </>
    );
}

export default App;
