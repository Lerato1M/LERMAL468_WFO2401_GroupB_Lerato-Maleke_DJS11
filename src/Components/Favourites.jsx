import React, { useState } from 'react';

const Favorites = ({ favorites }) => {
  const [sortedFavorites, setSortedFavorites] = useState([...favorites]);

  const sortAZ = () => {
    const sorted = [...favorites].sort((a, b) => a.title.localeCompare(b.title));
    setSortedFavorites(sorted);
  };

  const sortZA = () => {
    const sorted = [...favorites].sort((a, b) => b.title.localeCompare(a.title));
    setSortedFavorites(sorted);
  };

  return (
    <div>
      <h3>Favorite Episodes</h3>
      <button onClick={sortAZ}>Sort A-Z</button>
      <button onClick={sortZA}>Sort Z-A</button>
      {/* Render sorted favorites */}
      {sortedFavorites.map(episode => (
        <div key={episode.id}>
          <p>Title: {episode.title}</p>
          <p>File: {episode.file}</p>
          {/* Render other properties of the episode */}
        </div>
      ))}
    </div>
  );
};

export default Favorites;