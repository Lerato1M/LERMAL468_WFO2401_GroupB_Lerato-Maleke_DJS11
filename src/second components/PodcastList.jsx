// src/components/PodcastList.js

import React, { useEffect, useState } from 'react';
import PodcastItem from './PodcastItem';
import { genres } from './genres'; // Import genres from external file
import './PodcastList.css';

const PodcastList = () => {
  // State variables for managing podcasts, filtering, sorting, and UI state
  const [podcasts, setPodcasts] = useState([]); // Array of all podcasts
  const [filteredPodcasts, setFilteredPodcasts] = useState([]); // Array of filtered podcasts
  const [sortField, setSortField] = useState('title'); // Field to sort by (default: title)
  const [sortDirection, setSortDirection] = useState('asc'); // Sorting direction (asc/desc)
  const [selectedGenre, setSelectedGenre] = useState(''); // Selected genre for filtering
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state for fetching data

  // Effect to fetch podcasts and sort them based on sortField and sortDirection
  useEffect(() => {
    fetch('https://podcast-api.netlify.app') // Fetching podcast data from API
      .then(response => response.json())
      .then(data => {
        const sortedPodcasts = sortPodcasts(data, sortField, sortDirection); // Sort podcasts
        setPodcasts(sortedPodcasts); // Set all podcasts
        setFilteredPodcasts(sortedPodcasts); // Initially set filtered podcasts to all podcasts
        setIsLoading(false); // Set loading state to false after fetching
      })
      .catch(error => {
        console.error('Error fetching podcasts:', error); // Log error if fetch fails
        setError('Error fetching podcasts'); // Set error state if fetch fails
        setIsLoading(false); // Set loading state to false after fetch error
      });
  }, [sortField, sortDirection]); // Depend on sortField and sortDirection for fetching and sorting

  // Handler for genre selection change
  const handleGenreChange = (e) => {
    const selected = e.target.value; // Get selected genre from event
    setSelectedGenre(selected); // Set selected genre state
    if (selected) {
      // If a genre is selected, filter podcasts by genre
      setFilteredPodcasts(podcasts.filter(podcast => podcast.genres[0] === parseInt(selected)));
    } else {
      // If no genre selected, show all podcasts
      setFilteredPodcasts(podcasts);
    }
  };

  // Function to sort podcasts based on field and direction
  const sortPodcasts = (podcastsToSort, field, direction) => {
    return [...podcastsToSort].sort((a, b) => {
      let comparison = 0;
      if (field === 'title') {
        comparison = a.title.localeCompare(b.title); // Sort by title
      } else if (field === 'title_desc') {
        comparison = b.title.localeCompare(a.title); // Sort by title descending
      } else if (field === 'updated') {
        comparison = Date.parse(b.updated) - Date.parse(a.updated); // Sort by date updated
      } else if (field === 'updated_desc') {
        comparison = Date.parse(a.updated) - Date.parse(b.updated); // Sort by date updated descending
      }
      return direction === 'asc' ? comparison : -comparison; // Return comparison based on direction
    });
  };

  // Handler for sorting change
  const handleSortChange = (e) => {
    const selectedField = e.target.value; // Get selected sorting field from event
    const direction = selectedField === sortField ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc'; // Toggle direction if same field selected
    setSortField(selectedField); // Set sorting field
    setSortDirection(direction); // Set sorting direction
    const sortedPodcasts = sortPodcasts(filteredPodcasts, selectedField, direction); // Sort filtered podcasts
    setFilteredPodcasts(sortedPodcasts); // Update filtered podcasts based on new sorting
  };

  // Loading state
  if (isLoading) {
    return <div className="loading">Loading...</div>; // Display loading indicator
  }

  // Error state
  if (error) {
    return <div>{error}</div>; // Display error message if fetch fails
  }

  // Render the podcast list with filters and sorted podcasts
  return (
    <div className="podcast-list">
      <div className="filters">
        {/* Dropdown for sorting */}
        <select onChange={handleSortChange} value={sortField}>
          <option value="title">Sort by Name (A-Z)</option>
          <option value="title_desc">Sort by Name (Z-A)</option>
          <option value="updated">Sort by Recently Updated</option>
          <option value="updated_desc">Sort by Least Recently Updated</option>
        </select>
        {/* Dropdown for selecting genre */}
        <select onChange={handleGenreChange} value={selectedGenre}>
          <option value="">All Genres</option>
          {/* Mapping through genres object to display options */}
          {Object.entries(genres).map(([id, name]) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
      </div>
      {/* Render the podcast grid with filtered podcasts */}
      <div className="podcast-grid">
        {filteredPodcasts.map(podcast => (
          <PodcastItem key={podcast.id} podcast={podcast} /> // Render each podcast item component
        ))}
      </div>
    </div>
  );
};

export default PodcastList;
