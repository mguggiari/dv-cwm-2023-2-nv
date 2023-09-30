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
          this.$emit('login', {...user});
        })
        .finally(() => {
          this.inicioSesionCargando = false;
        });
    }
  }
};
</script>

<template>
  <section>
    <div class="px-4 py-20 mx-auto max-w-7xl">
      <div class="w-full px-0 pt-5 pb-6 mx-auto mt-4 mb-0 space-y-4 bg-transparent border-0 border-gray-200 rounded-lg md:bg-white md:border sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 md:px-6 sm:mt-8 sm:mb-5">
        <h1 class="mb-5 text-xl font-light text-left text-gray-800 sm:text-center">Log in to your account</h1>
        <form action="#" @submit.prevent="iniciarSesion" class="pb-1 space-y-4">
          <label class="block">
            <span class="block mb-1 text-xs font-medium text-gray-700">Your Email</span>
            <input class="form-input" type="email" placeholder="Ex. james@bond.com" inputmode="email" required />
          </label>
          <label class="block">
            <span class="block mb-1 text-xs font-medium text-gray-700">Your Password</span>
            <input class="form-input" type="password" placeholder="••••••••" required />
          </label>
          <PrimaryButton>Iniciar Sesión</PrimaryButton>
        </form>
      </div>
      <p class="mb-4 space-y-2 text-sm text-left text-gray-600 sm:text-center sm:space-y-0">
        <a href="/registro" class="w-full btn btn-sm btn-link sm:w-auto">Create an account</a>
      </p>
    </div>
  </section>
</template>