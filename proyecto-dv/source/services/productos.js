import { db } from "./firebase.js";
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

const refProducto = collection(db, "productos");

export async function getProductos() {
    const q = query(refProducto, orderBy('created_at'));
    try {
        const snapshot = await getDocs(q);
        const productos = snapshot.docs.map((doc) => {
            const productoData = doc.data();
            const productoId = doc.id;
            return { 
                id: productoId, 
                ...productoData 
            };
        });
        console.log(productos);
        return productos;
    } catch (error) {
        return {
            code: error.code,
            message: error.message
        }
    }
}

