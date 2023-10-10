<script>
import { getProductos } from '../services/productos';
import Loader from '../components/Loader.vue';
import PrimaryButton from '../components/PrimaryButton.vue';

export default {
  name: "Cursos",
  components: { PrimaryButton, Loader },
  data() {
    return {
      productos: [],
      productosCargando: true,
    };
  },
  methods: {
    cargarProductos() {
      this.productosCargando = true;
      getProductos()
        .then((productos) => {
          this.productos = productos;
        })
        .catch((error) => {
          console.error('Error al obtener productos:', error);
        })
        .finally(() => {
          this.productosCargando = false;
        });
    },
  },
  mounted() {
    this.cargarProductos();
  },
};
</script>

<template>
  <section>
    <div class="pb-64 bg-gray-100">
      <div class="max-w-7xl px-4 pt-20 mx-auto text-center sm:text-left">
        <h1 class="mb-3 text-4xl font-bold leading-tight text-gray-900 md:text-5xl md:font-extrabold">Cursos</h1>
        <p class="mb-10 text-lg text-gray-600 md:text-xl">
          Busca tu curso ideal, resérvalo y nos pondremos en contacto para brindarte más información. 
        </p>
      </div>
    </div>
    <div class="max-w-7xl pb-20 mx-auto -mt-48">
      <template v-if="!productosCargando">
        <ul class="grid grid-cols-1 gap-16 lg:grid-cols-3 sm:gap-8">
          <li v-for="producto in productos" :key="producto.id" class="border-0 rounded-none shadow-none card sm:shadow-md sm:rounded-lg">
            <div class="flex flex-col justify-between p-6 border-b border-gray-200">
              <!-- <img src="/imagenes/2.jpg" alt="Tarjeta 2" class="w-full h-124object-cover"> -->
              <!-- <img :src="'/imagenes/' + producto.img_desktop" :alt="'Imagen de ' + producto.titulo" /> -->
              <p class="mb-1 text-lg font-semibold text-gray-700">$ {{ producto.precio }}</p>
              <p class="pb-0 my-2 font-mono text-4xl font-extrabold text-gray-900 md:pb-2">{{ producto.titulo }}</p>
              <PrimaryButton :loading="productosCargando">Reservar</PrimaryButton>
            </div>
            <div class="flex flex-col flex-grow p-6 space-y-3">
              <div class="flex items-start">
                <svg viewBox="0 0 20 20" fill="currentColor" class="flex-none w-4 h-4 mt-1 mr-2 text-green-600"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                <p class="text-gray-700">{{ producto.descripcion }}</p>
              </div>
            </div>
          </li>
        </ul>
      </template>
      <template v-else>
        <Loader />
      </template>
    </div>
  </section>
</template>