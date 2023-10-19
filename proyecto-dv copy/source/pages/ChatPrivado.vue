<script>
import { getUserProfileById } from '../services/user';
import { enviarMensajeChatPrivado, guardarMensajeChatPrivado } from '../services/chat-privado';
import { suscribeToAuth } from '../services/auth';
import { dateToString } from '../helpers/date.js';
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
            },
            usuarioAutenticado:{
                id: null,
                email: null,
            },
            unsuscribeAuth: () => {},
            nuevoMensaje: {
                mensaje: '',
            }, 
            mensajesCargando: true,
            mensajes: [],
            unsuscribeMensajes: () => {},
        };
    },
    methods: {
        manejoEnvioMsj() {
            enviarMensajeChatPrivado({
                enviaId: this.usuarioAutenticado.id,
                recibeId: this.usuario.id,
                mensaje: this.nuevoMensaje.mensaje,
            });
            this.nuevoMensaje.mensaje = '';
        },
        fechaFormateada(date) {
            return dateToString(date);
        }
    },
    async mounted() {
        this.usuarioCargado = true;
        this.usuario = await getUserProfileById(this.$route.params.id);
        this.unsuscribeAuth = suscribeToAuth(nuevoUsuario => this.usuarioAutenticado = nuevoUsuario);
        this.usuarioCargado = false;
        this.mensajesCargando = true;
        this.unsuscribeMensajes = await guardarMensajeChatPrivado(
            {
                enviaId: this.usuarioAutenticado.id,
                recibeId: this.usuario.id,
            },
            (nuevosMensajes) => this.mensajes = nuevosMensajes
        );
        this.mensajesCargando = false;
    },
    unmounted() {
        this.unsuscribeAuth();
        this.unsuscribeMensajes();
    },
};
</script>

<template>
    <Loader v-if="usuarioCargado"/>
    <template v-else>
        <h1>Chat privado {{ usuario.email }}</h1>
        <h2 class="sr-only">Mensajes</h2>
        <div class="flex flex-col items-start min-h-[400px] p-4 border border-gray-200 rounded mb-4">
            <Loader v-if="mensajesCargando" />
            <template v-else>
                <div 
                    v-for="mensaje in mensajes" 
                    :key="mensaje.id"
                    class="max-w-[70%] p-2 rounded mb-2 "
                    :class="{
                        'bg-gray-100': mensaje.senderId !== usuarioAutenticado.id,
                        'bg-green-100': mensaje.senderId === usuarioAutenticado.id,
                        'self-end': mensaje.senderId === usuarioAutenticado.id,
                    }"
                >
                    <div>
                        {{ mensaje.mensaje }}
                    </div>
                    <div class="text-right">
                        {{ fechaFormateada(mensaje.created_at) || 'Enviando...'}} 
                    </div>
                </div>
            </template>
        </div>

        <h2 class="sr-only">Enviar mensajes</h2>
        <form
            class="flex gap-2"
            action=""
            @submit.prevent="manejoEnvioMsj()"
        >
            <label for="mensaje" class="sr-only">Mensaje</label>
            <textarea 
                id="mensaje"
                class="w-11/12 resize-none"
                v-model="nuevoMensaje.mensaje"
            ></textarea>
            <PrimaryButton class="w-1/12">Enviar</PrimaryButton>
        </form>
    </template>
</template>