import type { NextPage } from 'next'
import React from 'react';
import { useAuth } from '../contexts/AuthContext'
import Login from '../components/FirebaseForm'
import GitHubRepoCreatorButton from '../components/ui-functions/CreateGithubRepoButton';
import Dashboard from './Dashboard'

const SignInSignUp: NextPage = () => {
  const { user } = useAuth()

  return (
    <div>
      <h1>GitHub Repository Creator</h1>
      {user ? <Dashboard /> : <Login />}
      <GitHubRepoCreatorButton />
    </div>
  )
}

export default SignInSignUp;
