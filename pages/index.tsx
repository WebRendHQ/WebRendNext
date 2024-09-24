import type { NextPage } from 'next'
import { useAuth } from '../contexts/AuthContext'
import HeroSection from '../components/HeroSection';
import MacbookSection from '../components/MacbookSection';


const Home: NextPage = () => {
  const { user } = useAuth()

  return (
    <div>
      <HeroSection />
      <MacbookSection />
    </div>
  )
}

export default Home