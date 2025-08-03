"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import FriendshipQuiz from '@/components/FriendshipQuiz';
import GlitchyCompliment from '@/components/GlitchyCompliment';
import LegacyMode from '@/components/LegacyMode';
import FriendshipCertificate from '@/components/FriendshipCertificate';
import AppreciationChat from '@/components/AppreciationChat';
import SpinTheWheel, { type RoastLevel } from '@/components/SpinTheWheel'; // Updated import
import AiTimeline from '@/components/AiTimeline';

// Define a type for our data structure
type ForeverData = {
  creatorName: string;
  friendName: string;
  roastLevel?: RoastLevel; 
};

export default function ForeverPage() {
  const params = useParams();
  const slug = params.slug;

  const [data, setData] = useState<ForeverData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      const q = query(collection(db, "forevers"), where("slug", "==", slug));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data() as ForeverData;
        setData(docData);
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return <main className="flex min-h-screen items-center justify-center"><p>Loading...</p></main>;
  }

  if (!data) {
    return <main className="flex min-h-screen items-center justify-center"><p>Forever not found!</p></main>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-pink-100 p-8 pb-16">
        {/* Welcome Message */}
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
            <h1 className="text-2xl font-bold text-pink-500">Hey, {data.friendName}!</h1>
            <p className="mt-4 text-lg text-gray-700">
                Your friend, <span className="font-semibold">{data.creatorName}</span>, created this to celebrate your friendship!
            </p>
        </div>

        {/* Certificate */}
        <FriendshipCertificate 
            creatorName={data.creatorName} 
            friendName={data.friendName} 
        />

        {/* Appreciation Chat */}
        <AppreciationChat 
            friendName={data.friendName}
        />

        {/* Spin the Wheel */}
        <SpinTheWheel roastLevel={data.roastLevel} /> {/* <-- UPDATE THIS LINE */}
        
        {/* AI Timeline */}
        <AiTimeline 
          creatorName={data.creatorName} 
          friendName={data.friendName} 
        />

        <FriendshipQuiz />
        <GlitchyCompliment />
        <LegacyMode 
    creatorName={data.creatorName} 
    friendName={data.friendName}
  />
    </main>
  );
}
