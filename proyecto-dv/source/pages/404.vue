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
        <h1 class="mb-4 text-2xl font-extrabold leading-tight tracking-tight text-left text-gray-900 md:text-4xl">¡Ups! Ha ocurrido un error...</h1>
        <p class="mb-5 text-base text-left text-gray-800 md:text-xl">Te invitamos a ver nuestros cursos mientras trabajamos en ello</p>
        <a href="/" class="w-full mb-2 btn btn-lg btn-light sm:w-auto sm:mb-0">Volver al Incio</a>
        <a href="/cursos" class="w-full mb-2 btn btn-lg btn-white sm:w-auto sm:mb-0">Ver cursos</a>
      </div>
      <div>
        <div class="w-full h-full py-48 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
</section>
</template>