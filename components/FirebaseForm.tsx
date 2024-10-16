// firebaseForm.tsx (Login form)
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext'; // Use the AuthContext to get auth and user

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth(); // Access the user and auth from context

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleEmailPasswordAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const auth = useAuth().auth; // Get auth from context (AuthContext)
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred during authentication');
      console.error('Error during email/password auth:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="mx-auto p-6 border rounded-lg shadow-lg bg-white">
        <h2 className="mb-4 text-xl font-bold">{user ? `Welcome, ${user.displayName || user.email}` : 'Please Login or Sign Up'}</h2>
        <form onSubmit={handleEmailPasswordAuth} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full p-2 mt-4 bg-gray-300 rounded hover:bg-gray-400 transition"
        >
          {isSignUp ? 'Switch to Login' : 'Switch to Sign Up'}
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
