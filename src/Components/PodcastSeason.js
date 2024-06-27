import React, { useEffect, useState } from 'react';

// SeasonList component to render seasons and episodes
const SeasonList = ({ seasons }) => {
  return (
    <div>
      <h3>Seasons</h3> {/* Heading for the seasons */}
      <p>Number of seasons: {seasons.length}</p> {/* Displaying the number of seasons */}
      {/* Render each season */}
      {seasons.map(season => (
        <div key={season.id}>
          <p>Title: {season.title}</p> {/* Displaying season title */}
          <p>Image: {season.image}</p> {/* Displaying season image */}
          <p>Number: {season.id}</p> {/* Displaying season number */}
          <p>Number of Episodes: {season.episodes.length}</p> {/* Displaying number of episodes */}
          
          {/* Render episodes */}
          {season.episodes.map(episode => (
            <div key={episode.id}>
              <p>Episode Title: {episode.title}</p> {/* Displaying episode title */}
              <p>Episode File: {episode.file}</p> {/* Displaying episode file */}
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
            {/* Render SeasonList for each show */}
            <SeasonList seasons={show.seasons} /> {/* Pass seasons data to SeasonList component */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowList;
