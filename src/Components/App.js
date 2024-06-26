import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchPreviews, fetchGenre, fetchShow } from 'src\Services\api.js'; // Import API functions
import PodcastPreview from './PodcastPreview'; // Import PodcastPreview component
import ShowList from './Components/ShowList'; // Import ShowList component
import SeasonList from './Components/SeasonList'; // Import SeasonList component

function App() {
  const [previews, setPreviews] = useState([]); // State for podcast previews
  const [selectedShow, setSelectedShow] = useState(null); // State to track selected show
  const [selectedSeason, setSelectedSeason] = useState(null); // State to track selected season

  useEffect(() => {
    // Fetch previews when component mounts
    fetchPreviews()
      .then(data => {
        setPreviews(data);
      })
      .catch(error => {
        console.error('Error fetching previews:', error); // Log error if fetching previews fails
      });
  }, []);

  // Function to handle click on a show
  const handleShowClick = async (showId) => {
    try {
      const showData = await fetchShow(showId); // Fetch details for the selected show
      setSelectedShow(showData);
      setSelectedSeason(null); // Reset selected season when switching shows
    } catch (error) {
      console.error('Error fetching show details:', error); // Log error if fetching show details fails
    }
  };

  // Function to handle click on a season
  const handleSeasonClick = (seasonId) => {
    setSelectedSeason(seasonId); // Set selected season
  };

  return (
    <div className="App">
      <h1>Podcasts</h1>
      
      {/* Render PodcastPreview for each preview */}
      <div className="previews-container">
        {previews.map(preview => (
          <PodcastPreview key={preview.id} preview={preview} />
        ))}
      </div>

      {/* Render ShowList component */}
      <ShowList onShowClick={handleShowClick} />

      {/* Conditionally render details for selected show */}
      {selectedShow && (
        <div>
          <h2>{selectedShow.title}</h2>
          <p>{selectedShow.description}</p>
          <p>Last Updated: {selectedShow.updated}</p>
          <p>Genres: {selectedShow.genreIds.map(id => genreTitles[id]).join(', ')}</p>
          <img src={selectedShow.image} alt={selectedShow.title} />
          <p>Number of Seasons: {selectedShow.seasons.length}</p>

          {/* Render SeasonList component */}
          <SeasonList seasons={selectedShow.seasons} onSeasonClick={handleSeasonClick} />

          {/* Button to go back to ShowList */}
          <button onClick={() => setSelectedShow(null)}>Back to Shows</button>
        </div>
      )}

      {/* Conditionally render episodes for selected season */}
      {selectedSeason && (
        <div>
          <h3>Episodes for Season {selectedSeason}</h3>
          {/* Implement logic to filter episodes based on selectedSeason */}
          {selectedShow.seasons.find(season => season.id === selectedSeason)?.episodes.map(episode => (
            <div key={episode.id}>
              <p>Episode Title: {episode.title}</p>
              <p>Episode File: {episode.file}</p>
              {/* Add audio player or listen button */}
              <button onClick={() => console.log(`Playing ${episode.title}`)}>Listen</button>
            </div>
          ))}
          {/* Button to go back to Seasons */}
          <button onClick={() => setSelectedSeason(null)}>Back to Seasons</button>
        </div>
      )}
    </div>
  );
}

export default App;
