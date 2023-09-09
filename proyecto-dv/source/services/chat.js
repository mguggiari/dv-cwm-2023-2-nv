import { db } from "./firebase.js";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

const refChat = collection(db, 'chats');

export function chatGuardarMensaje(data) {
    return addDoc(refChat, data);
}

export function chatArmadoMensajes(callback) {
    onSnapshot(refChat, snapshot =>{
        const data = snapshot.docs.map(doc => {
            return {
                usuario: doc.data().usuario,
                mensaje: doc.data().mensaje,
            };
        });
        callback(data);
    });
}
