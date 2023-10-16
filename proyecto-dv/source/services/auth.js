import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, } from "firebase/auth";
import { auth } from "./firebase";
import { createUserProfile } from './user.js';

let userData = {
    id: null,
    email: null,
    rol: null,
}

let observers = [];

if(localStorage.getItem('user')) {
    userData = JSON.parse(localStorage.getItem('user'));
}

onAuthStateChanged(auth, user => {
    if(user) {
        setUserData({
            id: user.uid,
            email: user.email,
            rol: user.rol,
        });
        localStorage.setItem('user', JSON.stringify(userData));
    } else {
        clearUserData();
        localStorage.removeItem('user')
    }
})

export async function register({email, password, rol = 'user'}) {
    try {
        const userCredentials =  await createUserWithEmailAndPassword(auth, email, password);

        createUserProfile(userCredentials.user.uid, {email, rol});

        return {
            id: userCredentials.user.uid,
            email: userCredentials.user.email,
            rol: userCredentials.user.rol,
        }
    } catch (error) {
        return {
            code: error.code,
            message: error.message
        }
    }
}

export function login ({email, password}) {
    return signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            return {...userData};
        })
        .catch(error => {
            return {
                code: error.code,
                message: error.message
            }
        });
}

export function logout() {
    return signOut(auth);
}

export function suscribeToAuth(observer) {
    observers.push(observer);
    notify(observer);
    return () => {
        observers = observers.filter(obs => obs !== observer);
    }
}

function notifyAll() {
    observers.forEach(observer => notify(observer));
}

function notify(observer) {
    observer({...userData});
}

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

export function getUserData()
{
    return {...userData};
}