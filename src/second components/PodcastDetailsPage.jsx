import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './PodcastDetailsPage.css';

const PodcastDetailsPage = ({ addToFavorites }) => {
  const { id } = useParams(); // Retrieve id parameter from URL using useParams
  const [podcastDetails, setPodcastDetails] = useState(null); // State to hold podcast details
  const [error, setError] = useState(null); // State to handle errors
  const [selectedSeason, setSelectedSeason] = useState(null); // State for currently selected season
  const [selectedEpisode, setSelectedEpisode] = useState(null); // State for currently selected episode
  const [audioSrc, setAudioSrc] = useState(''); // State to manage audio source for playing episodes
  const [isPlaying, setIsPlaying] = useState(false); // State to track if audio is playing
  const [isEpisodePlaying, setIsEpisodePlaying] = useState(false); // Track if an episode is playing
  const audioRef = useRef(null); // Reference to the audio element

  // Effect to fetch podcast details when id changes
  useEffect(() => {
    const fetchPodcastDetails = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch podcast details');
        }
        const data = await response.json();
        setPodcastDetails(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (id) {
      fetchPodcastDetails();
    }
  }, [id]);

  // Handler for selecting a season
  const handleSeasonClick = (season) => {
    setSelectedSeason(season);
    setSelectedEpisode(null); // Reset selected episode when season changes
  };

  // Handler for selecting an episode to play
  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode);
    setAudioSrc(episode.file); // Set audio source to episode's file
    setIsPlaying(true); // Start playing audio
    setIsEpisodePlaying(true); // Mark episode as playing
  };

  // Effect to manage audio playback
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pause current audio
      audioRef.current.load(); // Reload audio element
      audioRef.current.play(); // Start playing audio
    }
  }, [audioSrc]);

  // Handler for when audio ends
  const handleAudioEnd = () => {
    setIsPlaying(false); // Mark audio as not playing
    setIsEpisodePlaying(false); // Mark episode as not playing
  };

  // Prevent closing the page while an episode is playing
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isEpisodePlaying) {
        event.preventDefault();
        event.returnValue = ''; // Standard for most browsers
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isEpisodePlaying]);

  // Render different states based on conditions
  if (!id) {
    return <div>No podcast selected</div>; // Render if no id is present
  }

  if (error) {
    return <div>Error fetching podcast details: {error}</div>; // Render if there's an error fetching details
  }

  if (!podcastDetails) {
    return <div className="loading">Loading...</div>; // Render loading state while fetching data
  }

  // Get current date and time
  const currentDateTime = new Date();
  const formattedDateTime = `${currentDateTime.toLocaleDateString()} ${currentDateTime.toLocaleTimeString()}`;

  // Render podcast details once loaded
  return (
    <div className="podcast-details">
      <h2>{podcastDetails.title}</h2> {/* Display podcast title */}
      {isPlaying && (
        <div className="player-container">
          <h3>Now Playing: {selectedEpisode?.title}</h3> {/* Display currently playing episode */}
          <audio controls ref={audioRef} onEnded={handleAudioEnd}>
            <source src={audioSrc} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      <p className="podcast-description">{podcastDetails.description}</p> {/* Display podcast description */}
      <div className="seasons-container">
        {podcastDetails.seasons.map(season => (
          <div key={season.id} className="season-card" onClick={() => handleSeasonClick(season)}>
            <img src={season.image} alt={`Season ${season.season}`} />
            <p className="season-number">Season {season.season}</p> {/* Display season number */}
            <p className="season-number">Episodes {season.episodes.length}</p> {/* Display number of episodes */}
          </div>
        ))}
      </div>
      {selectedSeason && (
        <div className="episodes-container">
          <h3>Episodes of Season {selectedSeason.season}</h3> {/* Display selected season's episodes */}
          {selectedSeason.episodes.map(episode => (
            <div key={episode.id} className="episode-card">
              <p onClick={() => handleEpisodeClick(episode)}>{episode.title}</p> {/* Display episode title and handle click */}
              <button onClick={() => addToFavorites(episode, podcastDetails.title, selectedSeason.season, formattedDateTime)}>Add to Favorites</button> {/* Button to add episode to favorites */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PodcastDetailsPage;
