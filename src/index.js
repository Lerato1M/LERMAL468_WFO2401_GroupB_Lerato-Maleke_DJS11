// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import global styles
import App from './App'; // Import the main App component
import reportWebVitals from './reportWebVitals'; // Import the function to measure web vitals

// Render the App component inside the root element of the HTML document
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Attach the App to the element with id 'root' in public/index.html
);

// Measure and report web vitals (e.g., performance metrics)
reportWebVitals(console.log); // Log performance results to the console
