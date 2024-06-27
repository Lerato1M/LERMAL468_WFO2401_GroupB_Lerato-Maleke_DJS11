// src/components/PodcastItem.js

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importing hook for navigation
import { genres } from './genres'; // Importing genres data
import './PodcastItem.css'; // Importing CSS styles for the component

// Functional component for rendering each podcast item
const PodcastItem = ({ podcast }) => {
  const navigate = useNavigate(); // Initializing the navigation hook

  // Function to handle clicks on the podcast item
  const handleItemClick = () => {
    navigate(`/id/${podcast.id}`); // Navigate to the specific podcast details page
  };

  // JSX structure representing the podcast item
  return (
    <div className="podcast-item" onClick={handleItemClick}>
      <img src={podcast.image} alt={podcast.name} className="podcast-image" /> {/* Podcast image */}
      <h3 className="podcast-title">{podcast.title}</h3> {/* Podcast title */}
      <p className="podcast-genre">Seasons: {podcast.seasons}</p> {/* Number of seasons */}
      <p className="podcast-genre">Genre: {genres[podcast.genres[0]]}</p> {/* Genre based on genres data */}
      <p className="podcast-genre">Last Update: {podcast.updated}</p> {/* Last update date */}
    </div>
  );
};

export default PodcastItem; // Exporting the PodcastItem component
