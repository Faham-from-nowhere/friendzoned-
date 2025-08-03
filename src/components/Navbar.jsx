"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { auth } from '@/lib/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/'); // Redirect to homepage after logout
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <header className="bg-white shadow-md">
        <nav className="mx-auto flex max-w-5xl items-center justify-between p-4">
            <Link href="/" className="text-xl font-bold text-indigo-600">
                FriendForever
            </Link>
            <div>
                {user ? (
                    // This is the part to check
                    <div className="flex items-center space-x-4">
                        {/* The Dashboard link is correct */}
                        <Link href="/dashboard" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                            Dashboard
                        </Link>
                        {/* The Logout button should NOT be inside a <Link> tag */}
                        <button
                            onClick={handleLogout}
                            className="rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    // This part is for when the user is logged out
                    <Link href="/login" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    </header>
);
}