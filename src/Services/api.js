// src/services/api.js

import axios from 'axios';

const API_BASE_URL = 'https://podcast-api.netlify.app';

export const fetchPreviews = () => {
  return axios.get(`${API_BASE_URL}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching previews:', error);
      throw error;
    });
};

export const fetchGenre = (id) => {
  return axios.get(`${API_BASE_URL}/genre/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Error fetching genre ${id}:`, error);
      throw error;
    });
};

export const fetchShow = (id) => {
  return axios.get(`${API_BASE_URL}/id/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Error fetching show ${id}:`, error);
      throw error;
    });
};
