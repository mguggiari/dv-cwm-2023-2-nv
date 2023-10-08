import { setDoc, getDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "./firebase.js";

export async function getUserProfileById(id){
    //chequear que el id sea string y no sea nulo
    //las referencias a un doc siempre van a ser con segmentos pares url `usuarios(1)/${id}(2seg)`
    const refUsuario = doc(db, `usuarios/${id}`);
    const snapshot = await getDoc(refUsuario);

    return {
        id: snapshot.id,
        email: snapshot.data().email,
    }
}

export async function createUserProfile(id, data){
    const refUsuario = doc(db, `usuarios/${id}`);
    return setDoc(refUsuario, {...data});
}