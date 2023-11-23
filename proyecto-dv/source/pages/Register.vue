<script setup>
import PrimaryButton from '../components/PrimaryButton.vue';
import PrimaryInput from '../components/PrimaryInput.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { register } from '../services/auth';
import { notificacionSymbol } from "../symbols/symbols";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

library.add(faEye, faEyeSlash);

const { setNotificacion } = inject(notificacionSymbol);

const router = useRouter();
const registroCargando = ref(false);
const nuevoUsuario = ref({
  email: '',
  password: '',
});
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const handleSubmit = async () => {
  registroCargando.value = true;
  try {
    if (nuevoUsuario.value.password !== confirmPassword.value) {
      setNotificacion({
        mensaje: error,
        type: 'error',
      });
    } else {
      await register({ ...nuevoUsuario.value });
      router.push('/');
      setNotificacion({
        mensaje: 'Perfil editado con éxito',
        type: 'success',
      });
    }
  } catch (error) {
    setNotificacion({
      mensaje: error,
      type: 'error',
    });
  }
  registroCargando.value = false;
};
</script>

<template>
  <div class="flex justify-center items-center mt-16">
    <div class="bg-white p-8 rounded-md shadow-md">
      <h1 class="mb-6 text-4xl font-bold leading-tight text-blue-950 md:text-4xl lg:text-5xl">Crea tu cuenta</h1>
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
        <PrimaryButton type="submit" :loading="registroCargando" class="bg-medium-border text-white hover:bg-white hover:text-medium-border w-full">Registrarme</PrimaryButton>
      </form>
    </div>
  </div>
</template>