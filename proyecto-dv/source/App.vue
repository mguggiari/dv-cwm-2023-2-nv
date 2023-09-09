<script>
import Chat from './pages/Chat.vue';

export default {
    name: "App",
    components: {Chat}
};
</script>

<template>
    <header class="flex p-4 gap-8 items-center bg-neutral-200">
        <div>
            <p class="text-xl">Aca nombre de la pagina</p>
        </div>
        <nav>
            <ul class="flex gap-4">
                <li>
                    <router-link to="/">Inicio</router-link>
                </li>
                <li>
                    <router-link to="/sobre-nosotros">Sobre Nosotros</router-link>
                </li>
                <li>
                    <router-link to="/chat">Chat</router-link>
                </li>
                <li>
                    <router-link to="/iniciar-sesion">Iniciar Sesión</router-link>
                </li>
                <li>
                    <router-link to="/registro">Registro</router-link>
                </li>
            </ul>
        </nav>
    </header>
    <div class="container h-full m-auto p-4">
        <router-view></router-view>
    </div>
    <footer class="flex justify-center h-[100px] items-center text-black bg-orange-300">
        <p class="p-4">
            Foter
        </p>
    </footer>
</template>