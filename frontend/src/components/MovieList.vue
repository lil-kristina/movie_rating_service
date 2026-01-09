<template>
  <div class="movie-list">
    <!-- Заголовок с кнопкой добавления -->
    <div class="list-header">
      <div>
        <h2>Все фильмы</h2>
        <span class="movie-count">{{ filteredMovies.length }} фильмов</span>
      </div>
      <button class="btn-add" @click="showAddForm">
        ＋ Добавить фильм
      </button>
    </div>

    <!-- ПАНЕЛЬ ФИЛЬТРОВ -->
    <div class="filters-panel">
      <!-- ФИЛЬТР ПО ОЦЕНКАМ -->
      <div class="filter-group">
        <label>Рейтинг от:</label>
        <div class="rating-filter">
          <input 
            type="range" 
            v-model.number="minRating" 
            @input="applyFilters"
            min="0" 
            max="10" 
            step="0.5"
            class="rating-slider"
          />
          <span class="rating-value">{{ minRating.toFixed(1) }}</span>
        </div>
      </div>
      
      <!-- Кнопка сброса -->
      <button @click="resetFilters" class="reset-btn">
        Сбросить фильтры
      </button>
    </div>

    <!-- Сетка фильмов -->
    <div class="movies-grid">
      <MovieCard
        v-for="movie in filteredMovies"
        :key="movie.id"
        :movie="movie"
        @edit="showEditForm"
        @delete="handleDelete"
      />
    </div>

    <!-- Сообщение если нет фильмов -->
    <div v-if="filteredMovies.length === 0" class="no-movies">
      Фильмы не найдены
    </div>

    <!-- Форма добавления/редактирования -->
    <MovieForm
      :visible="showForm"
      :movie="selectedMovie"
      @saved="handleSaved"
      @close="hideForm"
    />
  </div>
</template>

<script>
import MovieCard from './MovieCard.vue';
import MovieForm from './MovieForm.vue';
import api from '../services/api';

export default {
  name: 'MovieList',
  components: {
    MovieCard,
    MovieForm
  },
  data() {
    return {
      movies: [],  // Все фильмы из API
      filteredMovies: [],  // Отфильтрованные фильмы
      showForm: false,
      selectedMovie: null,
      
      // ФИЛЬТР
      minRating: 0
    };
  },
  async mounted() {
    await this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      try {
        const data = await api.getMovies();
        this.movies = Array.isArray(data) ? data : [];
        this.filteredMovies = [...this.movies]; // Показываем все фильмы
      } catch (err) {
        console.error('Ошибка загрузки фильмов:', err);
        alert('Не удалось загрузить фильмы');
      }
    },
    
    // ПРИМЕНЕНИЕ ФИЛЬТРОВ
    applyFilters() {
      let filtered = [...this.movies];
      
      // ФИЛЬТР ПО ОЦЕНКЕ
      if (this.minRating > 0) {
        filtered = filtered.filter(movie => 
          movie.rating && movie.rating >= this.minRating
        );
      }
      
      this.filteredMovies = filtered;
    },
    
    // СБРОС ФИЛЬТРОВ
    resetFilters() {
      this.minRating = 0;
      this.filteredMovies = [...this.movies];
    },
    
    showAddForm() {
      this.selectedMovie = null;
      this.showForm = true;
    },
    
    showEditForm(movie) {
      this.selectedMovie = { ...movie };
      this.showForm = true;
    },
    
    hideForm() {
      this.showForm = false;
      this.selectedMovie = null;
    },
    
    async handleDelete(movieId) {
      try {
        await api.deleteMovie(movieId);
        this.movies = this.movies.filter(m => m.id !== movieId);
        this.applyFilters(); // Обновляем фильтрованный список
        alert('Фильм успешно удален');
      } catch (error) {
        console.error('Ошибка удаления фильма:', error);
        alert('Не удалось удалить фильм');
      }
    },
    
    async handleSaved() {
      await this.fetchMovies(); // Перезагружаем все фильмы
      this.applyFilters(); // Применяем текущие фильтры
    }
  }
};
</script>

<style scoped>
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
  background: #ec721aff;
  color: white;
  padding: 6px 15px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.btn-add {
  background: #ec721aff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-add:hover {
  background: #fe5900ff;
}

/* Панель фильтров */
.filters-panel {
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 250px;
}

.filter-group label {
  font-weight: 600;
  color: #4a5568;
  font-size: 14px;
}

/* Фильтр по рейтингу */
.rating-filter {
  display: flex;
  align-items: center;
  gap: 15px;
}

.rating-slider {
  flex: 1;
  height: 6px;
  -webkit-appearance: none;
  background: #e2e8f0;
  border-radius: 3px;
  outline: none;
}

.rating-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #e14242ff;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.rating-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #d42727ff;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.rating-value {
  min-width: 40px;
  text-align: center;
  font-weight: 700;
  color: #e82424ff;
  font-size: 16px;
}

/* Кнопка сброса */
.reset-btn {
  padding: 10px 20px;
  background: #e2e8f0;
  color: #4a5568;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s;
  align-self: flex-end;
  margin-left: auto;
}

.reset-btn:hover {
  background: #cbd5e0;
}

/* Сетка фильмов */
.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

/* Сообщение когда нет фильмов */
.no-movies {
  text-align: center;
  padding: 40px;
  color: #a0aec0;
  font-size: 18px;
  font-style: italic;
}

/* Адаптивность */
@media (max-width: 768px) {
  .filters-panel {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-group {
    min-width: auto;
  }
  
  .reset-btn {
    align-self: stretch;
    margin-left: 0;
  }
}
</style>