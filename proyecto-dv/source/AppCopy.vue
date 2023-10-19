<script>
import Chat from './pages/Chat.vue';
import { suscribeToAuth, logout } from './services/auth.js';

export default {
    name: "App",
    components: { Chat },
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
    <header>
        <nav class="bg-neutral-300">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 items-center justify-between">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <img :src="getImagenUrl('nombre.png')" alt="RoyalEnglishLogo" class="w-16 mx-auto"/>
                        </div>
                        <div class="hidden md:block">
                            <div class="ml-10 flex items-baseline space-x-4">
                                <ul class="flex gap-4 justify-center items-center mt-4">
                                    <li>
                                        <router-link to="/" class="text-blue-900 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-semibold">Inicio</router-link>
                                    </li>
                                    <li>
                                        <router-link to="/cursos" class="text-blue-900 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-semibold">Cursos</router-link>
                                    </li>
                                    <li v-if="user.id === null">
                                        <router-link to="/iniciar-sesion" class="text-blue-900 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-semibold">Iniciar Sesión</router-link>
                                    </li>
                                    <li v-if="user.id === null">
                                        <router-link to="/registro" class="text-blue-900 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-semibold">Registrarse</router-link>
                                    </li>
                                    <li v-if="user.id !== null">
                                        <router-link to="/chat" class="text-blue-900 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-semibold">Chat</router-link>
                                    </li>
                                    <li v-if="user.rol == 'admin'">
                                        <router-link to="/panel-admin" class="text-blue-900 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-semibold">Panel de Admin</router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-4 flex items-center md:ml-6">
                            <li v-if="user.id !== null">
                                <router-link to="/perfil" class="text-blue-900 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-semibold">Mi Perfil</router-link>
                            </li> 
                            <li v-if="user.id !== null">
                                <form action="" @submit.prevent="handleLogout">
                                    <button type="submit" class="text-blue-900 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-semibold">{{ user.email }}Cerrar Sesión</button>
                                </form>
                            </li>
                        </div>
                    </div>
                    <div class="-mr-2 flex md:hidden">
                        <!-- Mobile menu button -->
                        <button 
                            type="button" 
                            class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-controls="mobile-menu" 
                            aria-expanded="false"
                            @click="toggleMobileMenu"
                        >
                        <span class="absolute -inset-0.5"></span>
                        <span class="sr-only">Open main menu</span>
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
            <!-- Mobile menu  -->
            <div class="md:hidden" id="mobile-menu" v-show="mobileMenuOpen">
                <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3" v-show="mobileMenuOpen">
                    <ul class="flex gap-4 justify-center items-center mt-4">
                                    <li>
                                        <router-link to="/" class="text-blue-900 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-semibold">Inicio</router-link>
                                    </li>
                                    <li>
                                        <router-link to="/cursos" class="text-blue-900 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-semibold">Cursos</router-link>
                                    </li>
                                    <li v-if="user.id === null">
                                        <router-link to="/iniciar-sesion" class="text-blue-900 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-semibold">Iniciar Sesión</router-link>
                                    </li>
                                    <li v-if="user.id === null">
                                        <router-link to="/registro" class="text-blue-900 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-semibold">Registrarse</router-link>
                                    </li>
                                    <li v-if="user.id !== null">
                                        <router-link to="/chat" class="text-blue-900 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-semibold">Chat</router-link>
                                    </li>
                                    <li v-if="user.rol == 'admin'">
                                        <router-link to="/panel-admin" class="text-blue-900 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-semibold">Panel de Admin</router-link>
                                    </li>
                                </ul>
                </div>
                <div class="border-t border-gray-700 pb-3 pt-4">
                    <div class="flex items-center px-5">
                        <div class="flex-shrink-0">
                            <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                        </div>
                        <div class="ml-3">
                            <div class="text-base font-medium leading-none text-white">Tom Cook</div>
                            <div class="text-sm font-medium leading-none text-gray-400">tom@example.com</div>
                        </div>
                        <button type="button" class="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span class="absolute -inset-1.5"></span>
                            <span class="sr-only">View notifications</span>
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                            </svg>
                        </button>
                    </div>
                    <div class="mt-3 space-y-1 px-2">
                        <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Your Profile</a>
                        <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Settings</a>
                        <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Sign out</a>
                    </div>
                </div>
            </div>
        </nav>
    </header> 
    
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <router-view></router-view>
    </div>

    <footer class="flex justify-center h-[100px] items-center text-white bg-blue-950">
        <p class="p-4">
            Barco, Cecilia && Guggiari, Micaela &copy; 2023 || Clientes Web Mobile || Santiago Gallino
        </p>
    </footer> 
</template>