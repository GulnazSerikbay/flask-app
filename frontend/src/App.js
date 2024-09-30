// src/App.js

import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/';

 

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed');
        }
        return response.json();
      })
      .then((data) => {
        setRepos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) return <div className="App"><p>Loading...</p></div>;
  if (error) return <div className="App"><p>Error: {error}</p></div>;

  return (
    <div className="App">
      <h1>Top 10 Popular GitHub Repositories</h1>
      <ul>
        {repos.map((repo) => (
          <li key={repo.full_name} className="repo-item">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              <h2>{repo.full_name}</h2>
            </a>
            <p>{repo.description}</p>
            <p>
              ⭐ {repo.stargazers_count} | 📝 {repo.language || 'N/A'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
