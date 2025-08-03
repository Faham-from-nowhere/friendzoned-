"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '@/lib/firebaseConfig';
import { customAlphabet } from 'nanoid';

export default function HomePage() {
  const [creatorName, setCreatorName] = useState('');
  const [friendName, setFriendName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [roastLevel, setRoastLevel] = useState('Mild');
  
  // New state to hold the generated URL
  const [generatedUrl, setGeneratedUrl] = useState('');
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!creatorName || !friendName) {
      alert('Please fill out both names!');
      return;
    }

    const user = auth.currentUser;
    setIsLoading(true);
    const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 8);
    const slug = nanoid();

    try {
      await addDoc(collection(db, "forevers"), {
        slug: slug,
        creatorName: creatorName,
        friendName: friendName,
        createdAt: serverTimestamp(),
        creatorId: user ? user.uid : null,
        roastLevel: roastLevel,
      });

      // Construct the full URL and set it in state
      const fullUrl = `${process.env.NEXT_PUBLIC_APP_URL}/f/${slug}`;
      setGeneratedUrl(fullUrl);

    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Failed to create your link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopy = () => {
      navigator.clipboard.writeText(generatedUrl);
      alert("Link copied to clipboard!");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        
        {/* Conditionally render the success view or the form */}
        {generatedUrl ? (
          // View to show AFTER link is generated
          <div className="text-center">
            <h1 className="text-2xl font-bold text-green-600">Link Generated!</h1>
            <p className="mt-2 text-gray-600">Copy the link below and send it to your friend.</p>
            <div className="mt-4 flex">
              <input 
                type="text"
                value={generatedUrl}
                readOnly
                className="w-full rounded-l-md border-gray-300 bg-gray-100 text-gray-700"
              />
              <button onClick={handleCopy} className="rounded-r-md bg-indigo-600 px-4 text-white hover:bg-indigo-700">Copy</button>
            </div>
            <button 
              onClick={() => setGeneratedUrl('')} 
              className="mt-6 w-full rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-800"
            >
              Create Another Prank
            </button>
          </div>
        ) : (
          // The creation form
          <div>
            <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
              FriendShame Generator
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* All your form inputs (names, roast level) go here */}
                <div>
                  <label htmlFor="creatorName" className="block text-sm font-medium text-gray-700">Your Name</label>
                  <input id="creatorName" type="text" value={creatorName} onChange={(e) => setCreatorName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm" placeholder="Enter your name" />
                </div>
                <div>
                  <label htmlFor="friendName" className="block text-sm font-medium text-gray-700">Your Friend's Name</label>
                  <input id="friendName" type="text" value={friendName} onChange={(e) => setFriendName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm" placeholder="Enter your victim's... I mean friend's name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Roast Level</label>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <button type="button" onClick={() => setRoastLevel('Mild')} className={`px-3 py-2 text-sm rounded-md ${roastLevel === 'Mild' ? 'bg-yellow-400 font-bold ring-2 ring-black' : 'bg-gray-200'}`}>🔥 Mild</button>
                    <button type="button" onClick={() => setRoastLevel('Medium')} className={`px-3 py-2 text-sm rounded-md ${roastLevel === 'Medium' ? 'bg-orange-500 font-bold text-white ring-2 ring-black' : 'bg-gray-200'}`}>🔥🔥 Medium</button>
                    <button type="button" onClick={() => setRoastLevel('Nuclear')} className={`px-3 py-2 text-sm rounded-md ${roastLevel === 'Nuclear' ? 'bg-red-600 font-bold text-white ring-2 ring-black' : 'bg-gray-200'}`}>💀🔥 Nuclear</button>
                  </div>
                </div>
                <button type="submit" disabled={isLoading} className="w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:bg-indigo-400">
                  {isLoading ? 'Generating...' : 'Generate Prank Link'}
                </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}