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
        <h1>Perfil de {{ usuario.email }}</h1>
        <hr>
        <h2>Conversacion privada</h2>

        <router-link
        :to="`/usuario/${usuario.id}/chat`"
        >Iniciar una Conversacion privada cn {{ usuario.email }}</router-link>
    </template>
</template> 