import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Создаем Vue приложение
const app = createApp(App)

// Подключаем роутер
app.use(router)

// Монтируем приложение в элемент #app
app.mount('#app')