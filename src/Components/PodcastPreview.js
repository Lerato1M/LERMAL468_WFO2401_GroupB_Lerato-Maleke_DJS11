import React, { useState, useEffect } from 'react';
import GENRE, { genreTitles } from 'src\Components\Genre.js'; // Import GENRE class and genreTitles mapping

const PodcastPreview = ({ preview }) => {
  const { stringTitle, stringDescription, image, seasons, updated, numberId, genreIds, arrayShowIds } = preview;
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genrePromises = genreIds.map(async (id) => {
          const response = await fetch(`https://podcast-api.netlify.app/genre/${id}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch genre ${id}`);
          }
          const genreData = await response.json();
          return new GENRE(genreData.id, genreData.title, genreData.description, genreData.showIds);
        });

        const fetchedGenres = await Promise.all(genrePromises);
        setGenres(fetchedGenres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, [genreIds]); // Run effect whenever genreIds change

  return (
    <div className="podcast-preview">
      <h2>{stringTitle}</h2>
      <p>{stringDescription}</p>
      <img src={image} alt={stringTitle} />
      <p>Seasons: {seasons}</p>
      <p>Updated: {updated}</p>
      <p>ID: {numberId}</p>
      <p>Genres: {genres.map(genre => genre.title).join(', ')}</p>
      <p>Show IDs: {arrayShowIds.join(', ')}</p>
    </div>
  );
};

export default PodcastPreview;
