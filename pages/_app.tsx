import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/NavBar';
import { AuthProvider } from '../contexts/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
    
  )
}

export default MyApp