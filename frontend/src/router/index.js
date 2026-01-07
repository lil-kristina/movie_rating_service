import { createRouter, createWebHistory } from 'vue-router'

// Используем ленивую загрузку для оптимизации
const HomeView = () => import('../views/HomeView.vue')
const MoviesView = () => import('../views/MoviesView.vue')
const GenresView = () => import('../views/GenresView.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Главная' }
  },
  {
    path: '/movies',
    name: 'movies',
    component: MoviesView,
    meta: { title: 'Фильмы' }
  },
  {
    path: '/genres',
    name: 'genres',
    component: GenresView,
    meta: { title: 'Жанры' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Меняем заголовок страницы при переходе
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | Movie Rating` : 'Movie Rating'
  next()
})

export default router