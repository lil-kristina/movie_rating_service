import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Создаем экземпляр axios с настройками
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 секунд таймаут
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Экспортируем готовые методы для работы с API
export default {
  /**
   * Получить все фильмы
   * @returns {Promise} Список фильмов
   */
  async getMovies() {
    try {
      const response = await apiClient.get('/api/movies/');
      return response.data;
    } catch (error) {
      console.error('Ошибка при загрузке фильмов:', error);
      throw error;
    }
  },

  /**
   * Получить один фильм по ID
   * @param {number} id - ID фильма
   * @returns {Promise} Данные фильма
   */
  async getMovieById(id) {
    try {
      const response = await apiClient.get(`/api/movies/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при загрузке фильма ${id}:`, error);
      throw error;
    }
  },

  /**
   * Получить все уникальные жанры
   * @returns {Promise} Список жанров
   */
  async getGenres() {
    try {
      const response = await apiClient.get('/genres/');
      return response.data;
    } catch (error) {
      console.error('Ошибка при загрузке жанров:', error);
      throw error;
    }
  },

  /**
   * Создать новый фильм
   * @param {Object} movieData - Данные фильма
   * @returns {Promise} Созданный фильм
   */
  async createMovie(movieData) {
    try {
      const response = await apiClient.post('/movies/', movieData);
      return response.data;
    } catch (error) {
      console.error('Ошибка при создании фильма:', error);
      throw error;
    }
  },

  /**
   * Обновить фильм
   * @param {number} id - ID фильма
   * @param {Object} movieData - Новые данные
   * @returns {Promise} Обновленный фильм
   */
  async updateMovie(id, movieData) {
    try {
      const response = await apiClient.put(`/api/movies/${id}`, movieData);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при обновлении фильма ${id}:`, error);
      throw error;
    }
  },

  /**
   * Удалить фильм
   * @param {number} id - ID фильма
   * @returns {Promise} Результат удаления
   */
  async deleteMovie(id) {
    try {
      const response = await apiClient.delete(`/api/movies/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при удалении фильма ${id}:`, error);
      throw error;
    }
  }
};