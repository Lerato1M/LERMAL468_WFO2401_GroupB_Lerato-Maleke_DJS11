import React, { useEffect, useState } from 'react';

// EpisodeList component to render episodes
const EpisodeList = ({ episodes }) => {
  return (
    <div>
      <h3>Episodes</h3> {/* Heading for the episodes */}
      <p>Number of episodes: {episodes.length}</p> {/* Displaying the number of episodes */}
      {/* Render each episode */}
      {episodes.map(episode => (
        <div key={episode.id}>
          <p>Title: {episode.title}</p> {/* Displaying episode title */}
          <p>File: {episode.file}</p> {/* Displaying episode file */}
          {/* Render other properties of the episode */}
        </div>
      ))}
    </div>
  );
};

// ShowList component to fetch and render shows
const ShowList = () => {
  const [shows, setShows] = useState([]); // State hook to store fetched shows

  useEffect(() => {
    // Function to fetch data when component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/id/<ID>'); // Replace <ID> with actual ID
        if (!response.ok) {
          throw new Error('Failed to fetch show data');
        }
        const data = await response.json();
        setShows(data); // Update state with fetched shows
      } catch (error) {
        console.error('Error fetching show data:', error); // Log error if fetching fails
      }
    };

    fetchData(); // Call fetchData function
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div>
      <h2>Available Shows</h2> {/* Heading for the available shows */}
      <ul>
        {/* Render each show */}
        {shows.map(show => (
          <li key={show.id}>
            <h3>{show.title}</h3> {/* Displaying show title */}
            <p>{show.description}</p> {/* Displaying show description */}
            <p>Number of Seasons: {show.seasons.length}</p> {/* Displaying number of seasons */}
            {/* Render EpisodeList for each season */}
            {show.seasons.map(season => (
              <div key={season.id}>
                <h4>Season {season.number}</h4> {/* Displaying season number */}
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
