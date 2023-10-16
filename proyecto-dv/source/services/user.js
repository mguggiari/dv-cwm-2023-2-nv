import { setDoc, getDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "./firebase.js";

export async function getUserProfileById(id){
    if(id !== null && id !== '') {
        const refUsuario = doc(db, `usuarios/${id}`);
        const snapshot = await getDoc(refUsuario);

        return {
            id: snapshot.id,
            email: snapshot.data().email,
            rol: snapshot.data().rol,
        }
    } else {
        console.log('getUserProfileById: id es null o vacio');
    }
}

export async function createUserProfile(id, data){
    const refUsuario = doc(db, `usuarios/${id}`);
    return setDoc(refUsuario, {...data});
}