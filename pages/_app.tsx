import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/NavBar';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth'; // Firebase auth methods
import { auth } from '../contexts/firebaseConfig'; // Your Firebase config

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null); // Track the authenticated user
  const [loading, setLoading] = useState(true); // Loading state while checking authentication

  // Track authentication changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loading once auth is determined
    });

    // Clean up the subscription when component unmounts
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show loading while checking authentication
  }

  return (
    <div>
      <Navbar user={user} /> {/* Pass the authenticated user to Navbar */}
      <Component {...pageProps} user={user} /> {/* Pass the authenticated user as a prop */}
    </div>
  );
}

export default MyApp;
