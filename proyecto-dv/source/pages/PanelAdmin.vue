<script>
import { getProductos, getProductoById } from '../services/productos';
export default {
    name: "PanelAdmin",
    data() {
        return {
        productos: [],
        productosCargando: true,
        };
    },
    methods: {
        cargarProductos() {
        this.productosCargando = true;
        getProductos()
            .then((productos) => {
                this.productos = productos;
                console.log(productos);
            })
            .catch((error) => {
                console.error('Error al obtener productos:', error);
            })
            .finally(() => {
                this.productosCargando = false;
            });
        },
    },
    mounted() {
        this.cargarProductos();
    },
};
</script>

<template>
    <h1>Panel Admin</h1>
    <a
        href="#"
        class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
    >
        Nuevo Producto
    </a>
    <div class="overflow-x-auto">
        <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead>
            <tr>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Nombre
                </th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Precio
                </th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Descripción
                </th>
                <th class="px-4 py-2"></th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                
                <tr v-for="producto in productos">
                    <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {{ producto.titulo }}
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ producto.precio }}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ producto.descripcion }}</td>
                    <td class="whitespace-nowrap px-4 py-2">
                        <router-link class="text-blue-500 hover:underline" :to="`/editar/curso/${producto.id}`">
                            Editar 
                        </router-link>
                        <a
                            href="#"
                            class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                        >
                            Borrar
                        </a>
                    </td>
                </tr>
            </tbody>    
        </table>
    </div>
</template> 