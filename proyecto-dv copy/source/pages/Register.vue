<script>
import PrimaryButton from '../components/PrimaryButton.vue';
import { register } from '../services/auth';

export default {
  name: "Register",
  components: { PrimaryButton },
  data(){
    return {
      registroCargando: false,
      nuevoUsuario: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    async handleSubmit(){
      this.registroCargando = true;
      try {
        await register({...this.nuevoUsuario});
        this.$router.push('/');
      } catch (error) {
        console.log(error);
      }
      this.registroCargando = false;
    }
  },
};
</script>

<template>
  <div class="flex justify-center items-center mt-16">
    <div class="bg-white p-8 rounded-md shadow-md">
    <h1 class="text-3xl mb-4 font-bold">Crea tu cuenta</h1>
    <form action="#" @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="email" class="block font-bold mb-2">Email</label>
        <input type="email" id="email" v-model="nuevoUsuario.email" class="w-full px-4 py-2 border rounded-md">
      </div>
      <div class="mb-4">
        <label for="password" class="block font-bold mb-2">Contraseña</label>
        <input type="password" id="password" v-model="nuevoUsuario.password"  class="w-full px-4 py-2 border rounded-md">
      </div>
      <PrimaryButton :loading="registroCargando" class="bg-medium-border text-white hover:bg-white hover:text-medium-border">Registrarme</PrimaryButton>
    </form>
  </div>
  </div>
</template>