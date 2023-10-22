<script>
import { suscribeToAuth, logout } from './services/auth.js';

export default {
    name: "App",
    data() {
        return{
            user: {
                id: null,
                email: null,
                rol: null,
            },
            mobileMenuOpen: false,
        }
    },
    methods: {
        handleLogout(){
            logout();
            this.$router.push('/iniciar-sesion');
        },
        getImagenUrl(nombreImagen) {
            return `/imagenes/${nombreImagen}`;
        },
        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
        },
    },
    mounted() {
        suscribeToAuth (user =>{
            this.user = {...user};
        });
    }
};
</script>

<template>
    <header class="z-30">
        <nav class="bg-neutral-100">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 items-center justify-between">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <a href="/">
                                <img :src="getImagenUrl('logo.png')" alt="Logotipo" class="w-16 mx-auto"/>
                            </a>
                        </div>
                        <div class="hidden md:block">
                            <div class="ml-10 flex items-baseline space-x-4">
                                <router-link to="/" class="text-blue-950 hover:bg-neutral-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Inicio</router-link>
                                <router-link to="/cursos" class="text-blue-950 hover:bg-neutral-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Cursos</router-link>
                                <router-link v-if="user.id === null" to="/iniciar-sesion" class="text-blue-950 hover:bg-neutral-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Iniciar Sesión</router-link>
                                <router-link v-if="user.id === null" to="/registro" class="text-blue-950 hover:bg-neutral-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Registrarse</router-link>
                                <router-link v-if="user.rol == 'admin'" to="/panel-admin" class="text-blue-950 hover:bg-neutral-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Administracion Productos</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-4 flex items-center md:ml-6">
                            <router-link v-if="user.rol == 'admin'" to="/perfil-admin" class="text-blue-950 hover:bg-neutral-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Perfil</router-link>
                            <router-link v-if="user.id !== null && user.rol == 'user'" to="/perfil" class="text-blue-950 hover:bg-neutral-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Mi Perfil Cliente</router-link>
                            <div v-if="user.id !== null">
                                <form action="" @submit.prevent="handleLogout">
                                    <button type="submit" class="text-blue-950 hover:bg-neutral-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium">{{ user.email }}Cerrar Sesión</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="-mr-2 flex md:hidden">
                        <!-- Mobile menu button -->
                        <button 
                            type="button" 
                            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 focus:ring-offset-blue-900" 
                            aria-controls="mobile-menu" 
                            aria-expanded="false" 
                            @click="toggleMobileMenu"
                            >
                            <span class="absolute -inset-0.5"></span>
                            <span class="sr-only">abre el menu</span>
                            <!-- Menu open: "hidden", Menu closed: "block" -->
                            <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <!-- Menu open: "block", Menu closed: "hidden" -->
                            <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <!-- Mobile menu -->
            <div class="md:hidden" id="mobile-menu" v-show="mobileMenuOpen">
            <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3" v-show="mobileMenuOpen">
                <router-link to="/" class="text-blue-950 hover:bg-neutral-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Inicio</router-link>
                <router-link to="/cursos" class="text-blue-950 hover:bg-neutral-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Cursos</router-link>
                <router-link v-if="user.id === null" to="/iniciar-sesion" class="text-blue-950 hover:bg-neutral-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Iniciar Sesión</router-link>
                <router-link v-if="user.id === null" to="/registro" class="text-blue-950 hover:bg-neutral-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Registrarse</router-link>
                <router-link v-if="user.rol == 'admin'" to="/panel-admin" class="text-blue-950 hover:bg-neutral-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Admin</router-link>
            </div>
            <div v-if="(user.id !== null && user.rol == 'user') || (user.id !== null && user.rol == 'admin') " class="border-t border-gray-700 pb-3 pt-4">
                <div class="mt-3 space-y-1 px-2">
                    <router-link v-if="user.rol == 'admin'" to="/perfil-admin" class="text-blue-950 hover:bg-neutral-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Perfil Admin</router-link>
                    <router-link v-if="user.id !== null && user.rol == 'user'" to="/perfil" class="text-blue-950 hover:bg-neutral-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Mi Perfil</router-link>
                    <div v-if="user.id !== null">
                        <form action="" @submit.prevent="handleLogout">
                            <button type="submit" class="text-blue-950 hover:bg-neutral-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium"> <span> {{ user.email }} </span> Cerrar Sesión</button>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </nav>
    </header>
    <div>
        <router-view></router-view>
    </div>
    <footer class="flex justify-center h-[100px] items-center text-white bg-blue-950">
        <p class="p-4">
            Barco, Cecilia && Guggiari, Micaela &copy; 2023 || Clientes Web Mobile || Santiago Gallino
        </p>
    </footer> 
</template>