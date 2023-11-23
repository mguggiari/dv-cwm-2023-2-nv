<script setup>
import PrimaryButton from "../components/PrimaryButton.vue";
import PrimaryInput from "../components/PrimaryInput.vue";
import Loader from "../components/Loader.vue";
import UserProfileData from "../components/UserProfileData.vue";
import { ref, inject, onMounted } from "vue";
import { useAuth } from "../composition/useAuth";
import { getUsersByRol, getReservasByUserId, cancelarReservaById } from "../services/user.js";
import { editProfile, editProfilePhoto } from "../services/auth";
import { notificacionSymbol } from "../symbols/symbols";
import { dateToString } from '../helpers/date.js';

const { setNotificacion } = inject(notificacionSymbol);

const { user } = useAuth();

const { 
    editando, 
    edicionCargando, 
    editData, 
    manejoEditShow, 
    manejoEditHide, 
    manejoEditForm 
} = editarPerfil(user);

const { 
    editandoFoto, 
    edicionFotoCargando, 
    fotoData, 
    manejoFotoShow, 
    manejoFotoHide, 
    manejoFotoEditForm,
    manejoCambioFoto 
} = editarFoto();

const admins = ref([]);
const reservas = ref([]);

onMounted(async () => {
    try {
        admins.value = await getUsersByRol("admin");
        reservas.value = await getReservasByUserId(user.value.id);
        console.log(reservas.value);
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
});

function editarPerfil(user) {
    const editando = ref(false);
    const edicionCargando = ref(false);
    const editData = ref({
        displayName:'',
    })

    const manejoEditShow = () => {
        editData.value.displayName = user.value.displayName;        
        editando.value = true;
    }
    const manejoEditHide = () => editando.value = false;
    const manejoEditForm = async () =>  {
        try {
            edicionCargando.value = true;
            await editProfile({
                displayName: editData.value.displayName,
            });

            setNotificacion({
                mensaje: 'Perfil editado con éxito',
                type: 'success',
            });
        } catch (error) {
            setNotificacion({
                mensaje: error,
                type: 'error',
            });
        } 
        edicionCargando.value = false;
    }

    return {
        editando,
        edicionCargando,
        editData,
        manejoEditShow,
        manejoEditHide,
        manejoEditForm,
    }
}

function editarFoto() {
    const editandoFoto = ref(false);
    const edicionFotoCargando = ref(false);
    const fotoData = ref({
        file: null,
        preview: null,
    });

    const manejoFotoShow = () => editandoFoto.value = true;
    const manejoFotoHide = () => editandoFoto.value = false;
    const manejoFotoEditForm = async () =>  {
        edicionFotoCargando.value = true;

        try {
            await editProfilePhoto(fotoData.value.file);
        } catch (error) {
            console.error("Error al subir la foto", error);
        }

        edicionFotoCargando.value = false;
    }

    const manejoCambioFoto = event => {
        fotoData.value.file = event.target.files[0];
        
        const reader = new FileReader();

        reader.addEventListener('load', function() {
            fotoData.value.preview = reader.result;
        });

        reader.readAsDataURL(fotoData.value.file);
    }

    return {
        editandoFoto,
        edicionFotoCargando,
        fotoData,
        manejoFotoShow,
        manejoFotoHide,
        manejoFotoEditForm,
        manejoCambioFoto
    }
}

async function cancelarReserva(reserva) {
    console.log(reserva, "cancelar reserva");
    try {
        await cancelarReservaById(reserva);
        setNotificacion({
            mensaje: 'Reserva cancelada con éxito',
            type: 'success',
        });
    } catch (error) {
        setNotificacion({
            mensaje: error,
            type: 'error',
        });
    }
}

</script>

<template>
    <section>
        <h2 class="text-base font-semibold leading-7 text-gray-900">Chatear con asesores</h2>
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

    <section>
        <div class="pb-64">
            <div class="max-w-7xl px-4 pt-20 mx-auto text-center sm:text-left">
                <h1 class="mb-6 text-4xl font-bold leading-tight text-blue-950 md:text-4xl lg:text-5xl">Mi perfil</h1>
            </div>
            <template v-if="user.fullProfileLoaded">
                <template v-if="!editando && !editandoFoto">
                    <UserProfileData :user="user" />
                    
                    <PrimaryButton @click="manejoEditShow">Editar mis datos</PrimaryButton>
                    
                    <PrimaryButton @click="manejoFotoShow">Editar mi Foto</PrimaryButton>
                </template>
                <template v-else-if="editando">
                    <form action="#" method="post" @submit.prevent="manejoEditForm">
                        <div>
                            <label for="displayName">Nombre de usuario</label>
                            <PrimaryInput 
                                v-model="editData.displayName" 
                                id="displayName" 
                                :disabled="edicionCargando"
                            />
                        </div>

                        <PrimaryButton :loading="edicionCargando">Actualizar dato</PrimaryButton>
                    </form>
                    <PrimaryButton @click="manejoEditHide" :disabled="edicionCargando">Cancelar</PrimaryButton>
                </template>
                <template v-else>
                    <form action="#" method="post" @submit.prevent="manejoFotoEditForm">
                        <div>
                            <label for="nuevaFoto">Imagen de perfil</label>
                            <input
                                class="w-full px-4 py-2 border rounded-md disabled:bg-slate-200" 
                                type="file" 
                                id="nuevaFoto" 
                                :disabled="edicionFotoCargando"
                                @change="manejoCambioFoto"
                            />
                        </div>
                        <div v-if="fotoData.preview !== null">
                            <p>Previsualización de la imagen seleccionada</p>
                            <img :src="fotoData.preview" alt="">
                        </div>
                        <PrimaryButton :loading="edicionFotoCargando">Actualizar</PrimaryButton>
                        <PrimaryButton @click="manejoFotoHide">Cancelar</PrimaryButton>
                    </form>
                </template>
            </template>
            <template v-else>
                <Loader />
            </template>
        </div>
    </section>

    <section>
        <h2 class="text-base font-semibold leading-7 text-gray-900">Mis reservas</h2>
        <p>Estos son los cursos que has reservado</p>
         <div class="mt-6 border-t border-gray-100">
         <dl v-for="reserva in reservas" class="divide-y divide-gray-200">
             <div class="py-3 flex justify-between text-sm font-medium">
                 <dt class="text-gray-500">Curso</dt>
                    <dd class="text-gray-900">{{ reserva.productoReservado.titulo }}</dd>
                </div>
                 <div class="py-3 flex justify-between text-sm font-medium">
                    <dt class="text-gray-500">Fecha de reserva</dt>
                    <dd class="text-gray-900">{{ dateToString(reserva.timestamp) }}</dd>
             </div>
             <PrimaryButton @click="cancelarReserva(reserva.id)">cancelar</PrimaryButton>
         </dl>
     </div>
 </section>
</template>
