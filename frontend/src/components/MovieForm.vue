<template>
  <div class="movie-form-overlay" v-if="visible" @click.self="close">
    <div class="movie-form">
      <h2>{{ isEditMode ? 'Редактировать фильм' : 'Добавить фильм' }}</h2>
      
      <form @submit.prevent="submit">
        <div class="form-group">
          <label>Название *</label>
          <input v-model="formData.title" required maxlength="200" />
        </div>
        
        <div class="form-group">
          <label>Описание</label>
          <textarea v-model="formData.description" rows="3"></textarea>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>Рейтинг (0-10)</label>
            <input 
              v-model.number="formData.rating" 
              type="number" 
              min="0" 
              max="10" 
              step="0.1" 
            />
          </div>
          
          <div class="form-group">
            <label>Год выпуска *</label>
            <input 
              v-model.number="formData.release_year" 
              type="number" 
              min="1900" 
              :max="currentYear" 
              required 
            />
          </div>
        </div>
        
        <!-- ИСПРАВЛЕННЫЙ БЛОК ЖАНРОВ -->
        <div class="form-group">
          <label>Жанры</label>
          <div style="display: flex; gap: 10px; margin-bottom: 10px;">
            <input 
              v-model="genreInput" 
              @keyup.enter.prevent="addGenre"
              placeholder="драма, комедия, фантастика"
              style="flex: 1; padding: 10px; border: 1px solid #e2e8f0; border-radius: 6px;"
            />
            <button 
              type="button" 
              @click="addGenre"
              style="padding: 10px 20px; background: #48bb78; color: white; border: none; border-radius: 6px; cursor: pointer; white-space: nowrap;"
            >
              Добавить
            </button>
          </div>
          
          <small class="hint">Введите жанры через запятую и нажмите "Добавить" или Enter</small>
          
          <div class="genres-list" v-if="formData.genres.length > 0" style="margin-top: 10px;">
            <span v-for="(genre, index) in formData.genres" :key="index" class="genre-tag">
              {{ genre }} 
              <button type="button" @click="removeGenre(index)" class="remove-genre">×</button>
            </span>
          </div>
          <div v-else class="no-genres">
            Жанры не добавлены
          </div>
        </div>
        
        <div class="form-group">
          <label>URL постера из интернета</label>
          <input 
            v-model="formData.poster_url" 
            placeholder="https://example.com/poster.jpg"
            class="url-input"
          />
          <small class="hint">Можно использовать: https://m.media-amazon.com/images/... или другой URL</small>
          
          <div v-if="formData.poster_url" class="image-preview">
            <p>Предпросмотр:</p>
            <img 
              :src="formData.poster_url" 
              @error="handleImageError"
              class="preview-image"
              alt="Предпросмотр постера"
            />
            <p v-if="imageError" class="preview-error">
              ⚠️ Не удалось загрузить изображение по этому URL
            </p>
          </div>
        </div>
        
        <div class="form-actions">
          <button type="button" class="btn-cancel" @click="close">
            Отмена
          </button>
          <button type="submit" class="btn-submit">
            {{ isEditMode ? 'Сохранить' : 'Добавить' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'MovieForm',
  props: {
    visible: Boolean,
    movie: Object
  },
  data() {
    return {
      formData: {
        title: '',
        description: '',
        rating: 0,
        release_year: new Date().getFullYear(),
        genres: [],
        poster_url: ''
      },
      genreInput: '',
      currentYear: new Date().getFullYear(),
      imageError: false
    };
  },
  computed: {
    isEditMode() {
      return !!this.movie;
    }
  },
  watch: {
    movie: {
      immediate: true,
      handler(newMovie) {
        if (newMovie) {
          this.formData = { 
            title: newMovie.title || '',
            description: newMovie.description || '',
            rating: newMovie.rating || 0,
            release_year: newMovie.release_year || new Date().getFullYear(),
            genres: Array.isArray(newMovie.genres) ? [...newMovie.genres] : [],
            poster_url: newMovie.poster_url || ''
          };
        } else {
          this.resetForm();
        }
      }
    },
    'formData.poster_url': {
      handler() {
        this.imageError = false;
      }
    }
  },
  methods: {
    addGenre() {
        console.log('genreInput до обработки:', this.genreInput);
        console.log('formData.genres до добавления:', this.formData.genres);
        
        if (!this.genreInput.trim()) {
            console.log('genreInput пустой, выходим');
            return;
        }
  
        const newGenres = this.genreInput.split(',');
        console.log('После split:', newGenres);
  
        const cleanedGenres = newGenres.map(g => g.trim());
        console.log('После trim:', cleanedGenres);
  
        const filteredGenres = cleanedGenres.filter(g => g.length > 0);
        console.log('После фильтрации:', filteredGenres);
  
        filteredGenres.forEach(genre => {
            if (!this.formData.genres.includes(genre)) {
            this.formData.genres.push(genre);
            console.log('Добавлен жанр:', genre);
            }
        });
  
        console.log('formData.genres после добавления:', this.formData.genres);
  
        this.genreInput = '';
    },
    
    removeGenre(index) {
      this.formData.genres.splice(index, 1);
    },
    
    handleImageError() {
      this.imageError = true;
    },
    
    resetForm() {
      this.formData = {
        title: '',
        description: '',
        rating: 0,
        release_year: new Date().getFullYear(),
        genres: [],
        poster_url: ''
      };
      this.genreInput = '';
      this.imageError = false;
    },
    
    async submit() {
      try {
        const dataToSend = {
          title: this.formData.title,
          description: this.formData.description,
          rating: this.formData.rating,
          genres: this.formData.genres,
          release_year: this.formData.release_year,
          poster_url: this.formData.poster_url || null
        };
        
        console.log('Отправляем данные:', JSON.stringify(dataToSend, null, 2));
        
        if (this.isEditMode) {
          await api.updateMovie(this.movie.id, dataToSend);
          this.$emit('saved', { type: 'updated' });
        } else {
          await api.createMovie(dataToSend);
          this.$emit('saved', { type: 'created' });
        }
        
        this.close();
      } catch (error) {
        console.error('Ошибка сохранения:', error);
        alert('Ошибка: ' + (error.response?.data?.detail || error.message));
      }
    },
    
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.movie-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.movie-form {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.movie-form h2 {
  margin: 0 0 20px 0;
  color: #2d3748;
}

.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 20px;
}

.form-row .form-group {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #4a5568;
  font-size: 14px;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

.hint {
  display: block;
  margin-top: 5px;
  color: #718096;
  font-size: 12px;
  font-style: italic;
}

.genres-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.no-genres {
  color: #a0aec0;
  font-style: italic;
  margin-top: 10px;
  font-size: 14px;
}

.genre-tag {
  background: #4299e1;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.remove-genre {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  line-height: 1;
  margin-left: 5px;
}

.remove-genre:hover {
  color: #fed7d7;
}

.image-preview {
  margin-top: 15px;
  padding: 15px;
  background: #f7fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.preview-image {
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
  border-radius: 6px;
  margin-top: 10px;
  border: 1px solid #cbd5e0;
}

.preview-error {
  color: #e53e3e;
  margin-top: 10px;
  font-size: 14px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 30px;
}

.btn-cancel, .btn-submit {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
}

.btn-cancel {
  background: #e2e8f0;
  color: #4a5568;
}

.btn-cancel:hover {
  background: #cbd5e0;
}

.btn-submit {
  background: #4299e1;
  color: white;
}

.btn-submit:hover {
  background: #3182ce;
}
</style>