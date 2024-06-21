import React, { useEffect, useState } from 'react';

// EpisodeList component to render episodes
const EpisodeList = ({ episodes }) => {
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
        </div>
      ))}
    </div>
  );
};

// ShowList component to fetch and render shows
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
            {/* Render EpisodeList for each season */}
            {show.seasons.map(season => (
              <div key={season.id}>
                <h4>Season {season.number}</h4>
                {/* Pass episodes to EpisodeList */}
                <EpisodeList episodes={season.episodes} />
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowList;
