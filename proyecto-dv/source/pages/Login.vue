<script>
import PrimaryButton from '../components/PrimaryButton.vue';
import { login } from '../services/auth.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faEye, faEyeSlash);

export default {
  name: "Login",
  components: { PrimaryButton, FontAwesomeIcon },
  data() {
    return {
      inicioSesionCargando: false,
      form: {
        email: "",
        password: ""
      },
      showPassword: false, 
    }
  },
  methods: {
    iniciarSesion() {
      this.inicioSesionCargando = true;
      login({
        ...this.form,
      })
        .then(user =>{
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
  <div class="flex justify-center items-center mt-16">
    <div class="bg-white p-8 rounded-md shadow-md">
      <h1 class="text-3xl mb-4 font-bold">Iniciar sesión</h1>
      <form action="#" @submit.prevent="iniciarSesion">
        <div class="mb-4">
          <label for="email" class="block font-bold mb-2">Email</label>
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
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="form.password"
              class="w-full px-4 py-2 border rounded-md"
            >
            <span
              class="absolute right-3 top-3 cursor-pointer"
              @click="showPassword = !showPassword"
            >
              <font-awesome-icon
                :icon="showPassword ? ['fas', 'eye'] : ['fas', 'eye-slash']"
              />
            </span>
          </div>
        </div>
        <PrimaryButton :loading="inicioSesionCargando">Iniciar Sesión</PrimaryButton>
      </form>
    </div>
  </div>
</template>