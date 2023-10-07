<script>
import PrimaryButton from '../components/PrimaryButton.vue';
import { login } from '../services/auth.js'

export default {
  name: "Login",
  components: { PrimaryButton },
  emits: ['login'],
  data() {
    return {
      inicioSesionCargando: false,
      form: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    iniciarSesion() {
      this.inicioSesionCargando = true;

      login({
        ...this.form,
      })
        .then(user =>{
          //this.$emit('login', {...user});
          this.$router.push('/');
        })
        .finally(() => {
          this.inicioSesionCargando = false;
        });
    }
  }
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl mb-4 font-bold">Iniciar sesión</h1>
    <form action="#" @submit.prevent="iniciarSesion">
      <div class="mb-4">
        <label for="email" class="block font-bold mb-2" >Email</label>
        <input 
          :disabled="inicioSesionCargando"
          type="email" 
          id="email" 
          v-model="form.email" 
          class="w-full px-4 py-2 border rounded-md"
        >
      </div>
      <div class="mb-4">
        <label for="password" class="block font-bold mb-2">Contraseña</label>
        <input 
          :disabled="inicioSesionCargando"
          type="password" 
          id="password" 
          v-model="form.password" 
          class="w-full px-4 py-2 border rounded-md"
        >
      </div>
      <PrimaryButton :loading="inicioSesionCargando">Iniciar Sesión</PrimaryButton>
    </form>
  </div>
</template>