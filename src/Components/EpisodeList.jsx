import React, { useState } from 'react';

const EpisodeList = ({ episodes }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (episodeId) => {
    if (favorites.includes(episodeId)) {
      // Remove from favorites
      setFavorites(favorites.filter(id => id !== episodeId));
    } else {
      // Add to favorites
      setFavorites([...favorites, episodeId]);
    }
  };

  const removeFromFavorites = (episodeId) => {
    setFavorites(favorites.filter(id => id !== episodeId));
  };

  const getFavoriteDate = (episodeId) => {
    // Simulated date, replace with actual logic to fetch favorite date from storage
    return new Date().toLocaleString();
  };

  return (
    <div>
      <h3>Episodes</h3>
      <p>Number of episodes: {episodes.length}</p>
      {/* Render each episode */}
      {episodes.map(episode => (
        <div key={episode.id}>
          <p>Title: {episode.title}</p>
          <p>File: {episode.file}</p>
          {/* Render other properties of the episode */}
          <button onClick={() => toggleFavorite(episode.id)}>
            {favorites.includes(episode.id) ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
          {favorites.includes(episode.id) && (
            <p>Added as Favorite: {getFavoriteDate(episode.id)}</p>
          )}
          {favorites.includes(episode.id) && (
            <button onClick={() => removeFromFavorites(episode.id)}>Remove from Favorites</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default EpisodeList;
