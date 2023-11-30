<script setup>
import LoadingContext from '../components/LoadingContext.vue';
import ProfileImage from '../components/ProfileImage.vue'; 
import { ref, onMounted } from 'vue';
import { getReservas } from '../services/user';
import { dateToString } from '../helpers/date.js';

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
    <div class="max-w-7xl pb-20 mx-auto -mt-48">
        <LoadingContext :loading="reservasCargando">
            <div v-if="reservas.length === 0" class="text-center text-gray-500">
                Aún no hicieron reservas.
            </div>
            <ul v-else class="divide-y divide-gray-100">
                <li v-for="reserva in reservas" :key="reserva.id" class="flex flex-col sm:flex-row justify-between gap-x-6 py-5">
                    <div class="min-w-0 gap-x-4">
                        <h2 class="mb-2 text-blue-900">Usuario:</h2>
                        <div class="flex">
                            <ProfileImage :src="reserva.usuarioReservado.photoUrl" class="h-12 w-12 flex-none rounded-full bg-gray-50" />
                            <div class="min-w-0 flex-auto">
                            <p class="text-sm font-semibold leading-6 text-gray-900">{{ reserva.usuarioReservado.displayName }}</p>
                            <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ reserva.usuarioReservado.email }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p class="text-sm leading-6 text-gray-900"><span class="text-blue-900">Producto reservado: </span>{{ reserva.productoReservado.titulo }}</p>
                        <p class="mt-1 text-sm leading-6 text-gray-900" v-if="reserva.estado !== 'Cancelada'"><span class="text-blue-900">Estado de reserva: </span>En espera</p>
                        <p class="mt-1 text-sm leading-6 text-gray-900" v-else><span class="text-blue-900">Estado de reserva: </span>{{ reserva.estado }}</p>
                        <p class="text-sm leading-6 text-gray-900" v-if="reserva.estado !== 'Cancelada'"><span class="text-blue-900">Fecha de reserva: </span>{{ dateToString(reserva.timestamp) }}</p>
                        <p class="mt-1 text-sm leading-6 text-gray-900" v-else><span class="text-blue-900">Fecha de reserva cancelada: </span>{{ dateToString(reserva.timestampCancelacion) }}</p>
                    </div>
                </li>
            </ul>
        </LoadingContext>
    </div>
</template>