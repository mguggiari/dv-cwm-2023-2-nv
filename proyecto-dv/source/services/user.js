import { setDoc, getDoc, doc, where, getDocs, collection, query, updateDoc, addDoc, serverTimestamp  } from "firebase/firestore";
import { db } from "./firebase.js";
import { getProductoById } from "./productos.js";

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

export async function getUserProfileById(id) {
    if(id !== null && id !== '') {
        const refUsuario = doc(db, `usuarios/${id}`);
        const snapshot = await getDoc(refUsuario);

        return {
            id: snapshot.id,
            email: snapshot.data().email,
            rol: snapshot.data().rol,
            displayName: snapshot.data().displayName,
            photoUrl: snapshot.data().photoUrl,
        }
    } else {
        console.log('getUserProfileById: id es null o vacio');
    }
}

export async function createUserProfile(id, data) {
    const refUsuario = doc(db, `usuarios/${id}`);
    return setDoc(refUsuario, {...data});
}

export async function updateUserProfile(id, data) {
    return updateDoc(
        doc(db, `usuarios/${id}`),
        {...data}
    );
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

export async function reserveProduct(productoId, usuarioId) {
    try {
        const producto = await getProductoById(productoId);
        const usuario = await getUserById(usuarioId);
        // Realizar la reserva en la colección "reservas" en Firebase
        const reservaRef = await addDoc(collection(db, 'reservas'), {
            productoReservado: producto,
            usuarioReservado: usuario,
            timestamp: serverTimestamp(),
        });
        console.log('Reserva realizada con éxito. ID:', reservaRef);
        return reservaRef.id; // Puedes devolver el ID de la reserva si es necesario
    } catch (error) {
        console.error('Error al realizar la reserva:', error.message);
        throw new Error('Error al realizar la reserva');
    }
}

export async function getReservasByUserId(usuarioId) {
    console.log('getReservasByUserId id', usuarioId);
    const reservasRef = collection(db, "reservas");
    const q = query(reservasRef, where("usuarioReservado.id", "==", usuarioId));
    const reservasSnapshot = await getDocs(q);

    console.log('getReservasByUserId reservasSnapshot', reservasSnapshot);

    return reservasSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
}

export async function getReservas(){
    const reservasRef = collection(db, "reservas");
    const reservasSnapshot = await getDocs(reservasRef);
    
    const reservas = reservasSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    //console.log('getReservas', reservas);
    
    return reservas;
}

export async function cancelarReservaById(reservaId){
    //console.log('cancelarReservaById reservaId', reservaId);
    const reservaRef = doc(db, "reservas", reservaId);
    const reservaData = updateDoc(reservaRef, {
        estado: 'cancelada',
        timestampCancelacion: serverTimestamp(),
    });
    //console.log('cancelarReservaById reservaData', reservaData);
    return reservaData;
}