"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db, auth } from '@/lib/firebaseConfig';
import { collection, query, where, getDocs, DocumentData } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function DashboardPage() {
  // Use the useAuthState hook for a cleaner way to get the user
  const [user, loadingAuth] = useAuthState(auth);
  const [forevers, setForevers] = useState<DocumentData[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (loadingAuth) return; // Wait until auth state is loaded
    if (!user) {
      // If no user, stop loading and let the JSX handle the redirect message
      setLoadingData(false);
      return;
    };

    const fetchForevers = async () => {
      const q = query(collection(db, "forevers"), where("creatorId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const userForevers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setForevers(userForevers);
      setLoadingData(false);
    };

    fetchForevers();
  }, [user, loadingAuth]); // Rerun when user or auth loading state changes

  if (loadingAuth || loadingData) {
    return <main className="text-center p-10">Loading...</main>;
  }

  if (!user) {
    return (
      <main className="text-center p-10">
        <p>Please <Link href="/login" className="text-indigo-600 font-bold">login</Link> to view your dashboard.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Dashboard</h1>
      {forevers.length > 0 ? (
        <div className="space-y-4">
          {forevers.map(forever => (
            <div key={forever.id} className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
              <div>
                <p className="font-bold text-lg text-gray-800">For: {forever.friendName}</p>
                <p className="text-sm text-gray-500">From: {forever.creatorName}</p>
              </div>
              <Link href={`/f/${forever.slug}`} className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                View
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">You haven't created any Forevers yet. <Link href="/" className="text-indigo-600 font-bold">Create one now!</Link></p>
      )}
    </main>
  );
}