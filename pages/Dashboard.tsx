import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Octokit } from 'octokit';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [repoName, setRepoName] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [commits, setCommits] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      if (user) {
        const idToken = await user.getIdToken();
        setToken(idToken);
      }
    };
    getToken();
  }, [user]);

  const createRepo = async () => {
    if (!user || !token) return;

    const octokit = new Octokit({ auth: token });

    try {
      const response = await octokit.request('POST /user/repos', {
        name: repoName,
        private: false,
      });
      setRepoUrl(response.data.html_url);
      fetchCommits(repoName);
    } catch (error) {
      console.error('Error creating repository:', error);
    }
  };

  const fetchCommits = async (repo: string) => {
    if (!user || !token) return;

    const octokit = new Octokit({ auth: token });

    try {
      const response = await octokit.request('GET /repos/{owner}/{repo}/commits', {
        owner: user.displayName || user.email || 'unknown',
        repo: repo,
      });
      setCommits(response.data);
    } catch (error) {
      console.error('Error fetching commits:', error);
    }
  };

  return (
    <div>
      <h2>Welcome, {user?.displayName}</h2>
      <input
        type="text"
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
        placeholder="Enter repository name"
      />
      <button onClick={createRepo}>Create Repository</button>
      {repoUrl && <p>Repository created: <a href={repoUrl}>{repoUrl}</a></p>}
      <h3>Recent Commits:</h3>
      <ul>
        {commits.map((commit: any) => (
          <li key={commit.sha}>
            {commit.commit.message} - {commit.commit.author.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;