<template>
  <div id="app">
    <!-- Навигационное меню -->
    <nav class="navbar">
      <div class="container">
        <router-link to="/" class="logo">
          Movie Rating
        </router-link>
        <div class="nav-links">
          <router-link to="/" class="nav-link">Главная</router-link>
          <router-link to="/movies" class="nav-link">Фильмы</router-link>
          <router-link to="/genres" class="nav-link">Жанры</router-link>
        </div>
      </div>
    </nav>

    <!-- Основное содержимое -->
    <main class="main-content">
      <div class="container">
        <!-- Здесь будут подгружаться страницы из роутера -->
        <router-view />
      </div>
    </main>

    <!-- Футер -->
    <footer class="footer">
      <div class="container">
        <p>Movie Rating Service © 2026</p>
        <p>Фронтенд: Vue 3 • Бэкенд: FastAPI</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
/* Сброс стилей */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Основные стили */
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Навигация */
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: white;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.3s;
}

.nav-link:hover {
  background: rgba(255,255,255,0.1);
}

.nav-link.router-link-active {
  background: rgba(255,255,255,0.2);
}

/* Основной контент */
.main-content {
  flex: 1;
  padding: 2rem 0;
  background: #f8f9fa;
}

/* Футер */
.footer {
  background: #333;
  color: white;
  padding: 2rem 0;
  text-align: center;
}

.footer p {
  margin: 0.5rem 0;
  opacity: 0.8;
}
</style>