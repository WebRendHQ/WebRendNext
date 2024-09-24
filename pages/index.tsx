import type { NextPage } from 'next'
import { useAuth } from '../contexts/AuthContext'
import HeroSection from '../components/HeroSection';


const Home: NextPage = () => {
  const { user } = useAuth()

  return (
    <div>
      <HeroSection />
    </div>
  )
}

export default Home