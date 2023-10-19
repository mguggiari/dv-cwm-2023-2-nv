<script>
import { getProductos, getProductoById } from '../services/productos';
import Modal from '../components/Modal.vue';

export default {
    name: "PanelAdmin",
    components: { Modal},
    data() {
        return {
            productos: [],
            productosCargando: true,
            modalTitle: "Habilitar Curso",
            modalMessage: "¿Está seguro de que desea habilitar este curso? Esto permitirá que los usuarios lo vean.",
            isModalOpen: false,
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
        toggleHabilitarCurso() {
            if (this.modalTitle === "Habilitar Curso") {
                // Lógica para habilitar el curso
                // Puedes usar una llamada a la API o manipular el estado local
                // Aquí supondremos que se ha habilitado el curso
                this.producto.habilitado = true;
                this.modalMessage = "El curso ha sido habilitado exitosamente.";
            } else if (this.modalTitle === "Deshabilitar Curso") {
                // Lógica para deshabilitar el curso
                // Puedes usar una llamada a la API o manipular el estado local
                // Aquí supondremos que se ha deshabilitado el curso
                this.producto.habilitado = false;
                this.modalMessage = "El curso ha sido deshabilitado exitosamente.";
            }

            // Cierra la modal
            this.isModalOpen = false;
        },
        prepareHabilitarCurso(producto) {
            this.modalTitle = producto.habilitado ? "Deshabilitar Curso" : "Habilitar Curso";
            this.modalMessage = producto.habilitado
                ? "¿Está seguro de que desea deshabilitar este curso? Esto ocultará el curso de los usuarios."
                : "¿Está seguro de que desea habilitar este curso? Esto permitirá que los usuarios lo vean.";

            // Abre la modal
            this.isModalOpen = true;
        },
    },
    mounted() {
        this.cargarProductos();
        this.isModalOpen = false;
    },
};
</script>

<template>
    <h1>Panel Admin</h1>
    <router-link class="text-blue-500 hover:underline" to="/curso/nuevo">
        Crear curso
    </router-link>
    <Modal :title="modalTitle" :on-confirm="toggleHabilitarCurso" :open="isModalOpen">
        <!-- Contenido de la modal -->
        <p class="text-sm text-gray-500">{{ modalMessage }}</p>
    </Modal>

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
                        <button class="text-blue-500 hover:underline"  @click="prepareHabilitarCurso(producto)">
                            {{ producto.habilitado ? "Deshabilitar" : "Habilitar" }}
                        </button>
                    </td>
                </tr>
            </tbody>    
        </table>
    </div>
</template> 