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
        <div class="footer-content">
          <div class="footer-section">
            <h3>Movie Rating</h3>
            <p>Ваш личный кинокритик</p>
          </div>
          <div class="footer-section">
            <h4>Навигация</h4>
            <router-link to="/">Главная</router-link>
            <router-link to="/movies">Фильмы</router-link>
            <router-link to="/genres">Жанры</router-link>
          </div>
          <div class="footer-section">
            <h4>Технологии</h4>
            <p>Vue 3 • Vite • FastAPI</p>
            <p>2026</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>Movie Rating Service © 2026 • Все права защищены</p>
        </div>
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
  font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #0a0a0a;
  color: #ffffff;
  line-height: 1.6;
}

/* Контейнер */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
}

/* ===== НАВИГАЦИЯ ===== */
.navbar {
  background: linear-gradient(135deg, #ff6b00 0%, #ff8c42 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 4px 20px rgba(255, 107, 0, 0.3);
  border-bottom: 2px solid #ff8c42;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.8rem;
  font-weight: 800;
  text-decoration: none;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  font-size: 1rem;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
}

/* ===== ОСНОВНОЙ КОНТЕНТ ===== */
.main-content {
  flex: 1;
  padding: 3rem 0;
  background: linear-gradient(180deg, #0a0a0a 0%, #121212 100%);
  min-height: calc(100vh - 140px);
}

/* ===== ФУТЕР ===== */
.footer {
  background: #1a1a1a;
  color: #ffffff;
  padding: 3rem 0 1.5rem;
  border-top: 2px solid #333;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3 {
  color: #ff8c42;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.footer-section h4 {
  color: #ff8c42;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.footer-section p {
  color: #cccccc;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.footer-section a {
  color: #cccccc;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  transition: color 0.3s;
  font-size: 0.95rem;
}

.footer-section a:hover {
  color: #ff8c42;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #333;
}

.footer-bottom p {
  color: #888888;
  font-size: 0.9rem;
}

/* ===== ДОПОЛНИТЕЛЬНЫЕ СТИЛИ ===== */

/* Скроллбар */
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #ff6b00, #ff8c42);
  border-radius: 6px;
  border: 2px solid #1a1a1a;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #ff8c42, #ff6b00);
}

/* Общие ссылки (не навигационные) */
a:not(.nav-link):not(.logo):not(.footer-section a) {
  color: #ff8c42;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding-bottom: 2px;
}

a:not(.nav-link):not(.logo):not(.footer-section a)::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #ff8c42;
  transition: width 0.3s ease;
}

a:not(.nav-link):not(.logo):not(.footer-section a):hover::after {
  width: 100%;
}

/* Карточки */
.card {
  background: rgba(30, 30, 30, 0.8);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 107, 0, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(255, 107, 0, 0.2);
  border-color: rgba(255, 107, 0, 0.4);
}

/* Кнопки */
button, .btn, input[type="submit"], input[type="button"] {
  background: linear-gradient(135deg, #ff6b00 0%, #ff8c42 100%);
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
}

button:hover, .btn:hover, input[type="submit"]:hover, input[type="button"]:hover {
  background: linear-gradient(135deg, #ff8c42 0%, #ff6b00 100%);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(255, 107, 0, 0.4);
}

button:active, .btn:active, input[type="submit"]:active, input[type="button"]:active {
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(255, 107, 0, 0.3);
}

/* Анимация загрузки */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.main-content > .container {
  animation: fadeIn 0.5s ease-out;
}

/* Адаптивность */
@media (max-width: 768px) {
  .navbar .container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-links {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .nav-link {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  
  .logo {
    font-size: 1.5rem;
  }
  
  .main-content {
    padding: 2rem 0;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

/* Темный режим улучшения */
@media (prefers-color-scheme: dark) {
  #app {
    background-color: #0a0a0a;
  }
  
  .main-content {
    background: linear-gradient(180deg, #0a0a0a 0%, #121212 100%);
  }
}

/* Выделение текста */
::selection {
  background: rgba(255, 107, 0, 0.3);
  color: #ffffff;
}

::-moz-selection {
  background: rgba(255, 107, 0, 0.3);
  color: #ffffff;
}

/* Плейсхолдеры */
::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

/* Инпут поля */
input, textarea, select {
  background: rgba(30, 30, 30, 0.8);
  border: 1px solid rgba(255, 107, 0, 0.3);
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #ff8c42;
  box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.1);
}
</style>