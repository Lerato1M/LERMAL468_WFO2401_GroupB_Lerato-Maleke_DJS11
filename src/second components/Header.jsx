import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for navigation
import './Header.css'; // Importing CSS file for styling

const Header = ({ onFavoritesClick }) => {
  const navigate = useNavigate(); // Initializing useNavigate hook for navigation

  // Handler function for clicking on the logo
  const handleLogoClick = () => {
    navigate('/'); // Navigate to the home page ('/')
  };

  return (
    <header className="header"> {/* Header container with 'header' class */}
      <div className="logo" onClick={handleLogoClick}> {/* Logo container with clickable functionality */}
        <img className="logo" src={'/android-chrome-512x512.png'} alt="second components\images\logo.jpg" /> {/* Logo image */}
      </div>
      <div className="search-bar"> {/* Search bar container */}
        <input type="text" placeholder="Search..." /> {/* Search input field */}
      </div>
      <nav className="nav-links"> {/* Navigation links container */}
        <button className="favorites-button" onClick={onFavoritesClick}>Favorites</button> {/* Favorites button */}
      </nav>
    </header>
  );
};

export default Header; // Exporting Header component to be used in other parts of the application
