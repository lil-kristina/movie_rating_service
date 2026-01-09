<template>
  <div class="genres-view">
    <div class="header">
      <h1>📜 Жанры фильмов</h1>
      <p class="subtitle">Выберите жанр для фильтрации фильмов</p>
    </div>
    
    <!-- Состояние загрузки -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Загружаем жанры...</p>
    </div>
    
    <!-- Состояние ошибки -->
    <div v-else-if="error" class="error-state">
      <p>❌ Ошибка: {{ error }}</p>
      <button @click="fetchGenres" class="retry-btn">Повторить</button>
    </div>
    
    <!-- Жанры -->
    <div v-else class="genres-container">
      <div class="stats">
        <p>Всего жанров: <strong>{{ genres.length }}</strong></p>
      </div>
      
      <!-- Кнопки жанров в оранжевом стиле -->
      <div class="genres-buttons">
        <button 
          v-for="genre in genres" 
          :key="genre" 
          class="genre-btn"
          :class="{ active: selectedGenre === genre }"
          @click="toggleGenre(genre)"
        >
          {{ genre }}
        </button>
      </div>
    </div>
    
    <!-- Фильмы выбранного жанра -->
    <div v-if="selectedGenre" class="movies-by-genre">
      <h2 class="section-title">
        Фильмы в жанре: 
        <span class="highlight">{{ selectedGenre }}</span>
        <button @click="clearGenreFilter" class="clear-btn">
          ✕ Очистить
        </button>
      </h2>
      
      <div class="movies-grid">
        <MovieCard
          v-for="movie in filteredMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
      
      <div v-if="filteredMovies.length === 0" class="no-movies">
        Нет фильмов в этом жанре
      </div>
    </div>
    
    <!-- Все фильмы если жанр не выбран -->
    <div v-else class="all-movies">
      <h2 class="section-title">Все фильмы</h2>
      
      <div class="movies-grid">
        <MovieCard
          v-for="movie in allMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
      
      <div v-if="allMovies.length === 0" class="no-movies">
        Фильмы не найдены
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from '../components/MovieCard.vue';
import api from '../services/api';

export default {
  name: 'GenresView',
  components: {
    MovieCard
  },
  data() {
    return {
      genres: [],
      allMovies: [],
      filteredMovies: [],
      selectedGenre: null,
      loading: true,
      error: null
    };
  },
  async mounted() {
    await Promise.all([this.fetchGenres(), this.fetchMovies()]);
  },
  methods: {
    async fetchGenres() {
      this.loading = true;
      this.error = null;
      
      try {
        const data = await api.getGenres();
        this.genres = data.genres || [];
      } catch (err) {
        console.error('Ошибка загрузки жанров:', err);
        this.error = err.response?.data?.detail || err.message || 'Не удалось загрузить жанры';
      } finally {
        this.loading = false;
      }
    },
    
    async fetchMovies() {
      try {
        const data = await api.getMovies();
        this.allMovies = Array.isArray(data) ? data : [];
      } catch (err) {
        console.error('Ошибка загрузки фильмов:', err);
      }
    },
    
    toggleGenre(genre) {
      if (this.selectedGenre === genre) {
        // Если жанр уже выбран - снимаем выбор
        this.selectedGenre = null;
        this.filteredMovies = [];
      } else {
        // Выбираем новый жанр
        this.selectedGenre = genre;
        
        // Фильтруем фильмы по выбранному жанру
        this.filteredMovies = this.allMovies.filter(movie => 
          movie.genres && movie.genres.includes(genre)
        );
      }
    },
    
    clearGenreFilter() {
      this.selectedGenre = null;
      this.filteredMovies = [];
    }
  }
};
</script>

<style scoped>
.genres-view {
  padding: 20px 0;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.1rem;
  color: #666;
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
  border: 4px solid #f3f3f7;
  border-top: 4px solid #ff6b00;
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
  background: #fff5f5;
  border-radius: 8px;
  border: 1px solid #fed7d7;
  color: #c53030;
}

.retry-btn {
  margin-top: 15px;
  padding: 10px 20px;
  background: #ff6b00;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.retry-btn:hover {
  background: #ff8c42;
}

/* Статистика */
.stats {
  text-align: center;
  margin-bottom: 30px;
  padding: 15px;
  background: #fff7ed;
  border-radius: 8px;
  font-size: 1.1rem;
  color: #7c2d12;
  border: 1px solid #ffedd5;
}

.stats strong {
  color: #ff6b00;
}

/* Кнопки жанров в ОРАНЖЕВОМ СТИЛЕ */
.genres-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 40px;
  padding: 20px;
  background: #fff7ed;
  border-radius: 12px;
  border: 1px solid #ffedd5;
}

.genre-btn {
  padding: 12px 24px;
  background: #ffedd5;
  color: #9a3412;
  border: 2px solid #ffedd5;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
  text-align: center;
}

.genre-btn:hover {
  background: #fed7aa;
  border-color: #fed7aa;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 0, 0.2);
}

.genre-btn.active {
  background: #ff6b00;
  color: white;
  border-color: #ff6b00;
  box-shadow: 0 4px 15px rgba(255, 107, 0, 0.3);
}

.genre-btn.active:hover {
  background: #ff8c42;
  border-color: #ff8c42;
}

/* Секция фильмов */
.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid #ffedd5;
  color: #2d3748;
  font-size: 1.8rem;
}

.highlight {
  color: #ff6b00;
  font-weight: bold;
  margin-left: 10px;
}

.clear-btn {
  padding: 8px 16px;
  background: #e2e8f0;
  color: #4a5568;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: #cbd5e0;
}

/* Сетка фильмов */
.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

/* Все фильмы (когда жанр не выбран) */
.all-movies {
  margin-top: 40px;
  padding-top: 40px;
  border-top: 2px solid #ffedd5;
}

/* Фильмы по жанру */
.movies-by-genre {
  margin-top: 40px;
  padding-top: 40px;
  border-top: 2px solid #ffedd5;
}

.no-movies {
  text-align: center;
  padding: 60px 20px;
  color: #a0aec0;
  font-size: 1.2rem;
  font-style: italic;
  background: #f7fafc;
  border-radius: 10px;
  border: 1px dashed #e2e8f0;
}

/* Адаптивность */
@media (max-width: 768px) {
  .genres-buttons {
    gap: 8px;
    padding: 15px;
  }
  
  .genre-btn {
    padding: 10px 16px;
    font-size: 0.9rem;
    min-width: 100px;
  }
  
  .section-title {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .clear-btn {
    align-self: flex-start;
  }
  
  .movies-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .genres-buttons {
    justify-content: flex-start;
  }
  
  .genre-btn {
    min-width: auto;
    flex: 1;
  }
  
  .movies-grid {
    grid-template-columns: 1fr;
  }
}
</style>