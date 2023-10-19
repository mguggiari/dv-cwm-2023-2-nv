<script>
import { getProductos, getProductoById } from '../services/productos';
export default {
    name: "PanelAdmin",
    data() {
        return {
            productos: [],
            productosCargando: true,
            mobileMenuOpen: false,
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
        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
        },
    },
    mounted() {
        this.cargarProductos();
    },
};
</script>

<template>
    <h1>Panel Admin</h1>
    <router-link class="text-blue-500 hover:underline" to="/curso/nuevo">
        Crear curso
    </router-link>
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
                        <router-link class="text-blue-500 hover:underline" :to="`/curso/${producto.id}/editar`">
                            Editar 
                        </router-link>
                    </td>
                </tr>
            </tbody>    
        </table>
    </div> 
</template> 