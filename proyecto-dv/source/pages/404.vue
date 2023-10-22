<script>
export default {
  name: "Error",
  methods: {
    getImagenUrl(nombreImagen) {
      return `/imagenes/${nombreImagen}`;
    },
  },
};
</script>
<template>
  <section class="px-4 py-24 mx-auto max-w-7xl">
    <div class="grid items-center w-full grid-cols-1 gap-10 mx-auto md:w-4/5 lg:grid-cols-2 xl:gap-32">
      <div>
        <div class="w-full h-full rounded-lg">
          <picture>
            <source srcset="/imagenes/banner-404-desktop.svg" media="(min-width:768px)">
            <img class="object-cover w-full h-64 md:h-full" alt="mujer visualizándose viajando hablando inglés" src="/imagenes/banner-404-mobile.svg">
          </picture>
        </div>
      </div>
      <div>
        <h1 class="mb-4 text-2xl font-extrabold leading-tight tracking-tight text-left text-gray-900 md:text-4xl">¡Ups! Ha ocurrido un error...</h1>
        <p class="mb-5 text-base text-left text-gray-800 md:text-xl">Te invitamos a ver nuestros cursos mientras trabajamos en ello</p>
        <a href="/cursos" class="bg-blue-100 w-full btn hover:bg-blue-200 text-gray-700 btn-lg sm:w-auto p-3 rounded">Ver cursos</a>
      </div>
    </div>
</section>
</template>