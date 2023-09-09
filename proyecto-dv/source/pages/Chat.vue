<script>
    import {chatArmadoMensajes, chatGuardarMensaje} from '../services/chat.js';
    export default {
        name: "Chat",
        data() {
            return {
                mensajes: [],
                nuevoMensaje: {
                    usuario: '',
                    mensaje: ''
                }
            }
        },
        methods: {
            enviarMensaje() {
                chatGuardarMensaje({
                    usuario: this.nuevoMensaje.usuario,
                    mensaje: this.nuevoMensaje.mensaje
                })
                    .then(() => {
                        this.nuevoMensaje.mensaje = '';
                    });
            }
        },
        mounted() {
            chatArmadoMensajes(mensajes => {
                this.mensajes = mensajes;
            });
        }
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
            <div  class="mb-2"  v-for="mensaje in mensajes" >
                <div><b>Usuario</b>{{mensaje.usuario}}</div>
                <div><b>Mensaje</b>{{mensaje.mensaje}}</div>
            </div>
        </div>
        <form action="#" @submit.prevent="enviarMensaje">
            <div class="mb-2">
                <label class="block font-bold mb-2" for="usuario">Usuario</label>
                <input class="w-full p-2 border border-slate-400 rounded" type="text" id="usuario" v-model="nuevoMensaje.usuario">
            </div>
            <div  class="mb-2">
                <label class="block font-bold mb-2"  for="mensaje">Mensaje</label>
                <textarea id="mensaje" class="w-full border border-slate-400 rounded" v-model="nuevoMensaje.mensaje"></textarea>
            </div>
            <button class="bg-cyan-900 text-white p-2 rounded w-full" type="submit">Enviar</button>
        </form>
    </div>
    <div id="salida"></div>
</template>