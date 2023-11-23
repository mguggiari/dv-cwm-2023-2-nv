<script setup>
import LoadingContext from '../components/LoadingContext.vue';
import { useRoute } from 'vue-router';
import { usuarioPerfil } from '../composition/useUserProfile';

const route = useRoute();
const { usuario, usuarioCargando } = usuarioPerfil(route.params.id);
</script>

<template>
    <LoadingContext :loading="usuarioCargando">
        <h1 class="mb-6 text-4xl font-bold leading-tight text-blue-950 md:text-4xl lg:text-5xl">Perfil de {{ usuario.email }}</h1>
        <hr>
        <h2>Conversación privada</h2>
        <router-link
        :to="`/usuario/${usuario.id}/chat`"
        >Iniciar una conversación privada con {{ usuario.email }}</router-link>
    </LoadingContext>
</template> 