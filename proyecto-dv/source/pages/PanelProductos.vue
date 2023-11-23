<script setup>
import { ref, onMounted } from 'vue';
import { getProductos, deshabilitarProducto, habilitarProducto } from '../services/productos';
import LoadingContext from '../components/LoadingContext.vue';
import Modal from '../components/Modal.vue';

const productos = ref([]);
const productosCargando = ref(true);
const productoSeleccionado = ref(null);

const cargarProductos = async () => {
    productosCargando.value = true;
    try {
        const productosData = await getProductos();
        productos.value = productosData;
    } catch (error) {
        console.error("Error al obtener productos:", error);
    } finally {
        productosCargando.value = false;
    }
};

const actualizarEstadoProducto = async (id, deshabilitado) => {
    productos.value = productos.value.map(producto =>
        producto.id === id ? { ...producto, deshabilitado } : producto
    );
    productoSeleccionado.value = null;
    await cargarProductos();
};

async function productoDeshabilitado(id) {
    try {
        await deshabilitarProducto(productoSeleccionado.value.id, true);
        actualizarEstadoProducto(id, true);
    } catch (error) {
        console.error("Error al deshabilitar producto:", error);
    }
}

async function productoHabilitado(id) {
    try {
        await habilitarProducto(productoSeleccionado.value.id, false);
        actualizarEstadoProducto(id, false);
    } catch (error) {
        console.error("Error al habilitar producto:", error);
    }
}

const abrirModalDeshabilitar = (id) => {
    const producto = productos.value.find(p => p.id === id);
    if (producto) {
        productoSeleccionado.value = producto;
    } else {
        console.error("No se encontró el producto para deshabilitar.");
    }
};

onMounted(async () => {
    try {
        await cargarProductos();
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
});
</script>

<template>
    <div class="pb-64">
        <div class="max-w-7xl px-4 pt-20 mx-auto text-center sm:text-left">
            <h1 class="mb-6 text-4xl font-bold leading-tight text-blue-950 md:text-4xl lg:text-5xl">Administrar productos</h1>
            <router-link class="bg-blue-100 w-full btn hover:bg-blue-200 text-gray-700 btn-lg sm:w-auto p-3 rounded" to="/curso/nuevo">
                Crear curso
            </router-link>
        </div>
    </div>
    <LoadingContext :loading="productosCargando">
        <div class="max-w-7xl pb-20 mx-auto -mt-48">
            <div v-for="producto in productos" class="lg:flex lg:items-center lg:justify-between border border-neutral-100 shadow border-solid mx-auto p-3 mb-5">
                <div class="min-w-0 flex-1">
                    <div class="flex items-center">
                        <h2 class="text-2xl me-4 font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                            {{ producto.titulo }}
                        </h2>
                        <div v-if="!producto.deshabilitado">
                            <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Habilitado</span>
                        </div>
                        <div v-else>
                            <span class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Deshabilitado</span>
                        </div>
                    </div>
                    <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                        <div class="mt-2 flex items-center text-sm text-gray-500">
                            <svg class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M10.75 10.818v2.614A3.13 3.13 0 0011.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 00-1.138-.432zM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 00-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152z" />
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-6a.75.75 0 01.75.75v.316a3.78 3.78 0 011.653.713c.426.33.744.74.925 1.2a.75.75 0 01-1.395.55 1.35 1.35 0 00-.447-.563 2.187 2.187 0 00-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696v.299a.75.75 0 11-1.5 0v-.3c-.697-.092-1.382-.318-1.958-.695-.482-.315-.857-.717-1.078-1.188a.75.75 0 111.359-.636c.08.173.245.376.54.569.313.205.706.353 1.138.432v-2.748a3.782 3.782 0 01-1.653-.713C6.9 9.433 6.5 8.681 6.5 7.875c0-.805.4-1.558 1.097-2.096a3.78 3.78 0 011.653-.713V4.75A.75.75 0 0110 4z" clip-rule="evenodd" />
                            </svg>
                            ${{ producto.precio }}
                        </div>
                        <div class="mt-1 flex items-center text-sm text-gray-500">
                            <svg class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clip-rule="evenodd" />
                            </svg>
                            {{ producto.duracion }}
                        </div>
                        <div>
                            {{producto.descripcion}}
                        </div>
                    </div>
                </div>
                <div class="mt-5 flex flex-col lg:ml-4 lg:mt-0">
                    <router-link :to="`/curso/${producto.id}/editar`" class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mb-4">
                        <svg class="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                        </svg>
                        Editar
                    </router-link>
                    <button @click="abrirModalDeshabilitar(producto.id)" class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        {{ producto.deshabilitado ? 'Habilitar' : 'Deshabilitar' }}
                    </button>
                </div>
            </div>
        </div>
    </LoadingContext>

    <Modal
        v-if="productoSeleccionado"
        :title="productoSeleccionado.deshabilitado ? 'Habilitar producto' : 'Deshabilitar producto: ' + productoSeleccionado.titulo"
        :content="productoSeleccionado.deshabilitado ? '¿Estás seguro que deseas habilitar el producto ' + productoSeleccionado.titulo + '?' : '¿Estás seguro que deseas deshabilitar el producto ' + productoSeleccionado.titulo + '?'"
        :buttonText="productoSeleccionado.deshabilitado ? 'Habilitar' : 'Deshabilitar'"
        :cancelFunction="productoSeleccionado.deshabilitado ? productoHabilitado : productoDeshabilitado"
        :modalClass="productoSeleccionado.deshabilitado ? 'success' : 'error'"
        @closeModal="productoSeleccionado = null"
    />
</template> 