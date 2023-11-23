<script setup>
import LoadingContext from '../components/LoadingContext.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
import PrimaryTextarea from '../components/PrimaryTextarea.vue';
import { useRoute } from 'vue-router';
import { useAuth } from '../composition/useAuth';
import { onUnmounted, ref, watch } from 'vue';
import { usuarioPerfil } from '../composition/useUserProfile';
import { enviarMensajeChatPrivado, guardarMensajeChatPrivado } from '../services/chat-privado';
import { dateToString } from '../helpers/date.js';

const route = useRoute();
const { user: usuarioAutenticado } = useAuth();
const { usuario, usuarioCargando } = usuarioPerfil(route.params.id);
const { nuevoMensaje, mensajes, mensajesCargando, manejoEnvioMsj } = useChatPrivado(usuarioAutenticado, usuario);
//console.log('usuarioAutenticado:', usuarioAutenticado);
//console.log('usuario:', usuario);

function useChatPrivado(enviaUsuario, recibeUsuario) {
    //console.log('enviaUsuario:', enviaUsuario);
    //console.log('recibeUsuario:', recibeUsuario);
    const nuevoMensaje = ref({
        mensaje: '',
    });
    const mensajesCargando = ref(true);
    const mensajes = ref([]);
    let unsuscribeMensajes = () => {};
    
    async function manejoEnvioMsj() {
        //console.log('enviaUsuario en manejoEnvioMsj:', enviaUsuario);
        //console.log('recibeUsuario en manejoEnvioMsj:', recibeUsuario);
        enviarMensajeChatPrivado({
            enviaId: enviaUsuario.value.id,
            recibeId: recibeUsuario.value.id,
            mensaje: nuevoMensaje.value.mensaje,
        });
        nuevoMensaje.value.mensaje = '';
    }
    
    watch(recibeUsuario, async nuevoRecibeUsuario => {
        if (nuevoRecibeUsuario.id !== null){
            unsuscribeMensajes = await guardarMensajeChatPrivado(
                {
                    enviaId: enviaUsuario.value.id,
                    recibeId: nuevoRecibeUsuario.id,

                }, 
                nuevosMensajes => mensajes.value = nuevosMensajes
            );
            mensajesCargando.value = false;
        }
    });

    onUnmounted(() => unsuscribeMensajes());

    return {
        nuevoMensaje,
        mensajes,
        mensajesCargando,
        manejoEnvioMsj,
    };
}
</script>

<template>
    <LoadingContext :loading="usuarioCargando">
        <div class="pb-64 m-1.5">
            <div class="max-w-7xl px-4 pt-20 mx-auto text-center sm:text-left ">
                <h1 class="mb-6 text-4xl font-bold leading-tight text-blue-950 md:text-4xl lg:text-5xl">
                    Chat privado 
                </h1>
                <p>{{ usuario.email }}</p>
                <h2 class="sr-only">Mensajes</h2>
            </div>
        </div>
        <div class="max-w-7xl pb-20 mx-auto -mt-48">
            <div class="flex flex-col items-start min-h-[400px] p-4 border border-gray-200 rounded mb-4">
                <Loader v-if="mensajesCargando" />
                <template v-else>
                    <div 
                        v-for="mensaje in mensajes" 
                        :key="mensaje.id"
                        class="max-w-[70%] p-2 rounded mb-2 "
                        :class="{
                            'bg-gray-100': mensaje.enviaId !== usuarioAutenticado.id,
                            'bg-green-100': mensaje.enviaId === usuarioAutenticado.id,
                            'self-end': mensaje.enviaId === usuarioAutenticado.id,
                        }"
                    >
                        <div>
                            {{ mensaje.mensaje }}
                        </div>
                        <div class="text-right">
                            {{ dateToString(mensaje.created_at) || 'Enviando...'}} 
                        </div>
                    </div>
                </template>
            </div>
            <h2 class="sr-only">Enviar mensajes</h2>
            <form
                class="flex gap-2"
                action="#"
                @submit.prevent="manejoEnvioMsj()"
            >
                <label for="mensaje" class="sr-only">Mensaje</label>
                <PrimaryTextarea 
                    id="mensaje"
                    class="w-8/12 md:w-11/12"
                    v-model="nuevoMensaje.mensaje"
                ></PrimaryTextarea>
                <PrimaryButton class="w-4/12 md:w-1/12">Enviar</PrimaryButton>
            </form>
        </div>
    </LoadingContext>
</template>