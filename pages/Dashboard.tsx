import { useState, useEffect } from 'react';
import { Octokit } from 'octokit';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth'; // Import Firebase auth methods

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null); // Track the Firebase user
  const [repoName, setRepoName] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [commits, setCommits] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const auth = getAuth(); // Firebase auth instance

  // Listen for authentication changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser); // Set the user state when auth state changes
      if (currentUser) {
        const idToken = await currentUser.getIdToken();
        setToken(idToken); // Set the token for authenticated requests
      }
    });

    // Clean up subscription on component unmount
    return () => unsubscribe();
  }, [auth]);

  // Function to create a GitHub repository
  const createRepo = async () => {
    if (!user || !token) return;

    const octokit = new Octokit({ auth: token });

    try {
      const response = await octokit.request('POST /user/repos', {
        name: repoName,
        private: false,
      });
      setRepoUrl(response.data.html_url); // Set the repo URL after creation
      fetchCommits(repoName); // Fetch commits for the new repo
    } catch (error) {
      console.error('Error creating repository:', error);
    }
  };

  // Function to fetch commits for a given repository
  const fetchCommits = async (repo: string) => {
    if (!user || !token) return;

    const octokit = new Octokit({ auth: token });

    try {
      const response = await octokit.request('GET /repos/{owner}/{repo}/commits', {
        owner: user.displayName || user.email || 'unknown',
        repo: repo,
      });
      setCommits(response.data); // Set the commits data
    } catch (error) {
      console.error('Error fetching commits:', error);
    }
  };

  // Firebase sign-out function
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out the user
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // If user is not loaded yet, show a loading state
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ margin: 'auto', textAlign: 'center', maxWidth: '600px' }}> {/* Center the div */}
      <h2>Welcome, {user.displayName}</h2>
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
