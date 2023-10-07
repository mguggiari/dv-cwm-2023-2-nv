<script>
import Chat from './pages/Chat.vue';
import { suscribeToAuth, logout } from './services/auth.js';

export default {
    name: "App",
    components: {Chat},
    data() {
        return{
            user: {
                id: null,
                email: null,
            }
        }
    },
    methods: {
        handleLogout(){
            logout();
            this.$router.push('/iniciar-sesion');
        }
    },
    mounted() {
        suscribeToAuth (user =>{
            this.user = {...user};
        });
    }
};
</script>

<template>
    <header class="bg-neutral-200">
        <div>
            <p class="text-xl">EnglishCourse</p>
        </div>
        <nav>
            <ul class="flex gap-4">
                <li>
                    <router-link to="/">Inicio</router-link>
                </li>
                <li>
                    <router-link to="/cursos">Cursos</router-link>
                </li>
                <template v-if="user.id === null">
                    <li>
                    <router-link to="/iniciar-sesion">Iniciar Sesión</router-link>
                    </li>
                    <li>
                        <router-link to="/registro">Registrarse</router-link>
                    </li>
                </template>
                <template v-else>
                    <li>
                        <router-link to="/chat">Chat</router-link>
                    </li>
                    <li>
                        <router-link to="/perfil">Mi Perfil</router-link>
                    </li>
                    <li>
                        <form action="" @submit.prevent="handleLogout">
                            <button type="submit">{{ user.email }}Cerrar Sesión</button>
                        </form>
                    </li>
                </template>
            </ul>
        </nav>
    </header>
    <div>
        <router-view></router-view>
    </div>
    <footer class="flex justify-center h-[100px] items-center text-black bg-orange-300">
        <p class="p-4">
            Foter
        </p>
    </footer> 
</template>