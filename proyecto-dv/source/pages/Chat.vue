<script>
import {chatArmadoMensajes, chatGuardarMensaje} from '../services/chat.js';
import { dateToString } from '../helpers/date.js';
import PrimaryButton from '../components/PrimaryButton.vue';
import PrimaryInput from '../components/PrimaryInput.vue';
import PrimaryTextarea from '../components/PrimaryTextarea.vue';
import Loader from '../components/Loader.vue';

export default {
    name: "Chat",
    components: { PrimaryButton, PrimaryInput, PrimaryTextarea, Loader },
    data() {
        return {
            mensajesCargando: true,
            mensajes: [],
            nuevoMensajeGuardado: false,
            nuevoMensaje: {
                usuario: '',
                mensaje: ''
            }
        };
    },
    methods: {
        enviarMensaje() {
            if (this.nuevoMensajeGuardado) return;

            this.nuevoMensajeGuardado = true;
            chatGuardarMensaje({
                usuario: this.nuevoMensaje.usuario,
                mensaje: this.nuevoMensaje.mensaje
            })
                .then(() => {
                    this.nuevoMensaje.mensaje = '';
                    this.nuevoMensajeGuardado = false;
                });
        },
        fechaFormateada(date) {
            return dateToString(date);
        }
    },
    mounted() {
        this.mensajesCargando = true;
        chatArmadoMensajes(mensajes => {
            this.mensajes = mensajes;
            this.mensajesCargando = false;
        });
    },
};
</script>

<template>
    <h1 class="text-3xl mb-4 font-bold">
        Intro a Firestore
    </h1>
    <p class="mb-3">
        Leyendo los mensajes del chat tiempo real
    </p>
    <div class="flex justify-between gap-4">
        <div>
            <template v-if="!mensajesCargando">
                <div v-for="mensaje in mensajes" :key="mensaje.id" class="mb-2">
                    <div><b class="mr-1.5">Usuario:</b>{{ mensaje.usuario }}</div>
                    <div><b  class="mr-1.5">Mensaje:</b>{{ mensaje.mensaje }}</div>
                    <div class="text-right"> {{ fechaFormateada(mensaje.created_at) }}</div>
                </div>
            </template>
            <template v-else>
                <Loader />
            </template>
        </div>
        <form action="#" @submit.prevent="enviarMensaje">
            <div class="mb-2">
                <!-- PASAR EL LABEL Y TITULOS A COMPONENTES -->
                <label class="block font-bold mb-2" for="usuario">Usuario</label>
                <PrimaryInput 
                    type="text"
                    id="usuario"
                    v-model="nuevoMensaje.usuario" 
                />
            </div>
            <div  class="mb-2">
                <label class="block font-bold mb-2"  for="mensaje">Mensaje</label>
                <PrimaryTextarea 
                    id="mensaje"  
                    v-model="nuevoMensaje.mensaje"
                >
                </PrimaryTextarea>
            </div>
            <PrimaryButton 
                :loading="nuevoMensajeGuardado"
            />
        </form>
    </div>
    <div id="salida"></div>
</template>