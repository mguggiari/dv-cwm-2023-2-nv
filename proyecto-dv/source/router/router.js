import Home from './../pages/Home.vue';
import Cursos from './../pages/Cursos.vue';
import Register from './../pages/Register.vue';
import Login from './../pages/Login.vue';
import Chat from './../pages/Chat.vue';
import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    { path: '/',               component: Home },
    { path: '/cursos',         component: Cursos },
    { path: '/registro',       component: Register },
    { path: '/iniciar-sesion', component: Login },
    { path: '/chat',           component: Chat },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;