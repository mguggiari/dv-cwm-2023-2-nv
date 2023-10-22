<script>
import PrimaryButton from '../components/PrimaryButton.vue';
import Loader from '../components/Loader.vue';
import { crearProducto } from '../services/productos.js'

export default {
    name: "CursoNuevo",
    components: { PrimaryButton, Loader },
    data() {
        return {
            registroProductoCargando: false,
            nuevoProducto: {
                titulo: '',
                precio: '',
                descripcion: '',
            },
        };
    },
    methods: {
        async handleCrearProducto() {
            this.registroProductoCargando = true;
            try {
                await crearProducto({...this.nuevoProducto});
                this.$router.push('/panel-admin');
            } catch (error) {
                console.log(error);
            } finally {
                this.registroProductoCargando = false;
            }
        }
    },
};
</script>

<template>
    <div class="flex justify-center items-center mt-16">
        <div class="bg-white p-8 rounded-md shadow-md w-1/2">
            <h1 class="text-3xl mb-4 font-bold">Nuevo Curso</h1>
            <form action="#" @submit.prevent="handleCrearProducto">
                <div class="mb-4">
                    <label for="titulo" class="block font-bold mb-2">Titulo</label>
                    <input type="text" id="titulo" v-model="nuevoProducto.titulo" class="w-full px-4 py-2 border rounded-md">
                </div>
                <div class="mb-4">
                    <label for="precio" class="block font-bold mb-2">Precio</label>
                    <input type="number" id="precio" v-model="nuevoProducto.precio" class="w-full px-4 py-2 border rounded-md">
                </div>
                <div class="form-group">
                    <label for="descripcion">Descripción</label>
                    <textarea id="descripcion" v-model="nuevoProducto.descripcion" required></textarea>
                </div>
                <PrimaryButton :loading="registroProductoCargando" class="bg-medium-border text-white hover:bg-white hover:text-medium-border">Crear</PrimaryButton>
            </form>
        </div>
    </div>
</template>