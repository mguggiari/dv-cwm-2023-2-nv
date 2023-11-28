<script setup>
import PrimaryButton from '../components/PrimaryButton.vue';
import PrimaryInput from '../components/PrimaryInput.vue';
import { login } from '../services/auth.js';
import { inject, ref } from 'vue';
import { notificacionSymbol } from '../symbols/symbols';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

library.add(faEye, faEyeSlash);

const { setNotificacion } = inject(notificacionSymbol);

const router = useRouter();
const inicioSesionCargando = ref(false);
const form = ref({
  email: '',
  password: '',
});
const showPassword = ref(false);

const iniciarSesion = async () => {
  try {
    inicioSesionCargando.value = true;
    await login({
      ...form.value,
    });

    setNotificacion({
      mensaje: 'Inicio de sesión exitoso',
      type: 'success',
    });
    
    router.push('/');
  } catch (error) {
    setNotificacion({
      mensaje: error,
      type: 'error',
    });
  }
  inicioSesionCargando.value = false;
}
</script>

<template>
  <form action="#" @submit.prevent="iniciarSesion">
    <div class="mb-4">
      <label for="email" class="block font-bold mb-2">Email</label>
      <PrimaryInput
        :disabled="inicioSesionCargando"
        type="email"
        id="email"
        v-model="form.email"
      />
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
    <PrimaryButton :loading="inicioSesionCargando" class="w-full">Iniciar Sesión</PrimaryButton>
  </form>
</template>