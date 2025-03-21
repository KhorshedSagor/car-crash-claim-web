"use client"; // Mark this component as a Client Component

import { useState } from 'react';

export default function Home() {
  const [claimText, setClaimText] = useState('');

  const handleSubmit = () => {
    alert(`Claim submitted: ${claimText}`);
    setClaimText(''); // Clear the textarea after submission
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

      {/* Claim Dialog Box */}
      <div className="mt-8 w-full max-w-2xl bg-[#f3e8f3] p-6 sm:p-8 rounded-lg shadow-lg border border-[#4a0649]">
        {/* Textarea */}
        <textarea
          className="w-full p-4 sm:p-5 border border-[#4a0649] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a0649] focus:border-[#4a0649] placeholder-gray-400"
          rows={6}
          placeholder="Tell us what happened..."
          value={claimText}
          onChange={(e) => setClaimText(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <div className="mt-6 w-full max-w-2xl flex justify-center">
        <button
          className="bg-[#4a0649] text-white py-3 px-6 rounded-lg hover:bg-[#5a0759] focus:outline-none focus:ring-2 focus:ring-[#4a0649] transition-all duration-300"
          onClick={handleSubmit}
        >
          Send Claim
        </button>
      </div>
    </div>
  );
}