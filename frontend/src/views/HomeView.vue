<template>
  <div class="home-view">
    <div class="hero">
      <h1>🎬 Добро пожаловать в Movie Rating!</h1>
      <p>Сервис для оценки и каталогизации фильмов</p>
      <div class="cta-buttons">
        <router-link to="/movies" class="btn btn-primary">
          Смотреть фильмы
        </router-link>
        <router-link to="/genres" class="btn btn-secondary">
          Искать по жанрам
        </router-link>
      </div>
    </div>

    <div class="features">
      <h2>Возможности</h2>
      <div class="features-grid">
        <div class="feature-card">
          <h3>📝 Оценка фильмов</h3>
          <p>Ставьте рейтинг от 0 до 10</p>
        </div>
        <div class="feature-card">
          <h3>🏷️ Жанры</h3>
          <p>Фильтруйте по жанрам и категориям</p>
        </div>
        <div class="feature-card">
          <h3>🔍 Поиск</h3>
          <p>Находите фильмы по названию и описанию</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home-view {
  padding: 2rem 0;
}

.hero {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.hero p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5a67d8;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #48bb78;
  color: white;
}

.btn-secondary:hover {
  background: #38a169;
  transform: translateY(-2px);
}

.features h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
}

.feature-card h3 {
  margin-bottom: 1rem;
  color: #444;
}
</style>