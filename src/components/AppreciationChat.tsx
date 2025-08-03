"use client";

import { useState, useEffect, useCallback } from 'react';

// Pools of message parts for dynamic conversation generation
const messagePools = {
    Mild: {
        openers: [
            [{ sender: 'me', text: `Hey, quick question.` }, { sender: 'friend', text: `Shoot.` }],
            [{ sender: 'me', text: `Can I be honest about something?` }, { sender: 'friend', text: `Uh oh, should I be scared?` }],
        ],
        middles: [
            [{ sender: 'me', text: `I was just thinking... your taste in music is... unique.` }],
            [{ sender: 'me', text: `Someone has to tell you that you leave your socks everywhere.` }],
        ],
        closers: [
            [{ sender: 'me', text: `Anyway, just wanted you to know.` }],
            [{ sender: 'me', text: `That is all. Carry on.` }],
        ],
    },
    Medium: {
        openers: [
            [{ sender: 'me', text: `We need to talk.` }, { sender: 'friend', text: `That's never a good start.` }],
            [{ sender: 'me', text: `Are you sitting down?` }, { sender: 'friend', text: `...yes?` }],
        ],
        middles: [
            [{ sender: 'me', text: `Your "5-minute" stories are, on average, 25 minutes long.` }],
            [{ sender: 'me', text: `I'm pretty sure you're the reason my Netflix recommendations are so weird.` }],
        ],
        closers: [
            [{ sender: 'me', text: `Don't worry, I still tolerate you.` }],
            [{ sender: 'me', text: `Glad I got that off my chest.` }],
        ],
    },
    Nuclear: {
        openers: [
            [{ sender: 'me', text: `I've been doing some thinking about our friendship.` }, { sender: 'friend', text: `Okay...?` }],
            [{ sender: 'me', text: `I have a confession to make.` }, { sender: 'friend', text: `Spill it.` }],
        ],
        middles: [
            [{ sender: 'me', text: `I saw your middle school yearbook photo.` }, { sender: 'me', text: `I have questions. So many questions.` }],
            [{ sender: 'me', text: `Sometimes I use your birthday as my 'forgot password' security question.` }],
        ],
        closers: [
            [{ sender: 'me', text: `You're welcome for this valuable feedback.` }],
            [{ sender: 'me', text: `Consider this a friendship intervention.` }],
        ],
    },
};

type RoastLevel = keyof typeof messagePools;

// Helper function to get a random item from an array
const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

type ChatProps = {
  friendName: string;
  roastLevel?: RoastLevel;
};

export default function AppreciationChat({ friendName, roastLevel = "Mild" }: ChatProps) {
  type Message = { sender: string; text: string };
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(true);

  const generateConversation = useCallback(() => {
    const currentPool = messagePools[roastLevel] || messagePools.Mild;
    const conversation: Message[] = [
      ...getRandomItem(currentPool.openers),
      ...getRandomItem(currentPool.middles),
      ...getRandomItem(currentPool.closers),
    ];

    const timers: NodeJS.Timeout[] = [];
    setMessages([]); 
    setIsTyping(true);

    conversation.forEach((msg, index) => {
        const timer = setTimeout(() => {
            setIsTyping(index < conversation.length - 1);
            setMessages(prev => [...prev, msg]);
        }, (index + 1) * 1500); 
        timers.push(timer);
    });

    return () => {
        timers.forEach(clearTimeout);
    };
  }, [roastLevel]);

  useEffect(() => {
    generateConversation();
  }, [generateConversation]);

  return (
    <div className="mt-8 w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
      <div className="mb-4 rounded-t-lg bg-gray-200 p-3">
        <p className="text-center font-bold text-gray-800">{friendName}</p>
      </div>
      <div className="h-80 space-y-4 overflow-y-auto pr-2">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs rounded-lg px-4 py-2 ${msg.sender === 'me' ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-900'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
              <div className="bg-gray-300 text-gray-900 rounded-lg px-4 py-2">
                  <div className="flex items-center justify-center space-x-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500"></div>
                  </div>
              </div>
          </div>
        )}
      </div>
      <div className="mt-2 text-center">
          <button onClick={generateConversation} className="text-xs text-gray-500 hover:text-indigo-600">
              ↻ Regenerate
          </button>
      </div>
    </div>
  );
}
