"use client";

import { useState } from 'react';

const compliments = [
  { start: "You're the kind of person who lights up a room...", end: "...by leaving it." },
  { start: "Your smile is so contagious...", end: "...so please stay home if you're sick." },
  { start: "You have a real talent for...", end: "...making things awkward." },
  { start: "I'm always so impressed by your confidence...", end: "...even when you're completely wrong." },
  { start: "You're not afraid to be yourself...", end: "...which is a very brave choice." },
  { start: "I've never met anyone quite like you...", end: "...and I hope I never do again." },
  { start: "You always march to the beat of your own drum...", end: "...which is why you're always out of step." },
  { start: "You have such a unique way of looking at the world...", end: "...it's usually backwards and upside down." },
  { start: "You're an open book...", end: "...unfortunately, it's not a very interesting one." },
  { start: "Your sense of humor is one of a kind...", end: "...no one else gets the joke." },
  { start: "You have so much potential...", end: "...to be even more annoying." },
  { start: "You're like a brother/sister to me...", end: "...the annoying one I never wanted." },
  { start: "You're truly one in a million...", end: "...which statistically still isn't that rare." },
  { start: "You always speak your mind...", end: "...even when no one asked." },
  { start: "You have an incredible memory...", end: "...for things no one cares about." },
  { start: "You’re a trendsetter...", end: "...in poor decisions." },
  { start: "You're a master of timing...", end: "...always late, never boring." },
  { start: "Your laugh is unforgettable...", end: "...mainly because it haunts people." },
  { start: "You light up my life...", end: "...like a short circuit." },
  { start: "You're the human version of a warm hug...", end: "...from someone with clammy hands." },
  { start: "You’re so creative...", end: "...at avoiding responsibility." },
  { start: "Your opinions are always refreshing...", end: "...like lukewarm soda." },
  { start: "You bring people together...", end: "...mostly to complain about you." },
  { start: "You're a great listener...", end: "...as long as you're the one talking." },
  { start: "You're unforgettable...", end: "...like a Wi-Fi password you wish you could delete." },
  { start: "You always see the best in people...", end: "...even when they're obviously terrible." },
  { start: "You're like a breath of fresh air...", end: "...in a room full of farts." },
  { start: "You make bold choices...", end: "...none of which involve thinking things through." },
  { start: "You always bring energy to the room...", end: "...the chaotic, slightly cursed kind." },
  { start: "You're so mysterious...", end: "...no one knows what you're doing, including you." },
  { start: "You have an amazing sense of direction...", end: "...straight into disaster." },
  { start: "You're built different...", end: "...like a vending machine that eats your money and your soul." },
];

const getRandomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

export default function GlitchyCompliment() {
  const [compliment, setCompliment] = useState<{start: string, end: string} | null>(null);
  const [displayText, setDisplayText] = useState("Click the button for a compliment!");
  const [isGlitching, setIsGlitching] = useState(false);

  const handleGenerate = () => {
    const newCompliment = getRandomItem(compliments);
    setCompliment(newCompliment);
    setDisplayText(newCompliment.start);
    setIsGlitching(false);

    // Start the glitch after 2 seconds
    setTimeout(() => {
      setIsGlitching(true);
      // Reveal the roast after the glitch animation
      setTimeout(() => {
        setIsGlitching(false);
        setDisplayText(newCompliment.start + " " + newCompliment.end);
      }, 300); // Glitch for 0.3 seconds
    }, 2000); // Wait 2 seconds before glitching
  };

  return (
    <div className="mt-8 w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">A Special Compliment</h2>
      <div className="h-24 flex items-center justify-center rounded-lg bg-gray-100 p-4">
        <p className={`text-xl font-semibold transition-colors duration-200 ${isGlitching ? 'glitching' : 'text-gray-900'}`}>
          {displayText}
        </p>
      </div>
      <button
        onClick={handleGenerate}
        className="mt-6 rounded-lg bg-pink-500 px-8 py-3 text-lg font-bold text-white shadow-lg transition hover:bg-pink-600"
      >
        Generate
      </button>
    </div>
  );
}