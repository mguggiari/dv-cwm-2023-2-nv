import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth";
import { auth } from "./firebase";
import { createUserProfile, getUserById, updateUserProfile } from './user.js';
import { uploadFile, getFileUrl } from "../services/file-storage";

let userData = {
    id: null,
    email: null,
    rol: null,
    displayName: null,
    photoUrl: null,
    fullProfileLoaded: false,
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
            displayName: user.displayName,
            photoUrl: user.photoURL,
        });
        getUserById(user.uid).then((userData) => {
            setUserData({
                fullProfileLoaded: true,
                ...userData
            });
        });
        //console.log(userData, '[linea23]');  
    } else {
        clearUserData();
        localStorage.removeItem('user');
    }
})

export function checkAdminAccess() {
    const user = getUserData(); 
    return user.rol === 'admin';
}

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
            throw error;
            // return {
            //     code: error.code,
            //     message: error.message
            // }
        });
}

export async function editProfile({displayName, photoUrl}) {
    try {
        const data = {};
        if(displayName !== undefined) data.displayName = displayName;
        if(photoUrl !== undefined) data.photoUrl = photoUrl;

        //firebase 
        const promiseAuth = updateProfile(auth.currentUser, data);
    
        //firestore
        const promiseProfile = updateUserProfile(userData.id, data);
    
        await Promise.all([promiseAuth, promiseProfile]);

        setUserData(data);
    } catch (error) {
        throw error;
    }
}

export async function editProfilePhoto(file) {
    const path = `users/${userData.id}/foto`;
    await uploadFile(path, file);
    const photoUrl = await getFileUrl(path);

    return editProfile({photoUrl});
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
    localStorage.setItem('user', JSON.stringify(userData));
    notifyAll();
}

function clearUserData() {
    setUserData({
        id: null,
        email: null,
        rol: null,
        displayName: null,
        photoUrl: null,
        fullProfileLoaded: false,
    });
    localStorage.removeItem('user');
}

export function getUserData()
{
    return {...userData};
}