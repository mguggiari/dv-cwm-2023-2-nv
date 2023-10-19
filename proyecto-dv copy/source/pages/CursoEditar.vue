<script>
import PrimaryButton from '../components/PrimaryButton.vue';
import Loader from '../components/Loader.vue';
import { getProductoById, editarProducto } from '../services/productos.js'

export default {
    name: "CursoEditar",
    components: { PrimaryButton, Loader },
    data() {
        return {
            productoCargando: true,
            form: {
                titulo: '',
                precio: '',
                descripcion: '',
            },
        };
    },
    methods: {
        async handleEditarProducto() {
            this.producto.titulo = this.form.titulo;
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
        this.form.precio = this.producto.precio;
        this.form.descripcion = this.producto.descripcion;
    },
};
</script>
<template>
    <Loader v-if="productoCargando" />
    <template v-else>
        <div class="flex justify-center items-center mt-16">
            <div class="bg-white p-8 rounded-md shadow-md w-1/2">
                <h1 class="text-3xl mb-4 font-bold">Editar</h1>
                <form action="#" @submit.prevent="handleEditarProducto">
                    <div class="mb-4">
                        <label for="titulo" class="block font-bold mb-2">Titulo</label>
                        <input type="text" id="titulo" v-model="form.titulo" class="w-full px-4 py-2 border rounded-md">
                    </div>
                    <div class="mb-4">
                        <label for="precio" class="block font-bold mb-2">Precio</label>
                        <input type="number" id="precio" v-model="form.precio" class="w-full px-4 py-2 border rounded-md">
                    </div>
                    <div class="form-group">
                        <label for="descripcion">Descripción</label>
                        <textarea id="descripcion" v-model="form.descripcion" required></textarea>
                    </div>
                    <PrimaryButton>Editar</PrimaryButton>
                </form>
            </div>
        </div>
    </template>
</template>