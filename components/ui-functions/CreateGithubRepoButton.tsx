import React, { useState, useEffect } from 'react';
import { Octokit } from '@octokit/rest';
import { useAuth } from '../../contexts/AuthContext';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Replace with your EC2 instance's public IP or domain
const EC2_PUBLIC_IP = 'https://ec2-3-140-238-96.us-east-2.compute.amazonaws.com:3000';

const GitHubRepoCreatorButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [repoUrl, setRepoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [domain, setDomain] = useState('');
  const [latestDomain, setLatestDomain] = useState('');

  const { user, firestore } = useAuth();

  useEffect(() => {
    if (user) {
      fetchLatestDomain();
    }
  }, [user]);

  const fetchLatestDomain = async () => {
    if (!user || !firestore) return;
    try {
      const docRef = doc(firestore, 'users', user.uid, 'settings', 'domain');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLatestDomain(docSnap.data().domain);
      }
    } catch (err) {
      console.error('Error fetching latest domain:', err);
    }
  };

  const saveDomain = async () => {
    if (!user || !firestore) return;
    try {
      await setDoc(doc(firestore, 'users', user.uid, 'settings', 'domain'), { domain });
      setLatestDomain(domain);
    } catch (err) {
      console.error('Error saving domain:', err);
      setError('Failed to save domain. Please try again.');
    }
  };

  const createRepo = async () => {
    if (!user) {
      setError('You must be logged in to create a repository.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setRepoUrl(null);

    try {
      // Fetch the GitHub token from the EC2 instance
      const tokenResponse = await fetch(`${EC2_PUBLIC_IP}/github-token`);
      if (!tokenResponse.ok) {
        throw new Error('Failed to fetch GitHub token');
      }
      const { token } = await tokenResponse.json();

      const octokit = new Octokit({ auth: token });

      const repoName = latestDomain.replace(/^https?:\/\//, '').replace(/\/$/, '');

      const response = await octokit.repos.createForAuthenticatedUser({
        name: repoName,
        description: `Repository for ${latestDomain}`,
        private: false,
      });

      setRepoUrl(response.data.html_url);
    } catch (err) {
      setError('Failed to create repository. Please check your token and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <p>Please log in to create a GitHub repository.</p>;
  }

  return (
    <div>
      <input
        type="text"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        placeholder="Enter domain (e.g., www.randomdomain.com)"
        style={{
          padding: '10px',
          marginRight: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      <button
        onClick={saveDomain}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '10px',
        }}
      >
        Save Domain
      </button>
      <button 
        onClick={createRepo} 
        disabled={isLoading || !latestDomain}
        style={{
          padding: '10px 20px',
          backgroundColor: isLoading || !latestDomain ? '#cccccc' : '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isLoading || !latestDomain ? 'not-allowed' : 'pointer'
        }}
      >
        {isLoading ? 'Creating...' : 'Create GitHub Repo'}
      </button>
      {latestDomain && (
        <p>Latest domain: {latestDomain}</p>
      )}
      {repoUrl && (
        <p>Repository created! Visit: <a href={repoUrl} target="_blank" rel="noopener noreferrer">{repoUrl}</a></p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default GitHubRepoCreatorButton;