<template>
  <div class="genres-view">
    <div class="header">
      <h1>🏷️ Жанры фильмов</h1>
      <p class="subtitle">Поиск фильмов по категориям</p>
    </div>
    
    <div class="placeholder">
      <p>Список жанров загружается с бэкенда...</p>
      <p>🔍 Здесь будет фильтрация по жанрам</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GenresView'
}
</script>

<style scoped>
.genres-view {
  padding: 20px;
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

.placeholder {
  text-align: center;
  padding: 60px 20px;
  background: #f8f9fa;
  border-radius: 10px;
  border: 2px dashed #dee2e6;
  color: #6c757d;
  font-size: 1.2rem;
}
</style>