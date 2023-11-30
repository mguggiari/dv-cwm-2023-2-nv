<script setup>
import PrimaryButton from '../components/PrimaryButton.vue';
import PrimaryInput from '../components/PrimaryInput.vue';
import PrimaryTextarea from '../components/PrimaryTextarea.vue';
import { useRouter } from 'vue-router';
import { ref, inject } from 'vue';
import { crearProducto } from '../services/productos.js';
import { notificacionSymbol } from "../symbols/symbols";

const router = useRouter();
const { setNotificacion } = inject(notificacionSymbol);

const registroProductoCargando = ref(false);
const nuevoProducto = ref({
    titulo: '',
    duracion: '',
    precio: '',
    descripcion: '',
});

const handleCrearProducto = async () => {
    registroProductoCargando.value = true;
    try {
        await crearProducto({ ...nuevoProducto.value });
        router.push('/panel-productos');
        setNotificacion({
            mensaje: 'Curso creado con éxito',
            type: 'success',
        });
    } catch (error) {
        console.error(error);
        setNotificacion({
            mensaje: 'Error al crear curso, aguarde unos segundos y vuelva a intentar, por favor.',
            type: 'error',
        });
    } finally {
        registroProductoCargando.value = false;
    }
};
</script>

<template>
    <div class="flex justify-center items-center mt-16">
        <div class="bg-white p-8 rounded-md shadow-md md:w-2/4">
            <h1 class="mb-6 text-4xl font-bold leading-tight text-blue-950 md:text-4xl lg:text-5xl">Nuevo Curso</h1>
            <form action="#" @submit.prevent="handleCrearProducto">
                <div class="mb-4">
                    <label for="titulo" class="block font-bold mb-2">Título</label>
                    <PrimaryInput type="text" id="titulo" v-model="nuevoProducto.titulo" />
                </div>
                <div class="mb-4">
                    <label for="duracion" class="block font-bold mb-2">Duración</label>
                    <PrimaryInput type="text" id="duracion" v-model="nuevoProducto.duracion" />
                </div>
                <div class="mb-4">
                    <label for="precio" class="block font-bold mb-2">Precio</label>
                    <PrimaryInput type="number" id="precio" v-model="nuevoProducto.precio" />
                </div>
                <div class="form-group">
                    <label for="descripcion" class="block font-bold mb-2">Descripción</label>
                    <PrimaryTextarea 
                        id="descripcion"
                        v-model="nuevoProducto.descripcion"
                        required
                    ></PrimaryTextarea>
                </div>
                <PrimaryButton :loading="registroProductoCargando" class="bg-medium-border text-white hover:bg-white hover:text-medium-border w-full mt-4">Crear</PrimaryButton>
            </form>
        </div>
    </div>
</template>