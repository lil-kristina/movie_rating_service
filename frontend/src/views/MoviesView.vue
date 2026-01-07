<template>
  <div class="movies-view">
    <div class="container">
      <div class="header">
        <h1>🎬 Каталог фильмов</h1>
        <p class="subtitle">Рейтинги, описания и жанры всех фильмов</p>
      </div>
      
      <!-- Компонент списка фильмов -->
      <MovieList />
    </div>
  </div>
</template>

<script>
import MovieList from '../components/MovieList.vue';

export default {
  name: 'MoviesView',
  components: {
    MovieList
  }
}
</script>

<style scoped>
.movies-view {
  padding: 20px 0;
  min-height: 70vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.1rem;
  color: #718096;
  margin-bottom: 30px;
}
</style>