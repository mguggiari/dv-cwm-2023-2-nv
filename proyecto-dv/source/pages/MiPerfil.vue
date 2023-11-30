<script setup>
import  UserEditData from "../components/UserEditData.vue";
import LoadingContext from "../components/LoadingContext.vue";
import Modal from '../components/Modal.vue';
import { ref, inject, onMounted } from "vue";
import { useAuth } from "../composition/useAuth";
import { getUsersByRol, getReservasByUserId, cancelarReservaById } from "../services/user.js";
import { notificacionSymbol } from "../symbols/symbols";
import { dateToString } from '../helpers/date.js';

const { setNotificacion } = inject(notificacionSymbol);

const { user } = useAuth();

const admins = ref([]);
const reservas = ref([]);
const reservasCargando = ref(true);
const isModalVisible = ref(false);
const reservaSeleccionada = ref(null);

onMounted(async () => {
    try {
        admins.value = await getUsersByRol('admin');
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
    try {
        reservas.value = await getReservasByUserId(user.value.id);
        reservasCargando.value = false;
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
});

function abrirModalCancelarReserva(reserva) {
    reservaSeleccionada.value = reserva;
    isModalVisible.value = true;
}

function cerrarModal() {
    isModalVisible.value = false;
}

async function confirmarCancelarReserva() {
    if (reservaSeleccionada.value) {
        await cancelarReservaById(reservaSeleccionada.value.id);
        // Actualizar reservas después de la cancelación
        setNotificacion({
            mensaje: 'Reserva cancelada con éxito',
            type: 'success',
        });
        reservas.value = await getReservasByUserId(user.value.id);
        cerrarModal();
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
        <h2 class="mb-10 text-lg text-blue-800 md:text-xl">Cursos reservados</h2>
        <LoadingContext :loading="reservasCargando">
            <div v-if="reservas.length === 0">
                <p>No tienes reservas aún</p>
            </div>
            <div v-else>
                <div v-for="reserva in reservas" class="mt-6">
                    <h3 class="text-gray-900 font-bold">
                        {{ reserva.productoReservado.titulo }}
                    </h3>
                    <dl  class="divide-y divide-gray-200">
                        <div class="py-3 flex justify-between text-sm font-medium">
                            <dt class="text-gray-500">Precio</dt>
                            <dd class="text-gray-900">$ {{ reserva.productoReservado.precio }}</dd>   
                        </div>
                        <div v-if="reserva.estado !== 'Cancelada'" class="py-3 flex justify-between text-sm font-medium">
                            <dt class="text-gray-500">Fecha de reserva</dt>
                            <dd class="text-gray-900">{{ dateToString(reserva.timestamp) }}</dd>
                        </div>
                        <div v-else class="py-3 flex justify-between text-sm font-medium">
                            <dt class="text-gray-500">Fecha de reserva</dt>
                            <dd class="text-gray-900">{{ dateToString(reserva.timestampCancelacion) }}</dd>
                        </div>
                        <div v-if="reserva.estado !== 'Cancelada'" class="py-3 flex justify-between text-sm font-medium">
                            <dt class="text-gray-500">Estado</dt>
                            <dd class="text-gray-900">En espera</dd>
                        </div>
                        <div v-else class="py-3 flex justify-between text-sm font-medium">
                            <dt class="text-gray-500">Estado</dt>
                            <dd class="text-gray-900">{{ reserva.estado }}</dd>
                        </div>
                        <div v-if="reserva.estado !== 'Cancelada'" class="py-3 flex justify-between text-sm font-medium">
                            <dt class="text-gray-500">Cancelar reserva</dt>
                            <dd class="text-gray-900"> 
                                <button @click="abrirModalCancelarReserva(reserva)" class="bg-red-50 ring-red-100 text-red-700 ring-1 ring-inset p-2 rounded">
                                    Cancelar reserva
                                </button>
                            </dd>
                        </div>
                        <div v-else class="py-3 flex justify-between text-sm font-medium">
                            <dt class="text-gray-500">Cancelar reserva</dt>
                            <dd class="text-red-800 p-2">Reserva cancelada</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </LoadingContext>

        <hr class="mt-10 border-b border-blue-200">
        
        <Modal
            v-if="isModalVisible"
            title="Cancelar reserva"
            :content="'¿Estás seguro que deseas cancelar la reserva de ' + (reservaSeleccionada ? reservaSeleccionada.productoReservado.titulo : '') + '?'"
            buttonText="Confirmar"
            :cancelFunction="confirmarCancelarReserva"
            modalClass="error"
            @closeModal="cerrarModal"
        />
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