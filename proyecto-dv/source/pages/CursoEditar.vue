<script setup>
import PrimaryButton from '../components/PrimaryButton.vue';
import LoadingContext from '../components/LoadingContext.vue';
import PrimaryInput from '../components/PrimaryInput.vue';
import PrimaryTextarea from '../components/PrimaryTextarea.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, inject } from 'vue';
import { getProductoById, editarProducto } from '../services/productos.js';
import { notificacionSymbol } from "../symbols/symbols";

const route = useRoute();
const router = useRouter();
const { setNotificacion } = inject(notificacionSymbol);

const producto = ref({});
const productoCargando = ref(true);

const form = ref({
    titulo: '',
    duracion: '',
    precio: '',
    descripcion: '',
});

onMounted(async () => {
    try {
        productoCargando.value = true;
        const productData = await getProductoById(route.params.id);

        producto.value = productData;
        form.value = productData;
    } catch (error) {
        console.error(error);
    } finally {
        productoCargando.value = false;
    }
});

const handleEditarProducto = async () => {
    try {
        await editarProducto(route.params.id, form.value);
        router.push('/panel-productos');
        setNotificacion({
            mensaje: 'Curso actualizado con éxito',
            type: 'success',
        });
    } catch (error) {
        setNotificacion({
            mensaje: 'Error al actualizar el curso, aguarde unos segundos y vuelva a intentar, por favor',
            type: 'error',
        });
    }
};
</script>

<template>
    <LoadingContext :loading="productoCargando">
        <div class="flex justify-center items-center mt-16">
            <div class="bg-white p-8 rounded-md shadow-md md:w-2/4">
                <h1 class="mb-6 text-3xl font-bold leading-tight text-blue-950 md:text-4xl lg:text-5xl">Editar</h1>
                <form action="#" @submit.prevent="handleEditarProducto">
                    <div class="mb-4">
                        <label for="titulo" class="block font-bold mb-2">Título</label>
                        <PrimaryInput type="text" id="titulo" v-model="form.titulo" />
                    </div>
                    <div class="mb-4">
                        <label for="duracion" class="block font-bold mb-2">Duración</label>
                        <PrimaryInput type="text" id="duracion" v-model="form.duracion" />
                    </div>
                    <div class="mb-4">
                        <label for="precio" class="block font-bold mb-2">Precio</label>
                        <PrimaryInput type="number" id="precio" v-model="form.precio" />
                    </div>
                    <div class="form-group">
                        <label for="descripcion" class="block font-bold mb-2">Descripción</label>
                        <PrimaryTextarea 
                            id="descripcion"
                            v-model="form.descripcion"
                        ></PrimaryTextarea>
                    </div>
                    <div class="flex justify-between items-center">
                        <router-link class="w-full mt-4 text-center bg-red-50 text-red-700 p-2 rounded hover:bg-red-100" :to="'/panel-productos'">Cancelar</router-link>
                        <PrimaryButton class="w-full mt-4 ms-4">Editar</PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    </LoadingContext>
</template>