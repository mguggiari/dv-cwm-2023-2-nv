<script>
import { getUserProfileById } from '../services/user';
import Loader from '../components/Loader.vue';

export default {
    name: "UsuarioPerfil",
    components: { Loader },
    data() {
        return {
            usuarioCargando: true,
            usuario: {
                id: null,
                email: null,
            }
        }
    },
    async mounted() {
        this.usuarioCargando = true;
        this.usuario = await getUserProfileById(this.$route.params.id);
        this.usuarioCargando = false;
    },
};
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