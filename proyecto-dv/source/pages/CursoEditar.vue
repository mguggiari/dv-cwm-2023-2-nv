<script>
import { getProductoById } from '../services/productos.js'
export default {
    name: "CursoEditar",
    data() {
        return {
            producto: null
        };
    },
    methods: {
        async obtenerProducto() {
            this.producto = await getProductoById(this.$route.params.id);
            console.log(this.producto);
        },
    },
    mounted() {
        this.obtenerProducto();
    },
};
</script>
<template>
    <h1>Edit Product</h1>
    
</template>