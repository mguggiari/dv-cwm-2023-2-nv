<script setup>
import  UserEditData from "../components/UserEditData.vue";
import { ref, inject, onMounted } from "vue";
import { useAuth } from "../composition/useAuth";
import { getUsersByRol, getReservasByUserId, cancelarReservaById } from "../services/user.js";
import { notificacionSymbol } from "../symbols/symbols";
import { dateToString } from '../helpers/date.js';

const { setNotificacion } = inject(notificacionSymbol);

const { user } = useAuth();

const admins = ref([]);
const reservas = ref([]);

onMounted(async () => {
    try {
        admins.value = await getUsersByRol("admin");
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
    try {
        reservas.value = await getReservasByUserId(user.value.id);
        //console.log(reservas.value);
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
});

async function cancelarReserva(reserva) {
    //console.log(reserva, "cancelar reserva");
    try {
        await cancelarReservaById(reserva);
        setNotificacion({
            mensaje: 'Reserva cancelada con éxito',
            type: 'success',
        });
    } catch (error) {
        setNotificacion({
            mensaje: 'Error al cancelar reserva, aguarde unos segundos y vuelva a intentar, por favor.',
            type: 'error',
        });
    }
}
</script>

<template>
    <section class="px-4 py-10 mx-auto max-w-7xl">
        <h1 class=" pb-8 mb-12  text-4xl font-bold leading-tight text-blue-950 md:text-4xl lg:text-5xl">
            Mi perfil
        </h1>
        <UserEditData />
        <hr class="mt-10 border-b border-blue-200">
    </section>
    <section class="px-4 p mx-auto max-w-7xl">
        <h2 class="mb-10 text-lg text-blue-800 md:text-xl">Mis reservas</h2>
        <div v-if="reservas.length === 0">
            <p>No tienes reservas aún</p>
        </div>
        <div v-else>
            <div class="mt-6 border-t border-gray-100">
                <dl v-for="reserva in reservas" class="divide-y divide-gray-200">
                    <h3>
                        {{ reserva.productoReservado.titulo }}
                    </h3>
                    <div class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Precio</dt>
                        <dd class="text-gray-900">$ {{ reserva.productoReservado.precio }}</dd>   
                    </div>
                    <div v-if="reserva.estado !== 'cancelada'" class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Fecha de reserva</dt>
                        <dd class="text-gray-900">{{ dateToString(reserva.timestamp) }}</dd>
                    </div>
                    <div v-else class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Fecha de reserva</dt>
                        <dd class="text-gray-900">{{ dateToString(reserva.timestampCancelacion) }}</dd>
                    </div>
                    <div v-if="reserva.estado !== 'cancelada'" class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Estado</dt>
                        <dd class="text-gray-900">En espera</dd>
                    </div>
                    <div v-else class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Estado</dt>
                        <dd class="text-gray-900">{{ reserva.estado }}</dd>
                    </div>
                    <div class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Cancelar reserva</dt>
                        <dd class="text-gray-900"> 
                            <button @click="cancelarReserva(reserva.id)" class="bg-red-50 ring-red-100 text-red-700 ring-1 ring-inset p-2 rounded">
                                Cancelar reserva
                            </button>
                        </dd>
                    </div>
                </dl>
        </div>
        </div>
        
        <hr class="mt-10 border-b border-blue-200">
    </section>
    <section class="px-4 pb-10 pt-10 mx-auto max-w-7xl">
        <h2 class="mb-10 text-lg text-blue-800 md:text-xl">Chatear con asesores</h2>
        <p>Si tienes algún problema o duda, no dudes en contactarte con nuestros administradores.</p>
        <div class="mt-6 border-t border-gray-100">
            <dl v-for="admin in admins" class="divide-y divide-gray-200">
                <div class="py-3 flex justify-between text-sm font-medium">
                    <dt class="text-gray-500">Nombre</dt>
                    <dd class="text-gray-900">Admin</dd>
                </div>
                <div class="py-3 flex justify-between text-sm font-medium">
                    <dt class="text-gray-500">Email</dt>
                    <dd class="text-gray-900">
                        <router-link class="text-blue-500 hover:underline" :to="`/usuario/${admin.id}/chat`">{{ admin.email }}</router-link>
                    </dd>
                </div>
            </dl>
        </div>
    </section>
</template>