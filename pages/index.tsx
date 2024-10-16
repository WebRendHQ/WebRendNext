import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'; // Import Firebase auth
import HeroSection from '../components/HeroSection';
import MacbookSection from '../components/MacbookSection';

const Home: NextPage = () => {
  const [user, setUser] = useState<User | null>(null); // Track the Firebase user
  const [loading, setLoading] = useState(true); // Loading state while checking authentication
  const auth = getAuth(); // Firebase auth instance

  // Listen for authentication changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loading when authentication is determined
    });

    // Clean up subscription on component unmount
    return () => unsubscribe();
  }, [auth]);

  // If still loading, display a loading message
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Render HeroSection and MacbookSection only if the user is authenticated */}
      {user ? (
        <>
          <HeroSection />
          <MacbookSection />
        </>
      ) : (
        <>
          <HeroSection />
          <MacbookSection />
        </>
        // <div>
        //   <h1>Welcome, Guest!</h1>
        //   <p>Please log in to see more content.</p>
        // </div>
      )}
    </div>
  );
};

export default Home;
