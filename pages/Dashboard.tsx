import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Octokit } from 'octokit';
import { getAuth, signOut } from 'firebase/auth'; // Import Firebase auth and signOut

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

  // Firebase Sign-out function
  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div style={{ margin: 'auto', textAlign: 'center', maxWidth: '600px' }}> {/* Center the div */}
      <h2>Welcome, {user?.displayName}</h2>
      <input
        type="text"
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
        placeholder="Enter repository name"
        style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
      />
      <button onClick={createRepo} style={{ marginBottom: '1rem', padding: '0.5rem' }}>
        Create Repository
      </button>
      {repoUrl && (
        <p>
          Repository created: <a href={repoUrl} target="_blank" rel="noopener noreferrer">{repoUrl}</a>
        </p>
      )}
      <h3>Recent Commits:</h3>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {commits.map((commit: any) => (
          <li key={commit.sha}>
            {commit.commit.message} - {commit.commit.author.name}
          </li>
        ))}
      </ul>
      {/* Sign-out button */}
      <button onClick={handleSignOut} style={{ marginTop: '2rem', padding: '0.5rem' }}>
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;
