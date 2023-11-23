<script setup>
import LoadingContext from '../components/LoadingContext.vue';
import { ref, onMounted } from 'vue';
import { getUsersByRol } from '../services/user.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

library.add(faUser);

const users = ref([]);
const usuariosCargando = ref(true);

onMounted(async () => {
    try {
        users.value = await getUsersByRol('user');
        usuariosCargando.value = false;
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
});
</script>

<template>
    <div class="pb-64">
        <div class="max-w-7xl px-4 pt-20 mx-auto text-center sm:text-left">
            <h1 class="mb-6 text-4xl font-bold leading-tight text-blue-950 md:text-4xl lg:text-5xl">
                Usuarios
            </h1>
        </div>
    </div>
    <div class="max-w-7xl pb-20 mx-auto -mt-48">
        <h2 class="mb-10 text-lg text-gray-600 md:text-xl">Chats con clientes</h2>
        <LoadingContext :loading="usuariosCargando">
            <ul class="divide-y divide-gray-100">
                <li v-for="user in users" :key="user.id" class="flex justify-between gap-x-6 py-5">
                    <div class="flex min-w-0 gap-x-4">
                        <div class="flex items-center justify-center w-12 h-12 mb-4 bg-gray-50 rounded-full">
                            <FontAwesomeIcon :icon="['fas', 'user']" class="text-2xl text-gray-200" />
                        </div>
                        <div class="min-w-0 flex-auto">
                            <p class="text-sm font-semibold leading-6 text-gray-900">{{ user.email }}</p>
                            <router-link class="text-blue-500 hover:underline" :to="`/usuario/${user.id}/chat`">
                                {{ user.email }}
                            </router-link>
                        </div>
                    </div>
                </li>
            </ul>
        </LoadingContext>
    </div>
</template>
