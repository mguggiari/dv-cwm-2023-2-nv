import Home from './../pages/Home.vue';
import Cursos from './../pages/Cursos.vue';
import Register from './../pages/Register.vue';
import Login from './../pages/Login.vue';
import MiPerfil from './../pages/MiPerfil.vue';
import UsuarioPerfil from './../pages/UsuarioPerfil.vue';
import ChatPrivado from './../pages/ChatPrivado.vue';
import PanelAdmin from './../pages/PanelAdmin.vue';
import PerfilAdmin from './../pages/PerfilAdmin.vue';
import CursoEditar from './../pages/CursoEditar.vue';
import CursoNuevo from './../pages/CursoNuevo.vue';
import Error from './../pages/404.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { suscribeToAuth, checkAdminAccess } from '../services/auth.js';

const routes = [
    { 
        path: '/',
        component: Home,  
        meta: { title: 'Inicio' } 
    },
    { 
        path: '/cursos',              
        component: Cursos, 
        meta: { title: 'Cursos' } 
    },
    { 
        path: '/registro',            
        component: Register,
        meta: { title: 'Registro' } 
    },
    { 
        path: '/iniciar-sesion',      
        component: Login,
        meta: { title: 'Iniciar Sesión' }
    },
    { 
        path: '/perfil',              
        component: MiPerfil,        
        meta: {
            requiresAuth: true,
            title: 'Mi Perfil'
        }, 
    },
    { 
        path: '/usuario/:id',         
        component: UsuarioPerfil,   
        meta: {
            requiresAuth: true,
            title: 'Perfil de Usuario'
        }, 
    },
    { 
        path: '/usuario/:id/chat',    
        component: ChatPrivado,     
        meta: {
            requiresAuth: true
        }, 
    },
    { 
        path: '/panel-admin',    
        component: PanelAdmin,     
        meta: {
            requiresAuth: true,
            requiresAdmin: true,
        }, 
    },
    { 
        path: '/perfil-admin',    
        component: PerfilAdmin,     
        meta: {
            requiresAuth: true,
            requiresAdmin: true,
        }, 
    },
    { 
        path: '/curso/:id/editar',    
        component: CursoEditar,     
        meta: {
            requiresAuth: true,
            requiresAdmin: true,
        }, 
    },
    { 
        path: '/curso/nuevo',    
        component: CursoNuevo,     
        meta: {
            requiresAuth: true,
            requiresAdmin: true,
        }, 
    },
    { 
        path: '/404', 
        component: Error,
        meta: {
            title: 'Página no encontrada'
        }, 
    },
    { path: '/:catchAll(.*)', redirect: '/404' },
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
    document.title = to.meta.title || 'English Lessons';
    
    if(usuario.id === null && to.meta.requiresAuth){
        return '/iniciar-sesion';
    }

    if(!checkAdminAccess() && to.meta.requiresAdmin){
        return '/iniciar-sesion';
    }
});

export default router;