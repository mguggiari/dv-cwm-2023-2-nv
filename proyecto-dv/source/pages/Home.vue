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
  <section class="px-4 py-20 mx-auto max-w-7xl">
    <div class="bg-blue-500">
      <img :src="getImagenUrl('banners.png')" alt="Banner principal" class="w-full" /> //mica te dejo el banner aca
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-16 lg:gap-x-24 gap-y-20">
      <div>
        <div class="flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-full">
          <FontAwesomeIcon :icon="['fas', 'chalkboard']" class="text-2xl text-blue-500" />
        </div>
        <h3 class="mb-2 text-base font-semibold leading-tight text-gray-900">Docentes capacitados</h3>
        <p class="text-sm text-gray-500">Hand crafted dashboards for everything from Recurring Revenue to Customer Churn.</p>
      </div>
      <div>
        <div class="flex items-center justify-center w-12 h-12 mb-4  bg-blue-100 rounded-full">
          <FontAwesomeIcon :icon="['fas', 'book']" class="text-2xl text-blue-500" />
        </div>
        <h3 class="mb-2 text-base font-semibold leading-tight text-gray-900">Aprende a tu ritmo</h3>
        <p class="text-sm text-gray-500">Stay informed with daily, weekly, or monthly reports on all your insights data.</p>
      </div>
      <div>
        <div class="flex items-center justify-center w-12 h-12 mb-4  bg-blue-100 rounded-full">
          <FontAwesomeIcon :icon="['fas', 'certificate']" class="text-2xl text-blue-500" />
        </div>
        <h3 class="mb-2 text-base font-semibold leading-tight text-gray-900">Certificados</h3>
        <p class="text-sm text-gray-500">Your central hub that helps you see, and react to, absolutely everything that’s happening.</p>
      </div>
      <div>
        <div class="flex items-center justify-center w-12 h-12 mb-4  bg-blue-100 rounded-full">
          <FontAwesomeIcon :icon="['fas', 'comments']" class="text-2xl text-blue-500" />
        </div>
        <h3 class="mb-2 text-base font-semibold leading-tight text-gray-900">Comparte conocimientos</h3>
        <p class="text-sm text-gray-500">Our forecasting is your magical crystal ball that helps you predict and plan for the future.</p>
      </div>
    </div>
  </section>
  <section class="w-full bg-slate-300">
    <div class="w-full px-4 py-20 mx-auto text-left md:text-center md:w-3/4 lg:w-2/4">
      <p class="mb-2 text-base font-semibold text-purple-700">Start your free trial now</p>
      <h2 class="mb-6 text-3xl font-extrabold tracking-tight md:text-4xl md:mb-6 md:leading-tight">Sign up for a free account to organize your customer feedback.</h2>
      <div class="mb-0 space-x-0 md:space-x-2">
        <a class="inline-flex items-center justify-center w-full mb-2 btn btn-primary btn-lg sm:w-auto sm:mb-0" href="/cursos">
          Get Started
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