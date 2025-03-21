"use client"; // Mark this component as a Client Component

import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [claimText, setClaimText] = useState('');
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; timestamp?: string }[]>(
    []
  ); // Store chat messages
  const [hasReplied, setHasReplied] = useState(false); // Track if the chatbot has replied
  const chatContainerRef = useRef<HTMLDivElement>(null); // Reference to the chat container

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = () => {
    if (claimText.trim()) {
      // Add the user's message to the chat
      const newMessage = { text: claimText, isUser: true, timestamp: 'Just now' };
      setMessages((prev) => [...prev, newMessage]);
      setClaimText(''); // Clear the textarea

      // Remove the timestamp from older messages
      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1 ? msg : { ...msg, timestamp: undefined }
        )
      );

      // Send an automated reply only for the first message
      if (!hasReplied) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { text: "Thank you for your message! We'll get back to you shortly.", isUser: false },
          ]);
          setHasReplied(true); // Mark that the chatbot has replied
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="w-full max-w-2xl flex items-stretch border-4 border-[#4a0649] rounded-lg overflow-hidden shadow-lg">
        <span className="bg-[#4a0649] text-white flex-1 text-3xl sm:text-4xl md:text-5xl font-bold text-center py-4">
          CRASH
        </span>
        <span className="bg-white text-[#4a0649] flex-1 text-3xl sm:text-4xl md:text-5xl font-bold text-center py-4">
          CLAIM
        </span>
      </div>

      {/* Additional Content */}
      <h1 className="mt-8 text-3xl sm:text-4xl md:text-5xl font-bold text-[#4a0649] text-center">
        Welcome to CrashClaim
      </h1>
      <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 text-center max-w-2xl">
        Your one-stop solution for claims management.
      </p>

      {/* Chat Interface */}
      <div className="mt-8 w-full max-w-2xl bg-[#f3e8f3] p-6 sm:p-8 rounded-lg shadow-lg border border-[#4a0649]">
        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="h-64 overflow-y-auto mb-4 scroll-smooth bg-white rounded-lg p-4" // Faded background
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-2`}
            >
              <div
                className={`${
                  message.isUser ? 'bg-[#4a0649] text-white' : 'bg-[#f3e8f3] text-gray-800'
                } p-3 rounded-lg max-w-xs`}
              >
                {message.text}
                {message.timestamp && (
                  <div className="text-xs text-gray-300 mt-1">{message.timestamp}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="flex items-center">
          <textarea
            className="w-full p-3 sm:p-4 border border-[#4a0649] bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a0649] focus:border-[#4a0649] placeholder-gray-400 resize-none"
            rows={2}
            placeholder="Tell us what happened..."
            value={claimText}
            onChange={(e) => setClaimText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); // Prevent new line on Enter
                handleSubmit(); // Submit the message
              }
            }}
          />
          <button
            className="ml-4 bg-[#4a0649] text-white p-3 rounded-lg hover:bg-[#5a0759] focus:outline-none focus:ring-2 focus:ring-[#4a0649] transition-all duration-300"
            onClick={handleSubmit}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}