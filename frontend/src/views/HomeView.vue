<template>
  <div class="home-view">
    <div class="hero">
      <h1>🎬 Добро пожаловать в Movie Rating!</h1>
      <p class="subtitle">— СЕРВИС ДЛЯ ОЦЕНКИ И КАТАЛОГИЗАЦИИ ФИЛЬМОВ —</p>
      <div class="cta-buttons">
        <router-link to="/movies" class="btn btn-primary">
          <span class="btn-text">СМОТРЕТЬ ФИЛЬМЫ</span>
        </router-link>
        <router-link to="/genres" class="btn btn-secondary">
          <span class="btn-text">ИСКАТЬ ПО ЖАНРАМ</span>
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
/* Подключение шрифтов */
@import url('https://fonts.cdnfonts.com/css/thermally');
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;600;700&display=swap');

.home-view {
  padding: 2rem 0;
  min-height: calc(100vh - 200px);
  background: linear-gradient(180deg, #0a0a0a 0%, #121212 50%, #1a1a1a 100%);
}

.hero {
  text-align: center;
  padding: 5rem 2rem;
  background: radial-gradient(
    ellipse at center,
    rgba(255, 107, 0, 0.1) 0%,
    rgba(255, 107, 0, 0.05) 30%,
    transparent 70%
  );
  border-radius: 20px;
  margin-bottom: 4rem;
  border: 1px solid rgba(255, 107, 0, 0.2);
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.hero h1 {
  font-family: 'Thermally', sans-serif;
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #ff8c42 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 20px rgba(255, 107, 0, 0.2);
  letter-spacing: 1px;
  line-height: 1.2;
}

/* Подзаголовок */
.subtitle {
  font-family: 'Orbitron', 'Rajdhani', monospace;
  font-size: 1.5rem;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 3rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  position: relative;
  display: inline-block;
  padding: 10px 30px;
  text-shadow: 0 0 10px rgba(255, 107, 0, 0.5);
  background: rgba(255, 107, 0, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 107, 0, 0.3);
}

.cta-buttons {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 3rem;
}

.btn {
  padding: 0;
  border-radius: 15px;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: none;
  cursor: pointer;
  min-width: 280px;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 8px 25px rgba(255, 107, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
}

/* Обе кнопки одинаковые - оранжевые с черным текстом */
.btn-primary, .btn-secondary {
  background-color: #ff6b00; /* Оранжевый фон */
}

/* Текст кнопок - тот же шрифт, что и у заголовка */
.btn-text {
  font-family: 'Thermally', sans-serif !important;
  font-weight: 800;
  font-size: 1.2rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #000000 !important;
  text-align: center;
  width: 100%;
  display: block;
  padding: 1.2rem 2.5rem;
  position: relative;
  z-index: 2;
  transition: all 0.3s;
}

/* Эффект свечения при наведении на кнопку */
.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.7s;
  z-index: 1;
}

.btn:hover {
  background-color: #ff8c42; /* Более светлый оранжевый */
  transform: translateY(-6px) scale(1.05);
  box-shadow: 
    0 15px 35px rgba(255, 107, 0, 0.4),
    0 5px 15px rgba(255, 107, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.btn:hover::before {
  left: 100%;
}

.btn:hover .btn-text {
  color: #000000 !important;
  transform: scale(1.05);
}

.btn:active {
  transform: translateY(-2px) scale(1.02);
  transition: all 0.1s;
}

/* Стрелка после текста */
.btn::after {
  content: '→';
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: all 0.3s;
  font-size: 1.5rem;
  color: #000000 !important;
  font-weight: bold;
  font-family: 'Thermally', sans-serif;
  z-index: 2;
}

.btn:hover::after {
  opacity: 1;
  right: 15px;
}

/* Убираем стандартные стили для router-link */
a {
  text-decoration: none;
}

.features {
  padding: 3rem 1rem;
}

.features h2 {
  text-align: center;
  margin-bottom: 3rem;
  color: #ffffff;
  font-family: 'Thermally', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  position: relative;
  padding-bottom: 1rem;
}

.features h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #ff6b00, #ff8c42);
  border-radius: 2px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: rgba(30, 30, 30, 0.8);
  padding: 2.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  text-align: center;
  border: 1px solid rgba(255, 107, 0, 0.2);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #ff6b00, #ff8c42);
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(255, 107, 0, 0.1);
  border-color: rgba(255, 107, 0, 0.4);
}

.feature-card h3 {
  margin-bottom: 1.2rem;
  color: #ffffff;
  font-family: 'Thermally', sans-serif;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.feature-card p {
  color: #cccccc;
  line-height: 1.6;
  font-size: 1.1rem;
  opacity: 0.9;
}

/* Адаптивность */
@media (max-width: 768px) {
  .hero {
    padding: 3rem 1rem;
    margin: 0 1rem 3rem;
  }

  .hero h1 {
    font-size: 2.2rem;
  }

  .subtitle {
    font-size: 1.1rem;
    letter-spacing: 2px;
    padding: 8px 20px;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .btn {
    min-width: 100%;
    max-width: 300px;
    height: 60px;
  }

  .btn-text {
    font-size: 1rem;
    padding: 1rem 1.5rem;
  }

  .features h2 {
    font-size: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .feature-card {
    padding: 2rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero h1 {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 0.9rem;
    letter-spacing: 1px;
    padding: 6px 15px;
  }

  .btn-text {
    font-size: 0.9rem;
    letter-spacing: 1px;
  }

  .features h2 {
    font-size: 1.8rem;
  }
}

/* Анимация появления */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero {
  animation: fadeInUp 0.8s ease-out;
}

.features-grid {
  animation: fadeInUp 0.8s ease-out 0.3s both;
}

/* Гарантируем, что текст кнопок всегда черный */
.btn-primary .btn-text,
.btn-secondary .btn-text,
.btn-primary:hover .btn-text,
.btn-secondary:hover .btn-text,
.btn-primary:focus .btn-text,
.btn-secondary:focus .btn-text,
.btn-primary:active .btn-text,
.btn-secondary:active .btn-text {
  color: #000000 !important;
}
</style>