<script>
import PrimaryButton from '../components/PrimaryButton.vue';

export default {
    name: "Login",
    components: { PrimaryButton }
};
</script>
<template>
    <h1 class="text-3xl mb-4 font-bold">
        Iniciar sesion
    </h1>
    <form action="#">
        <div>
            <label for="email">Email</label>
            <input type="email" id="email">
        </div>
        <div>
            <label for="password">Contraseña</label>
            <input type="password" id="password">
        </div>
        <PrimaryButton>Iniciar Sesión</PrimaryButton>
    </form>
</template>