import { setDoc, getDoc, doc, where, getDocs, collection, query  } from "firebase/firestore";
import { db } from "./firebase.js";

export async function getUserById(id) {
    const userRef = doc(db, "usuarios", id);
    const user = await getDoc(userRef);
    
    if (!user.exists()) {
        throw new Error("[users.js getUserById] El usuario no existe");
    }
    
    return {
        id: user.id,
        ...user.data(),
    };
}

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

export async function getUsersByRol(rol) {
    const usuariosRef = collection(db, "usuarios");
    const q = query(usuariosRef, where("rol", "==", rol));
    const usuariosSnapshot = await getDocs(q);
    
    return usuariosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
}