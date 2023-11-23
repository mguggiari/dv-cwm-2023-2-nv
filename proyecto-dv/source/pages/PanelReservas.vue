<script setup>
import LoadingContext from '../components/LoadingContext.vue';
import ProfileImage from '../components/ProfileImage.vue'; 
import { ref, onMounted } from 'vue';
import { getReservas } from '../services/user';

const reservas = ref([]);
const reservasCargando = ref(true);

onMounted(async () => {
    try {
        reservas.value = await getReservas();
        reservasCargando.value = false;
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
});
</script>

<template>
    <div class="pb-64">
        <div class="max-w-7xl px-4 pt-20 mx-auto text-center sm:text-left">
            <h1 class="mb-6 text-4xl font-bold leading-tight text-blue-950 md:text-4xl lg:text-5xl">Reservas</h1>
        </div>
    </div>
    <LoadingContext :loading="reservasCargando">
        <div v-for="reserva in reservas">
            <p>{{ reserva.productoReservado.titulo }}</p>
            <p>{{ reserva.usuarioReservado.email }}</p>
            <p>{{ reserva.usuarioReservado.displayName }}</p>
            <ProfileImage :src="reserva.usuarioReservado.photoUrl" class="h-12 w-12 flex-none rounded-full bg-gray-50"/>
        </div>
    </LoadingContext>
    <ul role="list" class="divide-y divide-gray-100">
        <li class="flex justify-between gap-x-6 py-5">
            <div class="flex min-w-0 gap-x-4">
            <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
            <div class="min-w-0 flex-auto">
                <p class="text-sm font-semibold leading-6 text-gray-900">Leslie Alexander</p>
                <p class="mt-1 truncate text-xs leading-5 text-gray-500">leslie.alexander@example.com</p>
            </div>
            </div>
            <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p class="text-sm leading-6 text-gray-900">Co-Founder / CEO</p>
            <p class="mt-1 text-xs leading-5 text-gray-500">Last seen <time datetime="2023-01-23T13:23Z">3h ago</time></p>
            </div>
        </li>
    </ul>
</template> 