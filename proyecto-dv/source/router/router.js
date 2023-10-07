import Home from './../pages/Home.vue';
import Cursos from './../pages/Cursos.vue';
import Register from './../pages/Register.vue';
import Login from './../pages/Login.vue';
import Chat from './../pages/Chat.vue';
import Perfil from './../pages/Perfil.vue';
import Error from './../pages/404.vue';
import {createRouter, createWebHistory} from 'vue-router';
import {suscribeToAuth} from '../services/auth.js';

const routes = [
    { path: '/',               component: Home },
    { path: '/cursos',         component: Cursos },
    { path: '/404',            component: Error },
    { path: '/registro',       component: Register },
    { path: '/iniciar-sesion', component: Login },
    { path: '/chat',           component: Chat,    meta:{requiresAuth: true}, },
    { path: '/perfil',         component: Perfil,  meta:{requiresAuth: true}, },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

let usuario = {
    id: null,
    email: null,
}

suscribeToAuth(nuevoUsuario => usuario = nuevoUsuario);

router.beforeEach((to, from) => {
    if(usuario.id === null && to.meta.requiresAuth){
        return '/iniciar-sesion';
    }
});

export default router;