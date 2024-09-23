import React, { useState } from 'react';
import { Octokit } from '@octokit/rest';

const GitHubRepoCreatorButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [repoUrl, setRepoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createRepo = async () => {
    setIsLoading(true);
    setError(null);
    setRepoUrl(null);

    try {
      // Replace 'YOUR_GITHUB_TOKEN' with your actual GitHub personal access token
      const octokit = new Octokit({ auth: 'YOUR_GITHUB_TOKEN' });

      const response = await octokit.repos.createForAuthenticatedUser({
        name: `new-repo-${Date.now()}`,
        description: 'A new repository created via API',
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

  return (
    <div>
      <button 
        onClick={createRepo} 
        disabled={isLoading}
        style={{
          padding: '10px 20px',
          backgroundColor: isLoading ? '#cccccc' : '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
      >
        {isLoading ? 'Creating...' : 'Create GitHub Repo'}
      </button>
      {repoUrl && (
        <p>Repository created! Visit: <a href={repoUrl} target="_blank" rel="noopener noreferrer">{repoUrl}</a></p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default GitHubRepoCreatorButton;