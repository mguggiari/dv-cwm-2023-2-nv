<script>
import { getUserProfileById } from '../services/user';
import Loader from '../components/Loader.vue';
import PrimaryButton from '../components/PrimaryButton.vue';

export default {
    name: "ChatPrivado",
    components: { Loader, PrimaryButton },
    data() {
        return {
            usuarioCargado: true,
            usuario: {
                id: null,
                email: null,
            }
        };
    },
    async mounted() {
        this.usuarioCargado = true;
        this.usuario = await getUserProfileById(this.$route.params.id);
        this.usuarioCargado = false;
    },
};
</script>

<template>
    <Loader v-if="usuarioCargado"/>
    <template v-else>
        <h1>Chat privado {{ usuario.email }}</h1>

        <h2>Mensajes</h2>
        <div class="min-h-[400px] p-4 border border-gray-200 rounded mb-4">
            <!-- TODO -->
        </div>

        <h2 class="sr-only">Enviar mensajes</h2>
        <form
            class="flex gap-2"
            action=""
            @submit.prevent="() => {}"
        >
            <label for="mensaje" class="sr-only">Mensaje</label>
            <textarea id="mensaje"
            class="w-11/12 resize-none"></textarea>
            <PrimaryButton class="w-1/12">Enviar</PrimaryButton>
        </form>
    </template>
</template>