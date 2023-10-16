import { addDoc, collection, query, where, serverTimestamp, limit, getDocs, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./firebase.js";

const chatPrivadoRefCache = {};

export async function enviarMensajeChatPrivado({enviaId, recibeId, mensaje}){
    const docChatPrivado = await getDocChatPrivado({enviaId, recibeId});

    const mensajesRef = collection(db, `chat-privado/${docChatPrivado.id}/mensajes`);

    await addDoc(mensajesRef, {
        enviaId,
        mensaje,
        created_at: serverTimestamp(),
    });
    return true;
}

export async function guardarMensajeChatPrivado({enviaId, recibeId}, callback){
    const docChatPrivado = await getDocChatPrivado({enviaId, recibeId});
    
    const mensajesRef = collection(db, `chat-privado/${docChatPrivado.id}/mensajes`);

    const q = query(
        mensajesRef,
        orderBy('created_at'),
    );

    return onSnapshot(q, snapshot => {
        const mensajes = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                enviaId: doc.data().enviaId,
                mensaje: doc.data().mensaje,
                created_at: doc.data().created_at?.toDate(),
            }
        });

        callback(mensajes);
    });
}

async function getDocChatPrivado({enviaId, recibeId}){
    const cacheRef = getFromCache({enviaId, recibeId});
    if(cacheRef) {
        //console.log('chat-privado[46], retornando valor cache');
        return cacheRef;
    }

    //console.log('chat-privado[50], buscando doc del chat en firestore');
    const refChatPrivado = collection(db, 'chat-privado');

    const q = query(
        refChatPrivado, 
        where('usuarios', '==', {
            [enviaId]: true,
            [recibeId]: true,
        }),
        limit(1),
    );

    const snapshot = await getDocs(q);
    let docChatPrivado;

    if(snapshot.empty){
        docChatPrivado = await addDoc(refChatPrivado, {
            usuarios: {
                [enviaId]: true,
                [recibeId]: true
            }
        });
    } else {
        docChatPrivado = snapshot.docs[0];
    }

    addToCache({enviaId, recibeId}, docChatPrivado);

    return docChatPrivado;
}

function addToCache({enviaId, recibeId}, value) {
    chatPrivadoRefCache[getKeyForCache()] = value;
}

function getFromCache({enviaId, recibeId}) {
    return chatPrivadoRefCache[getKeyForCache()] || null;
}

function getKeyForCache({enviaId, recibeId}) {
    return enviaId + recibeId;
}