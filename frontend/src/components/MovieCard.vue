<template>
  <div class="movie-card">
    <div class="movie-poster">
      <img :src="posterUrl" :alt="movie.title" class="poster-image" />
      <div class="movie-rating">{{ movie.rating?.toFixed(1) || 'N/A' }}</div>
    </div>
    <div class="movie-info">
      <h3 class="movie-title">{{ movie.title }}</h3>
      <p class="movie-year">📅 {{ movie.release_year }}</p>
      <div class="movie-genres">
        <span 
          v-for="genre in movie.genres" 
          :key="genre" 
          class="genre-tag"
        >
          {{ genre }}
        </span>
      </div>
      <p class="movie-description" v-if="showDescription">
        {{ truncateDescription(movie.description) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object,
      required: true
    },
    showDescription: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    posterUrl() {
      // Заглушка для постера (можно заменить на реальные изображения)
      return `https://via.placeholder.com/300x450/2d3748/ffffff?text=${encodeURIComponent(this.movie.title)}`;
    }
  },
  methods: {
    truncateDescription(text) {
      if (!text) return 'Нет описания';
      if (text.length > 100) {
        return text.substring(0, 100) + '...';
      }
      return text;
    }
  }
}
</script>

<style scoped>
.movie-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  height: 100%;
}

.movie-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.movie-poster {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.poster-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.movie-rating {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.8);
  color: #ffd700;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
  backdrop-filter: blur(4px);
}

.movie-info {
  padding: 20px;
}

.movie-title {
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
  line-height: 1.4;
}

.movie-year {
  margin: 0 0 12px 0;
  color: #718096;
  font-size: 14px;
}

.movie-genres {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 15px;
}

.genre-tag {
  background: #edf2f7;
  color: #4a5568;
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

.movie-description {
  margin: 0;
  color: #718096;
  font-size: 14px;
  line-height: 1.5;
}

/* Адаптивность */
@media (max-width: 768px) {
  .movie-poster {
    height: 250px;
  }
  
  .movie-info {
    padding: 16px;
  }
  
  .movie-title {
    font-size: 16px;
  }
}
</style>