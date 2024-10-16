import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCJM45UvPM9DPxnUy7hCfoMN2Ft4wV9o40",
  authDomain: "webrend-f3469.firebaseapp.com",
  projectId: "webrend-f3469",
  storageBucket: "webrend-f3469.appspot.com",
  messagingSenderId: "628574920834",
  appId: "1:628574920834:web:c3bd854a61a9b5caa7949b",
  measurementId: "G-QHNJHR0KCP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

interface AuthContextType {
  user: User | null;
  auth: any; // Export auth here so it can be used in other components
  firestore: any; // You can type this more specifically if you want
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, auth, firestore }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
