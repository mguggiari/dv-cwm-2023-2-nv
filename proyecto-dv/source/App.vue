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
        <div class="bg-neutral-200 ">
            <img :src="getImagenUrl('nombre.png')" alt="Logotipo" class="w-16 mx-auto"/>
        </div>
        <nav class="text-center">
            <ul class="flex gap-4 justify-center items-center mt-4">
                <li>
                    <router-link to="/" class="text-blue-900 font-semibold">Inicio</router-link>
                </li>
                <li>
                    <router-link to="/cursos" class="text-blue-900 font-semibold">Cursos</router-link>
                </li>
                    <li v-if="user.id === null">
                        <router-link to="/iniciar-sesion" class="text-blue-900 font-semibold">Iniciar Sesión</router-link>
                    </li>
                    <li v-if="user.id === null">
                        <router-link to="/registro" class="text-blue-900 font-semibold">Registrarse</router-link>
                    </li>
                    <li v-if="user.id !== null">
                        <router-link to="/chat" class="text-blue-900 font-semibold">Chat</router-link>
                    </li>
                    <li v-if="user.rol == 'admin'">
                        <router-link to="/panel-admin" class="text-blue-900 font-semibold">Admin</router-link>
                    </li>
                    <li v-if="user.rol == 'admin'">
                        <router-link to="/perfil-admin" class="text-blue-900 font-semibold">Perfil Admin</router-link>
                    </li>
                    <li v-if="user.id !== null && user.rol == 'user'">
                        <router-link to="/perfil" class="text-blue-900 font-semibold">Mi Perfil Cliente</router-link>
                    </li> 
                    <li v-if="user.id !== null">
                        <form action="" @submit.prevent="handleLogout">
                            <button type="submit" class="text-blue-900 font-semibold">{{ user.email }}Cerrar Sesión</button>
                        </form>
                    </li>
            </ul>
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