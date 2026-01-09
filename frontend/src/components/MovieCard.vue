<template>
  <div class="movie-card">
    <div class="movie-poster">
      <img 
        :src="posterUrl" 
        :alt="movie.title" 
        class="poster-image"
        @error="handleImageError"
        loading="lazy"
      />
      <div class="movie-rating">{{ formattedRating }}</div>
    </div>
    
    <div class="movie-info">
      <h3 class="movie-title">{{ movie.title }}</h3>
      <p class="movie-year">📅 {{ movie.release_year }}</p>
      
      <div class="movie-genres">
        <span v-for="genre in movie.genres" :key="genre" class="genre-tag">
          {{ genre }}
        </span>
        <span v-if="movie.genres.length === 0" class="no-genres">
          Нет жанров
        </span>
      </div>
      
      <p class="movie-description" v-if="showDescription">
        {{ truncatedDescription }}
      </p>
      
      <!-- КНОПКИ CRUD -->
      <div class="crud-actions">
        <button class="btn-edit" @click.stop="editMovie">
          ✏️ Редактировать
        </button>
        <button class="btn-delete" @click.stop="deleteMovie">
          🗑️ Удалить
        </button>
      </div>
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
  data() {
    return {
      imageError: false
    };
  },
  computed: {
    formattedRating() {
      return this.movie.rating ? this.movie.rating.toFixed(1) : 'N/A';
    },
    truncatedDescription() {
      if (!this.movie.description) return 'Нет описания';
      if (this.movie.description.length > 100) {
        return this.movie.description.substring(0, 100) + '...';
      }
      return this.movie.description;
    },
    posterUrl() {
      if (this.movie.poster_url && !this.imageError) {
        return this.movie.poster_url;
      }
      
      const posterMap = {
        'Крестный отец': '/images/godfather.jpg',
        'Форрест Гамп': '/images/forrest_gump.jpg',
        'Побег из Шоушенка': '/images/shawshank.jpg',
        'Зверополис': '/images/zootopia.jpg',
        'Чебурашка': '/images/cheburashka.jpg',
        'Король Лев': '/images/lion_king.jpg',
        'История игрушек': '/images/toy_story.jpg',
        'Головоломка': '/images/inside_out.jpg',
        'ВАЛЛ·И': '/images/wall_e.jpg',
        'Гарри Поттер и философский камень': '/images/harry_potter1.jpg',
        'Человек-паук: Через вселенные': '/images/spiderman_verse.jpg',
        'Назад в будущее': '/images/back_to_future.jpg',
        'Хроники Нарнии: Лев, колдунья и платяной шкаф': '/images/narnia.jpg',
        'Интерстеллар': '/images/interstellar.jpg',
        '1+1': '/images/intouchables.jpg',
        'Матрица': '/images/matrix.jpg',
        'Москва слезам не верит': '/images/moscow_tears.jpg',
        'Служебный роман': '/images/office_romance.jpg'
      };
      
      return posterMap[this.movie.title] || 
             `https://via.placeholder.com/300x450/2d3748/ffffff?text=${encodeURIComponent(this.movie.title.substring(0, 20))}`;
    }
  },
  methods: {
    handleImageError() {
      this.imageError = true;
    },
    
    editMovie() {
      this.$emit('edit', this.movie);
    },
    
    async deleteMovie() {
      if (confirm(`Удалить фильм "${this.movie.title}"?`)) {
        this.$emit('delete', this.movie.id);
      }
    }
  }
}
</script>

<style scoped>
/* ОСНОВНАЯ КАРТОЧКА */
.movie-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.movie-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.movie-poster {
  position: relative;
  width: 100%;
  height: 300px; 
  overflow: hidden;
  background: #f5f7fa;
}


.poster-image {
  width: 100%;
  height: 100%;
  object-fit: contain; 
  display: block;
  transition: transform 0.5s ease;
}

.movie-card:hover .poster-image {
  transform: scale(1.05);
}

/* РЕЙТИНГ */
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
  z-index: 2;
}

/* ИНФОРМАЦИЯ О ФИЛЬМЕ */
.movie-info {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
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

.no-genres {
  color: #a0aec0;
  font-style: italic;
  font-size: 14px;
}

.movie-description {
  margin: 0;
  color: #718096;
  font-size: 14px;
  line-height: 1.5;
  flex: 1;
}

/* КНОПКИ CRUD */
.crud-actions {
  display: flex;
  gap: 10px;
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px solid #e2e8f0;
}

.btn-edit, .btn-delete {
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-edit {
  background: #FF7F49;
  color: white;
}

.btn-edit:hover {
  background: #FF4F00;
}

.btn-delete {
  background: #fc8181;
  color: white;
}

.btn-delete:hover {
  background: #e82525ff;
}

/* АДАПТИВНОСТЬ */
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