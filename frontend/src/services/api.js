import axios from 'axios';

// proxy в vite.config.js перенаправит на бэкенд
const API_BASE_URL = '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default {
  async getMovies() {
    try {
      const response = await apiClient.get('/movies/');
      return response.data;
    } catch (error) {
      console.error('Ошибка при загрузке фильмов:', error);
      throw error;
    }
  },

  async getMovieById(id) {
    try {
      const response = await apiClient.get(`/movies/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при загрузке фильма ${id}:`, error);
      throw error;
    }
  },

  async getGenres() {
    try {
      const response = await apiClient.get('/genres/');
      console.log('Ответ от /genres/:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при загрузке жанров:', error);
      throw error;
    }
  },

  async createMovie(movieData) {
    try {
      const response = await apiClient.post('/movies/', movieData);
      return response.data;
    } catch (error) {
      console.error('Ошибка при создании фильма:', error);
      throw error;
    }
  },

  async updateMovie(id, movieData) {
    try {
      const response = await apiClient.put(`/movies/${id}`, movieData);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при обновлении фильма ${id}:`, error);
      throw error;
    }
  },

  async deleteMovie(id) {
    try {
      const response = await apiClient.delete(`/movies/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при удалении фильма ${id}:`, error);
      throw error;
    }
  }
};