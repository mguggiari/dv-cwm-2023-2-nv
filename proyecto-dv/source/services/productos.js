import { db } from "./firebase.js";
import { collection, query, orderBy, getDocs, getDoc, doc } from 'firebase/firestore';

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
        //console.log(productos);
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

// export async function editarProducto(id, producto) {
//     console.log("product", producto);
//     console.log("id", id);

//     const productRef = doc(db, "productos", id);
//     await updateDoc(productRef, producto);
// }

// export async function editProducto(id, newData) {
//     try {
//         // Obtén el producto existente por su ID
//         const productoRef = doc(db, "productos", id);
//         const productoSnapshot = await getDoc(productoRef);

//         if (!productoSnapshot.exists()) {
//             throw new Error("[productos.js editProducto] El producto no existe");
//         }

//         // Realiza la actualización del producto con los nuevos datos
//         await updateDoc(productoRef, newData);

//         return { id, ...newData };
//     } catch (error) {
//         console.error("Error al editar el producto:", error);
//         throw error;
//     }
// }







