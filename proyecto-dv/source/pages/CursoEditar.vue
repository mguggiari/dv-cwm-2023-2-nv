<script>
import PrimaryButton from '../components/PrimaryButton.vue';
import Loader from '../components/Loader.vue';
import PrimaryInput from '../components/PrimaryInput.vue';
import PrimaryTextarea from '../components/PrimaryTextarea.vue';
import { getProductoById, editarProducto } from '../services/productos.js'

export default {
    name: "CursoEditar",
    components: { PrimaryButton, Loader, PrimaryTextarea, PrimaryInput },
    data() {
        return {
            productoCargando: true,
            form: {
                titulo: '',
                duracion: '',
                precio: '',
                descripcion: '',
            },
        };
    },
    methods: {
        async handleEditarProducto() {
            this.producto.titulo = this.form.titulo;
            this.producto.duracion = this.form.duracion;
            this.producto.precio = this.form.precio;
            this.producto.descripcion = this.form.descripcion;

            await editarProducto(this.$route.params.id, this.producto);

            this.$router.push('/panel-admin');
        },
    },
    async mounted() {
        this.productoCargando = true;
        this.producto = await getProductoById(this.$route.params.id);
        this.productoCargando = false;

        this.form.titulo = this.producto.titulo;
        this.form.duracion = this.producto.duracion;
        this.form.precio = this.producto.precio;
        this.form.descripcion = this.producto.descripcion;
    },
};
</script>
<template>
    <Loader v-if="productoCargando" />
    <template v-else>
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
    </template>
</template>