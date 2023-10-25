<script>
import PrimaryButton from '../components/PrimaryButton.vue';
import PrimaryInput from '../components/PrimaryInput.vue';
import { register } from '../services/auth';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

library.add(faEye, faEyeSlash);

export default {
  name: "Register",
  components: { PrimaryButton, PrimaryInput,FontAwesomeIcon },
  data() {
    return {
      registroCargando: false,
      nuevoUsuario: {
        email: '',
        password: '',
      },
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
    };
  },
  methods: {
    async handleSubmit() {
      this.registroCargando = true;
      try {
        if (this.nuevoUsuario.password !== this.confirmPassword) {
          alert("Las contraseñas no coinciden.");
        } else {
          await register({ ...this.nuevoUsuario });
          this.$router.push('/');
        }
      } catch (error) {
        console.log(error);
      }
      this.registroCargando = false;
    },
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
          <PrimaryInput type="email" id="email" v-model="nuevoUsuario.email" />
        </div>
        <div class="mb-4">
          <label for="password" class="block font-bold mb-2">Contraseña</label>
          <div class="relative">
            <PrimaryInput
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="nuevoUsuario.password"
            />
            <span
              class="absolute right-3 top-3 cursor-pointer"
              @click="showPassword = !showPassword"
            >
              <font-awesome-icon
                :icon="showPassword ? ['fa', 'eye'] : ['fa', 'eye-slash']"
              />
            </span>
          </div>
        </div>
        <div class="mb-4">
          <label for="confirmPassword" class="block font-bold mb-2">Confirmar Contraseña</label>
          <div class="relative">
            <PrimaryInput
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirmPassword"
              v-model="confirmPassword"
            />
            <span
              class="absolute right-3 top-3 cursor-pointer"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              <font-awesome-icon
                :icon="showConfirmPassword ? ['fa', 'eye'] : ['fa', 'eye-slash']"
              />
            </span>
          </div>
        </div>
        <PrimaryButton :loading="registroCargando" class="bg-medium-border text-white hover:bg-white hover:text-medium-border w-full">Registrarme</PrimaryButton>
      </form>
    </div>
  </div>
</template>