import React, { useEffect, useState } from 'react';

// SeasonList component to render seasons and episodes
const SeasonList = ({ seasons }) => {
  return (
    <div>
      <h3>Seasons</h3>
      <p>Number of seasons: {seasons.length}</p>
      {/* Render each season */}
      {seasons.map(season => (
        <div key={season.id}>
          <p>Title: {season.title}</p>
          <p>Image: {season.image}</p>
          <p>Number: {season.id}</p>
          <p>Number of Episodes: {season.episodes.length}</p>
          
          {/* Render episodes */}
          {season.episodes.map(episode => (
            <div key={episode.id}>
              <p>Episode Title: {episode.title}</p>
              <p>Episode File: {episode.file}</p>
            </div>
          ))}
          
          {/* Render other properties of the season */}
        </div>
      ))}
    </div>
  );
};

// ShowList component to fetch and render shows with SeasonList component
const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/id/<ID>'); // Replace <ID> with actual ID
        if (!response.ok) {
          throw new Error('Failed to fetch show data');
        }
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error('Error fetching show data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div>
      <h2>Available Shows</h2>
      <ul>
        {shows.map(show => (
          <li key={show.id}>
            <h3>{show.title}</h3>
            <p>{show.description}</p>
            <p>Number of Seasons: {show.seasons.length}</p>
            {/* Render SeasonList for each show */}
            <SeasonList seasons={show.seasons} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowList;
