<script>
import PrimaryButton from '../components/PrimaryButton.vue';
import Loader from '../components/Loader.vue';
import PrimaryInput from '../components/PrimaryInput.vue';
import PrimaryTextarea from '../components/PrimaryTextarea.vue';
import { crearProducto } from '../services/productos.js'

export default {
    name: "CursoNuevo",
    components: { PrimaryButton, Loader, PrimaryTextarea, PrimaryInput },
    data() {
        return {
            registroProductoCargando: false,
            nuevoProducto: {
                titulo: '',
                duracion: '',
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
        <div class="bg-white p-8 rounded-md shadow-md">
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
                <PrimaryButton :loading="registroProductoCargando" class="bg-medium-border text-white hover:bg-white hover:text-medium-border">Crear</PrimaryButton>
            </form>
        </div>
    </div>
</template>