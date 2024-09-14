import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth'

const Login: React.FC = () => {
  const handleLogin = async () => {
    const auth = getAuth()
    const provider = new GithubAuthProvider()
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error('Error during login:', error)
    }
  }

  return (
    <button onClick={handleLogin}>Login with Github</button>
  )
}

export default Login