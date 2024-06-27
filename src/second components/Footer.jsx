// src/components/Footer.js
import React from 'react';
import './Footer.css'; // Importing the CSS file for styling

// Functional component for the Footer
const Footer = () => {
  return (
    <footer className="footer"> {/* Footer container with 'footer' class */}
      <p>&copy; 2024 leepod. All rights reserved.</p> {/* Copyright text */}
    </footer>
  );
}

export default Footer; // Exporting Footer component to be used in other parts of the application
