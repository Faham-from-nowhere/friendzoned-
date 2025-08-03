"use client";

import { useRef, useState } from 'react';
import { gsap } from 'gsap';

// The compliments on the wheel
const roastLevels = {
  Mild: [
    "Is the group's unpaid therapist",
    "Forgets to reply for 3 days",
    "Always late to the party",
    "Thinks pineapple belongs on pizza",
    "Takes 10 minutes to order food",
    "Can't keep a plant alive",
    "Says 'like' every other word",
    "Still uses their university email",
  ],
  Medium: [
    "Will ghost you for a relationship",
    "Secretly judges your outfits",
    "Laughs at their own jokes",
    "Sends memes at 2am",
    "Their 'check engine' light is a personality trait",
    "Uses your Netflix more than you do",
    "Starts stories with 'long story short...'",
    "Thinks their pet is their entire personality",
  ],
  Nuclear: [
    "Peak cringe from 2012",
    "Would sell you for a corn chip",
    "Roasts you in front of your crush",
    "Has a playlist called 'Sad Bops'",
    "Still thinks Rick and Morty is deep",
    "Their search history needs a priest",
    "Asks 'who's that?' about your favorite band",
    "Probably a flat-earther",
  ],
};
export type RoastLevel = keyof typeof roastLevels;

interface SpinTheWheelProps {
  roastLevel?: RoastLevel;
}

export default function SpinTheWheel({ roastLevel = "Mild" }: SpinTheWheelProps) {
  const segments = roastLevels[roastLevel] || roastLevels.Mild;
  const wheelRef = useRef<HTMLDivElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState("");

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult("");

    // Calculate a random spin
    const randomSegment = Math.floor(Math.random() * segments.length);
    const segmentAngle = 360 / segments.length;
    const targetRotation = (360 * 5) + (randomSegment * -segmentAngle); // 5 full spins + stop on the segment

    gsap.to(wheelRef.current, {
      rotation: targetRotation,
      duration: 4, // 4 seconds spin
      ease: 'power3.out',
      onComplete: () => {
        setIsSpinning(false);
        setResult(segments[randomSegment]);
      },
    });
  };

  return (
    <div className="mt-8 w-full max-w-md text-center">
      <div className="relative mx-auto h-80 w-80">
          {/* Pointer */}
          <div className="absolute -top-4 left-1/2 z-10 h-10 w-10 -translate-x-1/2" style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}>
              <div className="h-full w-full bg-red-500"></div>
          </div>

          {/* The Wheel */}
          <div ref={wheelRef} className="relative h-full w-full rounded-full border-8 border-gray-700 bg-gray-200">
              {segments.map((text, i) => {
                  const angle = (360 / segments.length) * i;
                  return (
                      <div
                          key={i}
                          className="absolute left-1/2 top-0 flex h-1/2 w-1/2 -translate-x-1/2 items-start justify-center pt-4"
                          style={{ transformOrigin: 'bottom center', transform: `rotate(${angle}deg)` }}
                      >
                          <span className="font-semibold text-gray-800">{text}</span>
                      </div>
                  );
              })}
          </div>
      </div>

      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className="mt-6 rounded-lg bg-indigo-600 px-8 py-3 text-lg font-bold text-white shadow-lg transition hover:bg-indigo-700 disabled:bg-indigo-400"
      >
        {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
      </button>

      {result && (
          <p className="mt-4 text-2xl font-bold text-pink-600 animate-bounce">
              You are... {result}!
          </p>
      )}
    </div>
  );
}