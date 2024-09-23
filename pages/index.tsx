import type { NextPage } from 'next'
import { useAuth } from '../contexts/AuthContext'
import Login from '../components/Login'
import GitHubRepoCreatorButton from '../components/ui/CreateGithubRepoButton';
import Dashboard from '../components/Dashboard'

const Home: NextPage = () => {
  const { user } = useAuth()

  return (
    <div>
      <h1>GitHub Repository Creator</h1>
      {user ? <Dashboard /> : <Login />}
      <GitHubRepoCreatorButton />
    </div>
  )
}

export default Home