import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, } from "firebase/auth";
import { auth } from "./firebase";

let userData = {
    id: null,
    email: null,
    //displayName: null,
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
        });
        localStorage.setItem('user', JSON.stringify(userData));
    } else {
        clearUserData();
        localStorage.removeItem('user')
    }
})

export async function register({email, password}) {
    try {
        const userCredentials =  await createUserWithEmailAndPassword(auth, email, password);
        createUserProfile(userCredentials.user.uid, {email});
        return {
            id: userCredentials.user.uid,
            email: userCredentials.user.email,
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