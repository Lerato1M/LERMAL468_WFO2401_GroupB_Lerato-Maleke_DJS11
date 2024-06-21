import React, { useEffect, useState } from 'react';
import { fetchPreviews } from '../Services/api';

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPreviews();
      setShows(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Available Shows</h2>
      <ul>
        {shows.map(show => (
          <li key={show.id}>
            <h3>{show.title}</h3>
            <p>{show.description}</p>
            <p>Number of Seasons: {show.seasons.length}</p>
            {/* Additional details for each show */}
          </li>
        ))}
      </ul>
    </div>
  );
};



