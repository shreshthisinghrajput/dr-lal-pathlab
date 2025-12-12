'use client';

import { useState, useRef, useEffect } from 'react';

// Predefined responses for the rule-based chatbot
const RESPONSES = {
    greeting: {
        patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'namaste'],
        response: 'Hello! Welcome to LAL PATH CLINIC. How can I help you today? You can ask about our tests, timings, location, or how to book.'
    },
    timings: {
        patterns: ['timing', 'time', 'hours', 'open', 'close', 'when', 'schedule'],
        response: 'Our clinic is open:\n📅 Monday - Saturday: 7:00 AM - 9:00 PM\n📅 Sunday: 8:00 AM - 2:00 PM\n\nSample collection is available during all working hours.'
    },
    location: {
        patterns: ['location', 'address', 'where', 'find', 'direction', 'map', 'reach'],
        response: '📍 We are located at:\nNear Main Market, Ambikapur, Chhattisgarh - 497001\n\nYou can find us on Google Maps or visit our Contact page for directions.'
    },
    booking: {
        patterns: ['book', 'appointment', 'schedule', 'register', 'test'],
        response: 'To book a test:\n1️⃣ Register/Login on our website\n2️⃣ Go to "Book a Test" in your dashboard\n3️⃣ Select your test, date & time\n4️⃣ Visit our clinic at the scheduled time\n\nNeed help? Call us at +91 98765 43210'
    },
    tests: {
        patterns: ['test', 'blood', 'urine', 'thyroid', 'diabetes', 'available', 'price', 'cost'],
        response: 'We offer 50+ diagnostic tests including:\n🩸 Blood Tests (CBC, Lipid Profile)\n🦋 Thyroid Profile (T3, T4, TSH)\n📊 Diabetes Panel\n💪 Liver & Kidney Function\n\nVisit our Tests page for full list and prices!'
    },
    report: {
        patterns: ['report', 'result', 'download', 'ready', 'collect'],
        response: 'Reports are usually ready within 24 hours.\n\nTo download your report:\n1️⃣ Login to your account\n2️⃣ Go to "My Bookings"\n3️⃣ Click "Download Report" when available\n\nYou\'ll receive a notification when it\'s ready.'
    },
    doctor: {
        patterns: ['doctor', 'dr', 'specialist', 'expert', 'arvind'],
        response: '👨‍⚕️ Our Senior Doctor:\nDr. Arvind Kumar Singh\nProfessor, RSDKS Government Medical College, Ambikapur\n\n15+ years of experience in pathology and laboratory medicine.'
    },
    contact: {
        patterns: ['contact', 'phone', 'call', 'number', 'email'],
        response: '📞 Contact us:\nPhone: +91 98765 43210\nEmail: info@lalpathclinic.com\n\nYou can also use the WhatsApp button on this page for quick chat!'
    },
    thanks: {
        patterns: ['thank', 'thanks', 'bye', 'goodbye', 'helpful'],
        response: 'You\'re welcome! 😊 Thank you for choosing LAL PATH CLINIC. Stay healthy! If you need any more help, feel free to ask.'
    }
};

const DEFAULT_RESPONSE = "I'm sorry, I didn't understand that. You can ask me about:\n• Clinic timings\n• Location & directions\n• How to book a test\n• Available tests\n• Report download\n• Contact information";

function getResponse(message) {
    const lowerMessage = message.toLowerCase();

    for (const category of Object.values(RESPONSES)) {
        for (const pattern of category.patterns) {
            if (lowerMessage.includes(pattern)) {
                return category.response;
            }
        }
    }

    return DEFAULT_RESPONSE;
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Hello! 👋 I\'m your LAL PATH CLINIC assistant. How can I help you today?' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMessage = inputValue.trim();
        setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
        setInputValue('');

        // Simulate typing delay
        setTimeout(() => {
            const botResponse = getResponse(userMessage);
            setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
        }, 500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const quickQuestions = [
        'Clinic timings?',
        'How to book?',
        'Where are you located?'
    ];

    return (
        <div className="fixed bottom-24 right-6 z-50">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-fadeIn">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold">Clinic Assistant</h3>
                                    <p className="text-xs text-blue-100">Online • Quick replies</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="h-72 overflow-y-auto p-4 space-y-3 bg-gray-50">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-line ${msg.type === 'user'
                                            ? 'bg-primary-600 text-white rounded-br-md'
                                            : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Questions */}
                    <div className="px-4 py-2 bg-white border-t border-gray-100">
                        <div className="flex flex-wrap gap-2">
                            {quickQuestions.map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setInputValue(q);
                                        setTimeout(() => {
                                            setMessages(prev => [...prev, { type: 'user', text: q }]);
                                            setTimeout(() => {
                                                setMessages(prev => [...prev, { type: 'bot', text: getResponse(q) }]);
                                            }, 500);
                                        }, 100);
                                    }}
                                    className="px-3 py-1 text-xs bg-primary-50 text-primary-700 rounded-full hover:bg-primary-100 transition-colors"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!inputValue.trim()}
                                className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${isOpen
                        ? 'bg-gray-600 hover:bg-gray-700'
                        : 'bg-primary-600 hover:bg-primary-700'
                    }`}
            >
                {isOpen ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                )}
            </button>
        </div>
    );
}
