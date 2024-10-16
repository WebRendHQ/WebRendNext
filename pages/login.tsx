import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth'; // Firebase Auth observer
import { auth } from '../contexts/firebaseConfig'; // Import Firebase config
import Login from '../components/FirebaseForm';
import Dashboard from './Dashboard';

const SignInSignUp: NextPage = () => {
  const [user, setUser] = useState<null | object>(null); // Set user state to track authentication status
  const [loading, setLoading] = useState(true);

  // Listen for authentication changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loading once the auth status is confirmed
    });

    // Clean up subscription on component unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show loading until the auth state is verified
  }

  return (
    <div>
      
      {user ? <Dashboard /> : <Login />} {/* Render Dashboard if user is logged in, otherwise render Login */}
    </div>
  );
};

export default SignInSignUp;
