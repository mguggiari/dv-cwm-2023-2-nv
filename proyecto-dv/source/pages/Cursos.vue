<script setup>
import LoadingContext from '../components/LoadingContext.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
import { useAuth } from '../composition/useAuth';
import { onMounted, ref } from 'vue';
import { getProductos } from '../services/productos';
import { reserveProduct } from '../services/user';

const { user: usuarioAutenticado } = useAuth();
const productos = ref([]);
const productosCargando = ref(true);

onMounted(async () => {
  try {
    productos.value = await getProductos();
    productosCargando.value = false;
  } catch (error) {
    console.error('Error al obtener productos:', error);
  }
});

async function handleReservar(productoId) {
  try {
    await reserveProduct(productoId, usuarioAutenticado.value.id);
    //console.log('Producto reservado con éxito!');
  } catch (error) {
    console.error('Error al reservar el producto:', error.message);
  }
}
</script>

<template>
  <section>
    <div class="pb-64">
      <div class="max-w-7xl px-4 pt-20 mx-auto text-center sm:text-left">
        <h1 class="mb-6 text-4xl font-bold leading-tight text-blue-950 md:text-4xl lg:text-5xl">Cursos</h1>
        <p class="mb-10 text-lg text-gray-600 md:text-xl">
          Buscá tu curso ideal, reservalo y nos pondremos en contacto para brindarte más información. 
        </p>
      </div>
    </div>
    <div class="max-w-7xl pb-20 mx-auto -mt-48">
      <LoadingContext :loading="productosCargando">
        <ul class="grid grid-cols-1 gap-16 lg:grid-cols-3 sm:gap-8">
          <li 
            v-for="producto in productos.filter(producto => !producto.deshabilitado)" 
            :key="producto.id" 
            class="border-0 rounded-none shadow-none card sm:shadow-md sm:rounded-lg"
          >
            <div class="flex flex-col justify-between p-6 border-b border-gray-200">
              <h2 class="pb-0 my-2 font-mono text-4xl font-extrabold text-gray-900 md:pb-2">{{ producto.titulo }}</h2>
              <p class="flex align-center items-center mb-1 text-lg font-semibold text-gray-700">
                <svg class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M10.75 10.818v2.614A3.13 3.13 0 0011.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 00-1.138-.432zM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 00-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152z" />
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-6a.75.75 0 01.75.75v.316a3.78 3.78 0 011.653.713c.426.33.744.74.925 1.2a.75.75 0 01-1.395.55 1.35 1.35 0 00-.447-.563 2.187 2.187 0 00-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696v.299a.75.75 0 11-1.5 0v-.3c-.697-.092-1.382-.318-1.958-.695-.482-.315-.857-.717-1.078-1.188a.75.75 0 111.359-.636c.08.173.245.376.54.569.313.205.706.353 1.138.432v-2.748a3.782 3.782 0 01-1.653-.713C6.9 9.433 6.5 8.681 6.5 7.875c0-.805.4-1.558 1.097-2.096a3.78 3.78 0 011.653-.713V4.75A.75.75 0 0110 4z" clip-rule="evenodd" />
                </svg> {{ producto.precio }}
              </p>
              <p class="flex align-center items-center mb-1 text-lg font-semibold text-gray-700">
                <svg class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clip-rule="evenodd" />
                </svg> {{ producto.duracion }}
              </p>
              <PrimaryButton :loading="productosCargando" @click="handleReservar(producto.id)">Reservar</PrimaryButton>
            </div>
            <div class="flex flex-col flex-grow p-6 space-y-3">
              <div class="flex items-start">
                <svg viewBox="0 0 20 20" fill="currentColor" class="flex-none w-4 h-4 mt-1 mr-2 text-green-600"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                <p class="text-gray-700">{{ producto.descripcion }}</p>
              </div>
            </div>
          </li>
        </ul>
      </LoadingContext>
    </div>
  </section>
</template>