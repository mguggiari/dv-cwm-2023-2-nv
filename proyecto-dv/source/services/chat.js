import { db } from "./firebase.js";
import { addDoc, collection, onSnapshot, serverTimestamp, query, orderBy } from "firebase/firestore";

const refChat = collection(db, 'chats');

export function chatGuardarMensaje(data) {
    return addDoc(refChat, {
        ...data,
        //le pide a firebase que use la fecha y hora del servidor al momento de almanecar los datos 
        created_at: serverTimestamp(),
    });
}

export function chatArmadoMensajes(callback) {
    const q = query(refChat, orderBy('created_at'));
    
    return  onSnapshot(q, snapshot =>{
        const data = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                usuario: doc.data().usuario,
                mensaje: doc.data().mensaje,
                created_at: doc.data().created_at.toDate(),
            };
        });
        
        callback(data);
    });
}
