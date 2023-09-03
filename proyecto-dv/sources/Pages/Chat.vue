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
    <h1>Intro a Firestore</h1>

    <p>Leyendo los mensajes del chat tiempo real</p>

    <form action="#" @submit.prevent="enviarMensaje">
        <div>
            <label for="usuario">Usuario</label>
            <input type="text" id="usuario" v-model="nuevoMensaje.usuario">
        </div>
        <div>
            <label for="mensaje">Mensaje</label>
            <textarea id="mensaje" v-model="nuevoMensaje.mensaje"></textarea>
        </div>
        <button type="submit">Enviar</button>
    </form>

    <div>
        <h2>Mensajes</h2>
        <ul>
            <li v-for="mensaje in mensajes">
                <strong>{{mensaje.usuario}}:</strong> {{mensaje.mensaje}}
            </li>
        </ul>
    </div>

    <div id="salida"></div>
</template>