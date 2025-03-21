"use client"; // Mark this component as a Client Component

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image'; // Import the Image component

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
            { text: "Thank you for your messaging us! Do you have any details to share?", isUser: false },
          ]);
          setHasReplied(true); // Mark that the chatbot has replied
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-2">
      {/* Logo */}
      <div className="w-full max-w-2xl flex items-center justify-center">
        <div className="w-full h-[100px] sm:h-[150px] md:h-[200px] relative">
          <Image
            src="/logo.png" // Path to your logo file in the public folder
            alt="CrashClaim Logo"
            fill // Fill the container
            className="object-contain" // Ensure the logo scales properly
            priority // Prioritize loading the logo
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 60vw" // Responsive sizes
          />
        </div>
      </div>

      {/* Additional Content */}
      <h1 className="mt-1 text-3xl sm:text-4xl md:text-5xl font-bold text-[#4a0649] text-center">
        Welcome to CrashClaim
      </h1>
      <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 text-center max-w-2xl">
        Injured by a reckless driver? No calls, no hassle—CrashClaim will handle your settlement or lawsuit while you focus on recovery.
      </p>

      {/* Chat Interface */}
      <div className="mt-8 w-full max-w-2xl bg-[#f3e8f3] p-6 sm:p-8 rounded-lg shadow-lg border border-[#4a0649]">
        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="h-64 overflow-y-auto mb-4 scroll-smooth bg-white rounded-lg p-4" // Faded background
        >
          {messages.length === 0 ? (
            // Placeholder for empty chat
            <div className="h-full flex flex-col items-center justify-center">
              <Image
                src="/empty-chat.png" // Path to your placeholder image in the public folder
                alt="Empty Chat"
                width={100}
                height={100}
                className="opacity-50"
              />
              <p className="mt-2 text-gray-500 text-sm">No messages yet. Start the conversation!</p>
            </div>
          ) : (
            // Chat messages with avatars
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-2`}
              >
                {/* Avatar for Chatbot */}
                {!message.isUser && (
                  <div className="w-8 h-8 bg-white mr-2 flex items-center justify-center">
                    <Image
                      src="/chatbot-avatar.png" // Path to your chatbot avatar in the public folder
                      alt="Chatbot Avatar"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  </div>
                )}
                {/* Message Bubble */}
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
                {/* Avatar for User */}
                {message.isUser && (
                  <div className="w-8 h-8 bg-white ml-2 flex items-center justify-center">
                    <Image
                      src="/user-avatar.png" // Path to your user avatar in the public folder
                      alt="User Avatar"
                      width={32}
                      height={32}
                      
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Chat Input and Send Button */}
        <div className="flex items-center">
          <textarea
            className="w-full p-3 sm:p-4 border border-[#4a0649] bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a0649] focus:border-[#4a0649] placeholder-gray-400 resize-none"
            rows={2} // Adjust rows to match button height
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
            className="ml-4 h-full bg-[#4a0649] text-white py-3 px-6 rounded-lg hover:bg-[#5a0759] focus:outline-none focus:ring-2 focus:ring-[#4a0649] focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex flex-col items-center justify-center"
            onClick={handleSubmit}
          >
            <span className="text-sm font-semibold">Send</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mt-2 transform rotate-90" // Rotate 90 degrees
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}