import { createApp } from 'vue';
import '@/assets/css/tailwind.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia'; // importar Pinia

const app = createApp(App);
const pinia = createPinia(); // crear instancia de Pinia

app.use(pinia); // usar pinia en la app
app.use(router); // usar router
app.mount('#app'); // montar app