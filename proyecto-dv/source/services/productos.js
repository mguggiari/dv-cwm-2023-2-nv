import { db } from "./firebase.js";
import { collection, query, orderBy, getDocs, getDoc, doc, updateDoc, addDoc, serverTimestamp, } from 'firebase/firestore';

export async function getProductos() {
    const refProducto = collection(db, "productos");
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

export async function getProductoById(id) {
    const productoRef = doc(db, "productos", id);
    const producto = await getDoc(productoRef);

    if (!producto.exists()) {
        throw new Error("[productos.js getProductoById] El producto no existe");
    }
    
    return {
        id: producto.id,
        ...producto.data(),
    };
}

export async function editarProducto(id, producto) {
    console.log(id, producto, '[productos.js editarProducto]');
    const productoRef = doc(db, "productos", id);
    await updateDoc(productoRef, producto);
    return producto;
}

export async function crearProducto(nuevoProducto) {
    try {
        //console.log(nuevoProducto, '[productos.js crearProducto]');
        const productosRef = collection(db, 'productos');
        nuevoProducto.created_at = serverTimestamp();

        const docRef = await addDoc(productosRef, nuevoProducto);
        return docRef.id;
    } catch (error) {
        //console.error('Error al crear un nuevo producto:', error);
        throw error; 
    }
}