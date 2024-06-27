import axios from 'axios';

const API_BASE_URL = 'https://podcast-api.netlify.app';

// Function to fetch previews of shows
export const fetchPreviews = () => {
  return axios.get(`${API_BASE_URL}`)
    .then(response => response.data) // Extract data from response
    .catch(error => {
      console.error('Error fetching previews:', error); // Log error if fetching fails
      throw error; // Throw error to handle it further
    });
};

// Function to fetch genre data by ID
export const fetchGenre = (id) => {
  return axios.get(`${API_BASE_URL}/genre/${id}`)
    .then(response => response.data) // Extract data from response
    .catch(error => {
      console.error(`Error fetching genre ${id}:`, error); // Log error if fetching fails
      throw error; // Throw error to handle it further
    });
};

// Function to fetch show data by ID
export const fetchShow = (id) => {
  return axios.get(`${API_BASE_URL}/id/${id}`)
    .then(response => response.data) // Extract data from response
    .catch(error => {
      console.error(`Error fetching show ${id}:`, error); // Log error if fetching fails
      throw error; // Throw error to handle it further
    });
};
