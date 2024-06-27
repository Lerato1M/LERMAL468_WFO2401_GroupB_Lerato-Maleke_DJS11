import React, { useState } from 'react';

const EpisodeList = ({ episodes }) => {
  const [favorites, setFavorites] = useState([]); // State hook for storing favorite episode IDs

  // Function to toggle an episode's favorite status
  const toggleFavorite = (episodeId) => {
    if (favorites.includes(episodeId)) {
      // If already in favorites, remove it
      setFavorites(favorites.filter(id => id !== episodeId));
    } else {
      // If not in favorites, add it
      setFavorites([...favorites, episodeId]);
    }
  };

  // Function to remove an episode from favorites
  const removeFromFavorites = (episodeId) => {
    setFavorites(favorites.filter(id => id !== episodeId));
  };

  // Function to get the date when an episode was added to favorites
  const getFavoriteDate = (episodeId) => {
    // Simulated date, replace with actual logic to fetch favorite date from storage
    return new Date().toLocaleString();
  };

  return (
    <div>
      <h3>Episodes</h3> {/* Heading for the episode list */}
      <p>Number of episodes: {episodes.length}</p> {/* Displaying the number of episodes */}
      {/* Render each episode */}
      {episodes.map(episode => (
        <div key={episode.id}>
          <p>Title: {episode.title}</p> {/* Displaying episode title */}
          <p>File: {episode.file}</p> {/* Displaying episode file */}
          {/* Toggle favorite button */}
          <button onClick={() => toggleFavorite(episode.id)}>
            {favorites.includes(episode.id) ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
          {/* Display favorite date if the episode is in favorites */}
          {favorites.includes(episode.id) && (
            <p>Added as Favorite: {getFavoriteDate(episode.id)}</p>
          )}
          {/* Remove from favorites button */}
          {favorites.includes(episode.id) && (
            <button onClick={() => removeFromFavorites(episode.id)}>Remove from Favorites</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default EpisodeList;
