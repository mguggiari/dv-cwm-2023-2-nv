<script setup>
import LoadingContext from "../components/LoadingContext.vue";
import PrimaryButton from "../components/PrimaryButton.vue";
import PrimaryInput from "../components/PrimaryInput.vue";
import UserProfileData from "../components/UserProfileData.vue";
import { ref } from "vue";
import { useAuth } from "../composition/useAuth";
import { editProfile, editProfilePhoto } from "../services/auth";

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
</script>
<template>
    <LoadingContext :loading="!user.fullProfileLoaded">
        <template v-if="!editando && !editandoFoto">
            <UserProfileData :user="user" />
            <div>
                <PrimaryButton @click="manejoEditShow" class=" me-5">Editar mis datos</PrimaryButton>
                <PrimaryButton @click="manejoFotoShow">Editar mi Foto</PrimaryButton>
            </div>
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
                <PrimaryButton :loading="edicionCargando" class="mt-5 mb-5">Actualizar dato</PrimaryButton>
            </form>
            <button @click="manejoEditHide" :disabled="edicionCargando" class="bg-red-50 ring-red-100 text-red-700 ring-1 ring-inset p-2 rounded">Cancelar</button>
        </template>
        <template v-else>
            <form action="#" method="post" @submit.prevent="manejoFotoEditForm">
                <div>
                    <label for="nuevaFoto">Imagen de perfil</label>
                    <input
                        class="w-full px-1.5 py-1 border border-gray-400 rounded disabled:bg-gray-100" 
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
                <div class="mt-5">
                    <PrimaryButton :loading="edicionFotoCargando" class=" me-5">Actualizar</PrimaryButton>
                    <button @click="manejoFotoHide" class="bg-red-50 ring-red-100 text-red-700 ring-1 ring-inset p-2 rounded">Cancelar</button>
                </div>
            </form>
        </template>
    </LoadingContext>
</template>