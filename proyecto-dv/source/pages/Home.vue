<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChalkboard, faBook, faComments, faCertificate } from '@fortawesome/free-solid-svg-icons';

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
  <section class="grid grid-cols-1 gap-0 bg-blue-100 bg-opacity-25 md:grid-cols-2">
  <div class="flex flex-col items-start justify-center px-4 py-24 lg:px-20">
    <h1 class="mb-6 text-4xl font-bold leading-tight text-blue-900 md:text-4xl lg:text-5xl">Great customer relationships start here.</h1>
    <p class="pr-0 mb-4 text-sm text-blue-800 tracking-relaxed lg:pr-16">Get the #1 Business Messenger and start delivering personalized experiences at every stage of the customer journey.</p>
  </div>
  <div>
    <picture>
      <source srcset="https://images.unsplash.com/photo-1531548731165-c6ae86ff6491?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80" media="(min-width:768px)">
      <img class="object-cover w-full h-64 bg-gray-100 md:h-full" alt="persona mirando compu creando una idea" src="https://images.unsplash.com/photo-1531548731165-c6ae86ff6491?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80">
    </picture>
  </div>
</section>

  <section class="px-4 py-20 mx-auto max-w-7xl">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-16 lg:gap-x-24 gap-y-20">
      <div>
        <div class="flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-full">
          <FontAwesomeIcon :icon="['fas', 'chalkboard']" class="text-2xl text-blue-500" />
        </div>
        <p class="mb-2 text-base font-semibold leading-tight text-gray-900">Docentes capacitados</p>
        <p class="text-sm text-gray-500">Docentes capacitados son la clave para una educación de calidad y un futuro brillante para los estudiantes.</p>
      </div>
      <div>
        <div class="flex items-center justify-center w-12 h-12 mb-4  bg-blue-100 rounded-full">
          <FontAwesomeIcon :icon="['fas', 'book']" class="text-2xl text-blue-500" />
        </div>
        <p class="mb-2 text-base font-semibold leading-tight text-gray-900">Aprende a tu ritmo</p>
        <p class="text-sm text-gray-500">SAprende a tu ritmo, en línea, y aprovecha la flexibilidad de la educación en línea para alcanzar tus metas de aprendizaje.</p>
      </div>
      <div>
        <div class="flex items-center justify-center w-12 h-12 mb-4  bg-blue-100 rounded-full">
          <FontAwesomeIcon :icon="['fas', 'certificate']" class="text-2xl text-blue-500" />
        </div>
        <p class="mb-2 text-base font-semibold leading-tight text-gray-900">Certificados</p>
        <p class="text-sm text-gray-500">Obtén certificados reconocidos que validen tus logros y habilidades en tu camino de aprendizaje.</p>
      </div>
      <div>
        <div class="flex items-center justify-center w-12 h-12 mb-4  bg-blue-100 rounded-full">
          <FontAwesomeIcon :icon="['fas', 'comments']" class="text-2xl text-blue-500" />
        </div>
        <p class="mb-2 text-base font-semibold leading-tight text-gray-900">Comparte conocimientos</p>
        <p class="text-sm text-gray-500">Comparte conocimientos y enriquece el aprendizaje colectivo.</p>
      </div>
    </div>
  </section>
  <section class="w-full  bg-blue-100">
    <div class="w-full px-4 py-20 mx-auto text-left md:text-center md:w-3/4 lg:w-2/4">
      <p class="mb-2  font-semibold text-cyan-950">Registrate para obtener una cuenta gratuita y organizá tus cursos</p>
      <h2 class="mb-6 text-3xl font-bold text-gray-800 tracking-tight md:text-4xl md:mb-6 md:leading-tight">Descubre la excelencia educativa con nuestros docentes capacitados.</h2>
      <div class="mb-0 space-x-0 md:space-x-2">
        <a class="inline-flex items-center justify-center w-full mb-2 btn btn-primary btn-lg sm:w-auto sm:mb-0" href="/cursos">
          Empezar
          <svg class="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  </section>
  <section class="px-4 py-24 mx-auto max-w-7xl bg-white">
    <div class="grid items-center grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-20 gap-x-10 md:gap-x-24">
      <div>
        <h2 class="mb-4 text-2xl font-extrabold tracking-tight text-center text-black md:leading-tight sm:text-left md:text-4xl">
          Nuestros valores
        </h2>
        <p class="mb-5 text-base text-center text-gray-600 sm:text-left md:text-lg">
          En English Courses, nuestra misión es mucho más que enseñar inglés; es inspirar el crecimiento personal y profesional a través del dominio del idioma universal. Nos enorgullece sustentar nuestra labor en valores fundamentales que guían cada paso que damos.
        </p>
      </div>
      <div>
        <img :src="getImagenUrl('cards-home-01.png')" alt="Foto 1" class="max-w-full h-auto" />
      </div>
    </div>
    <div class="grid flex-col-reverse items-center grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-32 gap-x-10 md:gap-x-24">
      <div class="order-none md:order-2">
        <h2 class="mb-4 text-2xl font-extrabold tracking-tight text-center text-black md:leading-tight sm:text-left md:text-4xl">
          Nuestros cursos
        </h2>
        <p class="mb-5 text-base text-center text-gray-600 sm:text-left md:text-lg">
          ¿Estás listo para abrir las puertas hacia un futuro lleno de posibilidades? En "English Courses," te invitamos a explorar nuestros emocionantes cursos de inglés que pueden llevar tu aprendizaje y tu carrera al siguiente nivel.
        </p>
        <a href="/cursos" class="w-full btn btn-dark btn-lg sm:w-auto">Ver cursos</a>
      </div>
      <div>
        <img :src="getImagenUrl('cards-home-02.png')" alt="Foto 2" class="max-w-full h-auto" />
      </div>
    </div>
  </section>
</template>