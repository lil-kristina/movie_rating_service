# Список фильмов с рейтингом
Сервис для управления списком фильмов с рейтингом. Позволяет просматривать, добавлять, редактировать и фильтровать фильмы по жанрам и рейтингу.

## 🚀 Функциональность

- **Просмотр фильмов** - сетка карточек с постером, названием, рейтингом и жанрами
- **Добавление/редактирование** - форма для создания и изменения фильмов
- **Фильтрация** - по жанрам (множественный выбор) и диапазону рейтинга
- **CRUD операции** - полное управление списком фильмов

## 🛠 Технологии

### Backend
- **Python 3.9+** - основной язык
- **FastAPI** - веб-фреймворк
- **PostgreSQL** - база данных
- **SQLAlchemy** - ORM
- **Pydantic** - валидация данных
- **Uvicorn** - ASGI сервер

### Frontend
- **Vue.js 3** - фронтенд фреймворк
- **Axios** - HTTP клиент
- **Vue Router** - маршрутизация
- **CSS3** - стилизация

## Разработчики 
- Backend - Седова Кристина 
- Frontend - Макарова Мария 

## Требования к проекту:
- необходимо реализовать тему полностью    +
- должна быть точная структура проекта: разделение на пакеты/папки/модули    +
- должен быть настроен ci хотя бы с build/linter    +
- сообщения коммитов должны быть содержательными (не uploaded files/fix/add/etc.)    +
- если проект выполняется в команде, у каждого должна быть роль: бекенд, фронтенд, etc.    +
- должен быть небольшой README с описанием проекта    +
- должны быть оформлены задачи на каждого участника в yandex tracker/jira/trello/youtrack с описанием    +
- должен применяться  github/git flow    +

## Запуск проекта (Git Bash, Windows)
### 1. Клонирование репозитория
```bash
git clone <ваш-репозиторий>
cd movie_rating_service
```
### 2. Настройка бэкенда (FastAPI)
```bash
# Перейдите в папку бэкенда
cd backend

# Создайте виртуальное окружение 
python -m venv venv

# Активируйте виртуальное окружение 
source venv/Scripts/activate

# Установите зависимости
pip install -r requirements.txt
```
### 3. Настройка базы данных PostgreSQL:
   - Установите PostgreSQL
   - Создайте базу данных:
```sql
CREATE DATABASE movie_db;
CREATE USER postgres WITH PASSWORD ***;
GRANT ALL PRIVILEGES ON DATABASE movie_db TO postgres;
```
### 4. Создайте файл backend/.env:
```text
DATABASE_URL=postgresql://postgres:ВАШ_ПАРОЛЬ@localhost/movie_db
```
### 5. Создание таблиц в БД:
```bash
cd backend
python -c "
from app.database.session import Base, engine
from app.models.movie import Movie
Base.metadata.create_all(bind=engine)
print('Таблицы созданы')
"
```
### 6. Настройка фронтенда (Vue.js)
Установка зависимостей Node.js:
```bash
# Перейдите в папку фронтенда
cd frontend

# Установите зависимости
npm install
```
Настройка прокси (Vite):
Убедитесь что в frontend/vite.config.js есть:
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
```
### 7. Запуск проекта
Запуск в отдельных терминалах!!!!!!!!!!!!!!!!!!
Терминал 1 - Бэкенд:
```bash
cd backend
uvicorn app.main:app --reload
```
- Бэкенд будет доступен по адресу: http://localhost:8000
- API: http://localhost:8000/api/movies/
- Документация: http://localhost:8000/docs

Терминал 2 - Фронтенд:
```bash
cd frontend
npm run dev
```
- Фронтенд будет доступен по адресу: http://localhost:5173

### Проверка работоспособности
- Бэкенд работает: http://localhost:8000/health
- API работает: http://localhost:8000/api/movies/
- Фронтенд работает: http://localhost:5173
- CORS настроен: Фронтенд может делать запросы к API

### Структура проекта после установки
```text
movie_rating_service/
├── .github/workflows/
│   └── ci.yml                 # CI пайплайн
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── endpoints/
│   │   │       ├── genres.py  # Эндпоинты для жанров
│   │   │       └── movies.py  # Эндпоинты для фильмов (CRUD+фильтрация)
│   │   ├── crud/
│   │   │   └── movies.py      # CRUD операции для фильмов
│   │   ├── database/
│   │   │   ├── config.py      # Конфигурация БД
│   │   │   └── session.py     # Сессия БД (SQLAlchemy)
│   │   ├── models/
│   │   │   └── movie.py       # Модель SQLAlchemy
│   │   ├── schemas/
│   │   │   └── movie.py       # Pydantic схемы
│   │   └── main.py            # Точка входа FastAPI приложения
│   ├── tests/                 # Тесты
│   ├── venv/                  # Виртуальное окружение Python
│   ├── .env                   # Переменные окружения
│   └── requirements.txt       # Зависимости Python
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MovieCard.vue  # Компонент карточки фильма
│   │   │   └── MovieList.vue  # Компонент списка фильмов
│   │   ├── router/
│   │   │   └── index.js       # Маршрутизация Vue Router
│   │   ├── services/
│   │   │   └── api.js         # API клиент для бэкенда
│   │   ├── views/
│   │   │   ├── GenresView.vue # Страница жанров
│   │   │   ├── HomeView.vue   # Главная страница
│   │   │   └── MoviesView.vue # Страница фильмов
│   │   ├── App.vue            # Корневой компонент
│   │   └── main.js            # Точка входа Vue приложения
│   ├── index.html             # HTML шаблон
│   └── vite.config.js         # Конфигурация Vite
├── .gitignore
└── README.md
```







