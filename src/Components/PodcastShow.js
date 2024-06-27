import React, { useEffect, useState } from 'react';
import { fetchPreviews } from '../Services/api'; // Import fetchPreviews function from API service

const ShowList = () => {
  const [shows, setShows] = useState([]); // State hook to store fetched shows

  useEffect(() => {
    // Function to fetch data when component mounts
    const fetchData = async () => {
      try {
        const data = await fetchPreviews(); // Fetch show previews using API function
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
            {/* Additional details for each show */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowList;



