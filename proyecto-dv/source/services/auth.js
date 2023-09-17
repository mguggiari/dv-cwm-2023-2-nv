import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

let userData = {
    id: null,
    email: null
}
let observers = [];

/**
 * @param {{email: string, password: string}} user 
 * @returns {Promise}
 */
export function login ({email, password}) {
    return signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            //console.log("[auth.js]sesion iniciada.", userCredentials)
            setUserData({
                id: userCredentials.user.uid,
                email: userCredentials.user.email
            });
            return {...userData};
        })
        .catch(error => {
            return {
                code: error.code,
                message: error.message
            }
        });
}

/**
 * @returns {Promise}
 */
export function logout() {
    const promise = signOut(auth);
    clearUserData();
    return promise;
}

/**
 * agrega un observador(callback) para notificar los datos del estado de autenticacion
 * @param {({id: null|string, email: null|string}) => void} observer 
 */
export function suscribeToAuth(observer) {
    observers.push(observer);
    notify(observer);
}

/**
 * notifica a todos los observers de los datos de autenticacion
 */
function notifyAll() {
    observers.forEach(observer => notify(observer));
}

/**
 * notifica a un observador de los datos
 * @param {({id: null|string, email: null|string}) => void} observer
 */
function notify(observer) {
    observer({...userData});
}

/**
 * @param {{id: null|string, email: null|string}} newData
 */
function setUserData(newData){
    userData = {
        ...userData,
        ...newData
    }
    notifyAll();
}

function clearUserData() {
    setUserData({
        id: null,
        email: null
    });
}