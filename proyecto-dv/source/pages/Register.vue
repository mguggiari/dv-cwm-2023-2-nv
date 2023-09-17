<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl mb-4 font-bold">Crear cuenta</h1>
      <form action="#">
        <div class="mb-4">
          <label for="email" class="block font-bold mb-2">Email</label>
          <input type="email" id="email" class="w-full px-4 py-2 border rounded-md">
        </div>
        <div class="mb-4">
          <label for="password" class="block font-bold mb-2">Contraseña</label>
          <input type="password" id="password" class="w-full px-4 py-2 border rounded-md">
        </div>
        <PrimaryButton class="bg-medium-border text-white hover:bg-white hover:text-medium-border">Registrarme</PrimaryButton>
      </form>
    </div>
  </template>
  
  <script>
  import PrimaryButton from '../components/PrimaryButton.vue';
  
  export default {
    name: "Register",
    components: { PrimaryButton },
  };
  </script>
  