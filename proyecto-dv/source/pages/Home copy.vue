<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChalkboard, faBook, faComments, faCertificate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faChalkboard, faBook, faComments, faCertificate);

export default {
  name: "Home",
  methods: {
    getImagenUrl(nombreImagen) {
      return `/imagenes/${nombreImagen}`;
    },
  },
  components: {
    FontAwesomeIcon,
  },
};
</script>

<template>
  <div>
    <!-- Banner principal -->
    <div class="bg-blue-500">
      <img :src="getImagenUrl('banner1.png')" alt="Banner principal" class="w-full" />
    </div>

    <!-- Bloque de 4 iconos en línea -->
    <div class="flex justify-around py-4 md:mx-8">
      <!-- Icono 1 -->
      <div class="text-center mb-4 md:mb-0">
        <FontAwesomeIcon :icon="['fas', 'chalkboard']" class="text-4xl text-blue-500" />
        <p class="text-blue-500 mt-2">Docentes capacitados</p>
      </div>
      <!-- Icono 2 -->
      <div class="text-center mb-4 md:mb-0">
        <FontAwesomeIcon :icon="['fas', 'book']" class="text-4xl text-blue-500" />
        <p class="text-blue-500 mt-2">Materiales incluidos</p>
      </div>
      <!-- Icono 3 -->
      <div class="text-center mb-4 md:mb-0">
        <FontAwesomeIcon :icon="['fas', 'comments']" class="text-4xl text-blue-500" />
        <p class="text-blue-500 mt-2">Cursos de conversación</p>
      </div>
      <!-- Icono 4 -->
      <div class="text-center">
        <FontAwesomeIcon :icon="['fas', 'certificate']" class="text-4xl text-blue-500" />
        <p class="text-blue-500 mt-2">Certificados</p>
      </div>
    </div>

    <!-- Bloque de imagen con título y texto -->
    <div class="container mx-auto py-4">
      <div class="flex flex-col md:flex-row items-center  margenes1">
        <div class="w-full md:w-1/2 mb-4 md:mb-0">
          <div class="bg-white p-4">
            <img :src="getImagenUrl('cards-home-01.png')" alt="Foto 1" class="max-w-full h-auto" />
          </div>
        </div>
        <div class="w-full md:w-1/2 p-4">
          <h2 class="text-2xl">Nuestros valores</h2>
          <p class="mt-2">En el Instituto de Inglés "English Courses," nuestra misión es mucho más que enseñar inglés; es inspirar el crecimiento personal y profesional a través del dominio del idioma universal. Nos enorgullece sustentar nuestra labor en valores fundamentales que guían cada paso que damos.</p>
        </div>
      </div>

      <!-- Bloque de título, texto y botón con imagen -->
      <div class="flex flex-col md:flex-row items-center margenes2">
        <div class="w-full md:w-1/2 p-4">
          <h2 class="text-2xl">Nuestros cursos</h2>
          <p class="mt-2">¿Estás listo para abrir las puertas hacia un futuro lleno de posibilidades? En "English Courses," te invitamos a explorar nuestros emocionantes cursos de inglés que pueden llevar tu aprendizaje y tu carrera al siguiente nivel.</p>
          <router-link to="/cursos" class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 block text-center">Ver cursos</router-link>
        </div>
        <div class="w-full md:w-1/2 mb-4 md:mb-0">
          <div class="bg-white p-4 ">
            <img :src="getImagenUrl('cards-home-02.png')" alt="Foto 2" class="max-w-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.margenes1{

  margin-top: 50px;
  box-shadow: 0 0 10px rgba(115, 115, 115, 0.5);
}
.margenes2{

  margin-top: 50px;
  margin-bottom: 50px;
  box-shadow: 0 0 10px rgba(115, 115, 115, 0.5);

}
</style>