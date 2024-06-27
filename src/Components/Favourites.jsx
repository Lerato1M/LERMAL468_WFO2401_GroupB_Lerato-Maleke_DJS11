import React, { useState } from 'react';

const Favorites = ({ favorites }) => {
  const [sortedFavorites, setSortedFavorites] = useState([...favorites]); // State hook for sorted favorite episodes

  // Function to sort favorites alphabetically A-Z
  const sortAZ = () => {
    const sorted = [...favorites].sort((a, b) => a.title.localeCompare(b.title));
    setSortedFavorites(sorted); // Update state with sorted favorites
  };

  // Function to sort favorites alphabetically Z-A
  const sortZA = () => {
    const sorted = [...favorites].sort((a, b) => b.title.localeCompare(a.title));
    setSortedFavorites(sorted); // Update state with sorted favorites
  };

  return (
    <div>
      <h3>Favorite Episodes</h3> {/* Heading for the favorite episodes section */}
      <button onClick={sortAZ}>Sort A-Z</button> {/* Button to trigger A-Z sorting */}
      <button onClick={sortZA}>Sort Z-A</button> {/* Button to trigger Z-A sorting */}
      {/* Render sorted favorites */}
      {sortedFavorites.map(episode => (
        <div key={episode.id}>
          <p>Title: {episode.title}</p> {/* Displaying episode title */}
          <p>File: {episode.file}</p> {/* Displaying episode file */}
          {/* Render other properties of the episode */}
        </div>
      ))}
    </div>
  );
};

export default Favorites;
