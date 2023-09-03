// import { chatGuardarMensaje, chatArmadoMensajes } from "./sources/services/chat.js";

// const salida = document.querySelector('#salida');
// const formChat = document.querySelector('#form-chat');
// const usuario = document.querySelector('#usuario');
// const mensaje = document.querySelector('#mensaje');

// formChat.addEventListener('submit', function(ev) {
//     ev.preventDefault();

//     const data = {
//       usuario: usuario.value,
//       mensaje: mensaje.value,
//     }

//     chatGuardarMensaje(data)
//       .then(() =>{
//         usuario.value = '';
//         mensaje.value = '';
//       });
// });

// chatArmadoMensajes(mensajes =>{
//   salida.innerHTML = mensajes.map(mensaje => 
//       `<div>
//           <div><b>Usuario:</b> ${mensaje.usuario}</div>
//           <div><b>Mensaje:</b> ${mensaje.mensaje}</div>
//       </div>`
//   ).join('');
// })

import {createApp} from 'vue';
import App from './sources/App.vue';

const app = createApp(App);
app.mount('#app');