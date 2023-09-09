import Home from './../pages/Home.vue';
import About from './../pages/About.vue';
import About from './../pages/Login.vue';
import About from './../pages/Register.vue';
import Chat from './../pages/Chat.vue';
import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    { path: '/',               component: Home },
    { path: '/sobre-nosotros', component: About },
    { path: '/registro',       component: Register },
    { path: '/iniciar-sesion', component: Login },
    { path: '/chat',           component: Chat },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;