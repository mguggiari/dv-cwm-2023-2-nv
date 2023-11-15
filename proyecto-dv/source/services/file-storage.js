import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';

export async function uploadFile(path, file) {
    const fileRef = ref(storage, path);
    return uploadBytes(fileRef, file);
}

export async function getFileUrl(path){
    return getDownloadURL(ref(storage, path));
}