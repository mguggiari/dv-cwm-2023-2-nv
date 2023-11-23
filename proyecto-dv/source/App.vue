<script setup>
import { provide, readonly, ref } from 'vue';
import { useRouter } from 'vue-router';
import { logout } from './services/auth.js';
import { useAuth } from './composition/useAuth.js';
import { notificacionSymbol } from './symbols/symbols';

const notificacion = ref({
    mensaje: null,
    type: 'success'
});

function setNotificacion(data){
    notificacion.value = data;
}

provide(notificacionSymbol, {
    notificacion: readonly(notificacion),
    setNotificacion,
    setNotificacionSuccess: mensaje => setNotificacion({ mensaje, type: 'success' }),
    setNotificacionError: mensaje => setNotificacion({ mensaje, type: 'error' }),
});

const { handleLogout } = useLogout();
const { user } = useAuth();
const { mobileMenuOpen, toggleMobileMenu } = useMobileMenu();

function useLogout(){
    const router = useRouter();
    const handleLogout = () => {
        logout();
        router.push('/iniciar-sesion');
    };

    return { handleLogout };
}

function useMobileMenu(){
    const mobileMenuOpen = ref(false);
    const toggleMobileMenu = () => {
        mobileMenuOpen.value = !mobileMenuOpen.value;
    };

    return { mobileMenuOpen, toggleMobileMenu };
}

const { adminMenuOpen, toggleAdminMenu } = useAdminMenu(); // Nueva función para el menú admin

function useAdminMenu(){
    const adminMenuOpen = ref(false);
    const toggleAdminMenu = () => {
        adminMenuOpen.value = !adminMenuOpen.value;
    };

    // Cerrar el menú admin al hacer clic fuera de él
    const closeAdminMenu = () => {
        adminMenuOpen.value = false;
    };

    return { adminMenuOpen, toggleAdminMenu, closeAdminMenu };
}
</script>

<template>
    <header class="z-30">
        <nav class="bg-neutral-100">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 items-center justify-between">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <a href="/">
                                <img src="/imagenes/logo.png" alt="Royal English" class="w-16 mx-auto"/>
                            </a>
                        </div>
                        <div class="hidden md:block">
                            <div class="ml-10 flex items-baseline space-x-4">
                                <router-link to="/" class="text-blue-950 hover:bg-neutral-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Inicio</router-link>
                                <router-link to="/cursos" class="text-blue-950 hover:bg-neutral-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Cursos</router-link>
                                <router-link v-if="user.id === null" to="/iniciar-sesion" class="text-blue-950 hover:bg-neutral-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Iniciar Sesión</router-link>
                                <router-link v-if="user.id === null" to="/registro" class="text-blue-950 hover:bg-neutral-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Registrarse</router-link>
                                <div class="relative" v-if="user.rol == 'admin'">
                                    <button 
                                        type="button" 
                                        class="text-blue-950 hover:bg-neutral-400 hover:text-white  rounded-md px-3 py-2 text-base font-medium inline-flex items-center gap-x-1 " 
                                        aria-expanded="false"
                                        @click="toggleAdminMenu"
                                    >
                                        Panel Admin
                                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                    <div 
                                        class="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4"
                                        v-show="adminMenuOpen" 
                                        @click="closeAdminMenu"
                                    >
                                        <div class="w-64 max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                                            <div class="p-4">
                                                <div class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                                    <a href="/panel-productos" class="font-semibold text-gray-900">
                                                        Cursos
                                                        <span class="absolute inset-0"></span>
                                                    </a>
                                                </div>
                                                <div class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                                    <a href="/panel-usuarios" class="font-semibold text-gray-900">
                                                        Usuarios
                                                        <span class="absolute inset-0"></span>
                                                    </a>
                                                </div>
                                                <div class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                                    <a href="/panel-reservas" class="font-semibold text-gray-900">
                                                        Reservas
                                                        <span class="absolute inset-0"></span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-4 flex items-center md:ml-6">
                            <router-link v-if="user.id !== null && user.rol == 'user'" to="/perfil" class="text-blue-950 hover:bg-neutral-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Mi Perfil</router-link>
                            <div v-if="user.id !== null">
                                <form action="#" @submit.prevent="handleLogout">
                                    <button type="submit" class="text-blue-950 hover:bg-neutral-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium">{{ user.email }} Cerrar Sesión</button>
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
                <div class="relative" v-if="user.rol == 'admin'">
                    <button type="button" class="text-blue-950 hover:bg-neutral-400 hover:text-white rounded-md px-3 py-2 text-base font-medium inline-flex" aria-controls="disclosure-1" aria-expanded="false" @click="toggleAdminMenu">
                        Panel Admin
                        <svg class="h-5 w-5 flex-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                        </svg>
                    </button>
                    <div 
                        class="mt-2 space-y-2" 
                        id="disclosure-1" 
                        v-show="adminMenuOpen" 
                        @click="closeAdminMenu"
                    >
                        <a href="/panel-productos" class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Productos</a>
                        <a href="/panel-usuarios" class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Usuarios</a>
                        <a href="/panel-reservas" class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Reservas</a>
                    </div>   
                </div>
            </div>
            <div v-if="(user.id !== null && user.rol == 'user') || (user.id !== null && user.rol == 'admin') " class="border-t border-gray-700 pb-3 pt-4">
                <div class="mt-3 space-y-1 px-2">
                    <router-link v-if="user.id !== null && user.rol == 'user'" to="/perfil" class="text-blue-950 hover:bg-neutral-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Mi Perfil</router-link>
                    <div v-if="user.id !== null">
                        <form action="#" @submit.prevent="handleLogout">
                            <button type="submit" class="text-blue-950 hover:bg-neutral-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium"> <span> {{ user.email }} </span> Cerrar Sesión</button>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </nav>
    </header>
    <div>
        <div
            v-if="notificacion.mensaje != null"
            class="bg-green-200 text-black text-center py-2 px-4 rounded-md"
        >
            {{ notificacion.mensaje }}
        </div>
        <router-view></router-view>
    </div>
    <footer class="flex justify-center h-[100px] items-center text-white bg-blue-950">
        <p class="p-4">
            Barco, Cecilia && Guggiari, Micaela &copy; 2023 || Clientes Web Mobile || Santiago Gallino
        </p>
    </footer> 
</template>