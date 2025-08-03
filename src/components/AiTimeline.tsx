"use client";

import { useState } from 'react';
import ReactMarkdown from 'react-markdown'; // <-- Import the new library

type TimelineProps = {
  creatorName: string;
  friendName: string;
  roastLevel?: string;
};

export default function AiTimeline({ creatorName, friendName, roastLevel }: TimelineProps) {
  const [story, setStory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    setStory("");

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creatorName, friendName, roastLevel }),
    });

    const data = await response.json();

    if (data.story) {
      setStory(data.story);
    } else {
      setStory("Oops! The AI is sleeping. Please try again in a moment.");
    }

    setIsLoading(false);
  };

  return (
    <div className="mt-8 w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800">Our Story, by Fate</h2>

      {!story && !isLoading && (
        <button
          onClick={handleGenerate}
          className="mt-4 rounded-lg bg-green-500 px-6 py-2 font-bold text-white transition hover:bg-green-600"
        >
          ✨ Generate Our Friendship Timeline
        </button>
      )}

      {isLoading && <p className="mt-4 text-gray-600">Our story is being written...</p>}

      {story && (
        <div className="prose mt-4 text-left text-gray-800">
            {/* This component handles all markdown formatting automatically */}
            <ReactMarkdown>{story}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}