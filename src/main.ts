import { createApp } from 'vue';
import '@/assets/css/tailwind.css';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router); // Configura Vue Router en la instancia de la app
app.mount('#app'); // Monta la misma instancia