import React, { createContext, useContext, useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'

const firebaseConfig = {
  // Your Firebase configuration here
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const AuthContext = createContext<{ user: User | null }>({ user: null })

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)