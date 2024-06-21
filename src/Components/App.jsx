import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchPreviews } from './services/api';
import PodcastPreview from './Components/PodcastPreview';

function App() {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    // Fetch previews when component mounts
    fetchPreviews()
      .then(data => {
        setPreviews(data);
      })
      .catch(error => {
        console.error('Error fetching previews:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Podcasts</h1>
      <div className="previews-container">
        {previews.map(preview => (
          <PodcastPreview key={preview.id} preview={preview} />
        ))}
      </div>
    </div>
  );
}

export default App;
