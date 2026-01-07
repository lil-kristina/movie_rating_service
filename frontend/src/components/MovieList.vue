<template>
  <div class="movie-list">
    <!-- Состояние загрузки -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Загружаем фильмы...</p>
    </div>

    <!-- Состояние ошибки -->
    <div v-else-if="error" class="error-state">
      <p>❌ Ошибка: {{ error }}</p>
      <button @click="fetchMovies" class="retry-btn">Повторить</button>
    </div>

    <!-- Данные загружены -->
    <div v-else>
      <!-- Заголовок с количеством фильмов -->
      <div class="list-header">
        <h2>Все фильмы</h2>
        <span class="movie-count">{{ movies.length }} фильмов</span>
      </div>

      <!-- Сетка фильмов -->
      <div class="movies-grid">
        <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
          class="movie-card-item"
          @click="selectMovie(movie.id)"
        />
      </div>

      <!-- Сообщение если фильмов нет -->
      <div v-if="movies.length === 0" class="empty-state">
        <p>Фильмы не найдены</p>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from './MovieCard.vue';
import api from '../services/api';

export default {
  name: 'MovieList',
  components: {
    MovieCard
  },
  data() {
    return {
      movies: [],
      loading: true,
      error: null
    };
  },
  async mounted() {
    await this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      this.loading = true;
      this.error = null;
      
      try {
        // Используем API-клиент для загрузки фильмов
        const data = await api.getMovies();
        console.log('Фильмы загружены:', data);
        
        // В зависимости от структуры ответа бэкенда
        this.movies = Array.isArray(data) ? data : (data.movies || []);
      } catch (err) {
        console.error('Ошибка загрузки фильмов:', err);
        this.error = err.message || 'Не удалось загрузить фильмы';
      } finally {
        this.loading = false;
      }
    },
    selectMovie(movieId) {
      // Пока просто выводим в консоль, можно сделать переход на детальную страницу
      console.log('Выбран фильм ID:', movieId);
      // this.$router.push(`/movies/${movieId}`);
    }
  }
}
</script>

<style scoped>
.movie-list {
  padding: 20px 0;
}

/* Состояние загрузки */
.loading-state {
  text-align: center;
  padding: 60px 20px;
}

.spinner {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Состояние ошибки */
.error-state {
  text-align: center;
  padding: 40px 20px;
  background: #fed7d7;
  border-radius: 8px;
  color: #c53030;
}

.retry-btn {
  margin-top: 15px;
  padding: 10px 20px;
  background: #c53030;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.retry-btn:hover {
  background: #9b2c2c;
}

/* Заголовок списка */
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid #edf2f7;
}

.list-header h2 {
  margin: 0;
  color: #2d3748;
  font-size: 24px;
}

.movie-count {
  background: #667eea;
  color: white;
  padding: 6px 15px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

/* Сетка фильмов */
.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

.movie-card-item {
  transition: all 0.3s ease;
}

.movie-card-item:hover {
  transform: translateY(-4px);
}

/* Пустой список */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: #f7fafc;
  border-radius: 10px;
  color: #718096;
}

/* Адаптивность */
@media (max-width: 768px) {
  .movies-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .list-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>