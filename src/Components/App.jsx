import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchPreviews } from './services/api'; // Importing the API function to fetch data
import PodcastPreview from './Components/PodcastPreview'; // Importing the child component for rendering previews

function App() {
  const [previews, setPreviews] = useState([]); // State hook to hold podcast previews retrieved from API

  useEffect(() => {
    // Effect hook to fetch data when component mounts
    fetchPreviews()
      .then(data => {
        setPreviews(data); // Updating state with fetched data
      })
      .catch(error => {
        console.error('Error fetching previews:', error); // Handling fetch errors
      });
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="App">
      <h1>Podcasts</h1> {/* Main heading for the page */}
      <div className="previews-container">
        {previews.map(preview => (
          <PodcastPreview key={preview.id} preview={preview} /> // Rendering each preview using child component
        ))}
      </div>
    </div>
  );
}

export default App;
