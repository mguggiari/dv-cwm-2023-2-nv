<script>
export default {
  name: "Cursos",
  methods: {
    getImagenUrl(nombreImagen) {
      return `/imagenes/${nombreImagen}`;
    },
  },
};
</script>

<template>
    <div>
      <!-- Banner principal -->
      <div class="bg-blue-500">
        <img :src="getImagenUrl('banner2-catalogo.png')" alt="Banner principal" class="w-full" />
      </div>
  
      <!-- Tarjetas (Cards) -->
      <div class="container mx-auto py-8 grid grid-cols-2 gap-4">
        <!-- Tarjeta 1 -->
        <div class="bg-white rounded-lg overflow-hidden shadow-md">
          <img :src="getImagenUrl('cards-catalogo-01.png')" alt="Tarjeta 1" class="w-full h-124 object-cover" />
          <div class="p-4">
            <h2 class="text-xl font-semibold">Beginner</h2>
          </div>
        </div>
  
        <!-- Tarjeta 2 -->
        <div class="bg-white rounded-lg overflow-hidden shadow-md">
          <img :src="getImagenUrl('cards-catalogo-02.png')" alt="Tarjeta 2" class="w-full h-124object-cover" />
          <div class="p-4">
            <h2 class="text-xl font-semibold">Intermediate</h2>
          </div>
        </div>
  
        <!-- Tarjeta 3 -->
        <div class="bg-white rounded-lg overflow-hidden shadow-md">
          <img :src="getImagenUrl('cards-catalogo-03.png')" alt="Tarjeta 3" class="w-full h-124 object-cover" />
          <div class="p-4">
            <h2 class="text-xl font-semibold">Advanced</h2>
          </div>
        </div>
  
        <!-- Tarjeta 4 -->
        <div class="bg-white rounded-lg overflow-hidden shadow-md">
          <img :src="getImagenUrl('cards-catalogo-04.png')" alt="Tarjeta 4" class="w-full h-124 object-cover" />
          <div class="p-4">
            <h2 class="text-xl font-semibold">Speak!</h2>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  