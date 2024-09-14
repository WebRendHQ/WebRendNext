import React, { useState } from 'react';
import { Octokit } from '@/octokit/rest';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Define types for our state
type State = {
  domain: string;
  deployedUrl: string;
  error: string;
  loading: boolean;
};

// Define the props for our component (none in this case, but good practice)
type GitHubRepoCreatorProps = {};

const GitHubRepoCreator: React.FC<GitHubRepoCreatorProps> = () => {
  const [state, setState] = useState<State>({
    domain: '',
    deployedUrl: '',
    error: '',
    loading: false,
  });

  const handleCreateRepo = async () => {
    setState(prev => ({ ...prev, loading: true, error: '', deployedUrl: '' }));

    try {
      // Note: In a real application, you should never expose your GitHub token on the client side.
      // This should be handled by a backend service for security reasons.
      const octokit = new Octokit({ auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN });

      // Create repository
      const { data: repo } = await octokit.repos.createForAuthenticatedUser({
        name: state.domain,
        auto_init: true,
      });

      // Create index.html file
      const content = Buffer.from(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${state.domain}</title>
</head>
<body>
    <h1>Welcome to ${state.domain}</h1>
    <p>This is a basic HTML template for your new website.</p>
</body>
</html>
      `).toString('base64');

      await octokit.repos.createOrUpdateFileContents({
        owner: repo.owner.login,
        repo: repo.name,
        path: 'index.html',
        message: 'Initial commit',
        content: content,
      });

      // Enable GitHub Pages
      await octokit.repos.createPagesSite({
        owner: repo.owner.login,
        repo: repo.name,
        source: {
          branch: 'main',
          path: '/',
        },
      });

      // The actual URL might take a few minutes to be available
      setState(prev => ({
        ...prev,
        deployedUrl: `https://${repo.owner.login}.github.io/${repo.name}`,
        loading: false,
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: `An error occurred: ${err instanceof Error ? err.message : String(err)}`,
        loading: false,
      }));
    }
  };

  return (
    <div className="space-y-4">
      <Input
        type="text"
        value={state.domain}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
          setState(prev => ({ ...prev, domain: e.target.value }))}
        placeholder="Enter domain name"
        disabled={state.loading}
      />
      <Button onClick={handleCreateRepo} disabled={state.loading || !state.domain}>
        {state.loading ? 'Creating...' : 'Create and Deploy'}
      </Button>
      {state.error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
      {state.deployedUrl && (
        <div className="space-y-2">
          <p>Your site has been deployed to:</p>
          <a href={state.deployedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            {state.deployedUrl}
          </a>
          <iframe src={state.deployedUrl} className="w-full h-64 border border-gray-300 rounded" />
        </div>
      )}
    </div>
  );
};

export default GitHubRepoCreator;