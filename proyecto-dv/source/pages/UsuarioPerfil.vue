<script setup>
import { getUserProfileById } from '../services/user';
import Loader from '../components/Loader.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const usuarioCargando = ref(true);
const usuario = ref({
    id: null,
    email: null,
});

onMounted (async () => {
    usuarioCargando.value = true;
    usuario.value = await getUserProfileById(route.params.id);
    usuarioCargando.value = false;
});
</script>

<template>
    <Loader v-if="usuarioCargando" />
    <template v-else>
        <h1 class="mb-6 text-4xl font-bold leading-tight text-blue-950 md:text-4xl lg:text-5xl">Perfil de {{ usuario.email }}</h1>
        <hr>
        <h2>Conversacion privada</h2>
        <router-link
        :to="`/usuario/${usuario.id}/chat`"
        >Iniciar una Conversacion privada con {{ usuario.email }}</router-link>
    </template>
</template> 