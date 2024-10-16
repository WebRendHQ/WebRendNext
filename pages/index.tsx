import type { NextPage } from 'next'
import { useAuth } from '../contexts/AuthContext'
import HeroSection from '../components/HeroSection';
import MacbookSection from '../components/MacbookSection';

const Home: NextPage = () => {
  const { user } = useAuth();

  return (
    <div>
      {/* Render HeroSection only if user is authenticated */}
      {user ? (
        <>
          <HeroSection />
          <MacbookSection />
        </>
      ) : (
        <div>
          <h1>Welcome, Guest!</h1>
          <p>Please log in to see more content.</p>
        </div>
      )}
    </div>
  )
}

export default Home;
