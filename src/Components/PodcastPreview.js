import React, { useState, useEffect } from 'react';
import GENRE, { genreTitles } from 'src\Components\Genre.js'; // Import GENRE class and genreTitles mapping

const PodcastPreview = ({ preview }) => {
  // Destructuring props for easier access
  const { stringTitle, stringDescription, image, seasons, updated, numberId, genreIds, arrayShowIds } = preview;

  const [genres, setGenres] = useState([]); // State hook to store fetched genres

  useEffect(() => {
    // Function to fetch genres when genreIds change
    const fetchGenres = async () => {
      try {
        // Map genreIds to fetch promises for each genre
        const genrePromises = genreIds.map(async (id) => {
          const response = await fetch(`https://podcast-api.netlify.app/genre/${id}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch genre ${id}`);
          }
          const genreData = await response.json();
          // Create GENRE object from fetched data
          return new GENRE(genreData.id, genreData.title, genreData.description, genreData.showIds);
        });

        // Await all genre promises and update state with fetched genres
        const fetchedGenres = await Promise.all(genrePromises);
        setGenres(fetchedGenres);
      } catch (error) {
        console.error('Error fetching genres:', error); // Log error if fetching fails
      }
    };

    fetchGenres(); // Call fetchGenres function
  }, [genreIds]); // Run effect whenever genreIds change

  return (
    <div className="podcast-preview">
      <h2>{stringTitle}</h2> {/* Displaying podcast title */}
      <p>{stringDescription}</p> {/* Displaying podcast description */}
      <img src={image} alt={stringTitle} /> {/* Displaying podcast image */}
      <p>Seasons: {seasons}</p> {/* Displaying number of seasons */}
      <p>Updated: {updated}</p> {/* Displaying last updated date */}
      <p>ID: {numberId}</p> {/* Displaying podcast ID */}
      <p>Genres: {genres.map(genre => genre.title).join(', ')}</p> {/* Displaying genres */}
      <p>Show IDs: {arrayShowIds.join(', ')}</p> {/* Displaying show IDs */}
    </div>
  );
};

export default PodcastPreview;
