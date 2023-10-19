import './source/main.css'
import {createApp} from 'vue';
import App from './source/App.vue';
import router from './source/router/router';

const app = createApp(App);
app.use(router);
app.mount('#app');