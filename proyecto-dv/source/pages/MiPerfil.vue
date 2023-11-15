<script setup>
import PrimaryButton from "../components/PrimaryButton.vue";
import PrimaryInput from "../components/PrimaryInput.vue";
import Loader from "../components/Loader.vue";
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
        } catch (error) {
            console.error(error);
            //notificaciones
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
    <section>
        <div class="pb-64">
            <div class="max-w-7xl px-4 pt-20 mx-auto text-center sm:text-left">
                <h1 class="mb-6 text-4xl font-bold leading-tight text-blue-950 md:text-4xl lg:text-5xl">Mi perfil</h1>
            </div>
            <template v-if="user.fullProfileLoaded">
                <template v-if="!editando && !editandoFoto">
                    <UserProfileData :user="user" />
                    
                    <PrimaryButton
                        @click="manejoEditShow"
                    >
                    Editar mis datos</PrimaryButton>
                    
                    <PrimaryButton
                        @click="manejoFotoShow"
                    >
                    Editar mi Foto</PrimaryButton>
                </template>
                <template v-else-if="editando">
                    <form action="#" method="post" @submit.prevent="manejoEditForm">
                        <div>
                            <label for="displayName">Nombre de usuario</label>
                            <PrimaryInput 
                                v-model="editData.displayName" id="displayName" 
                                :disabled="edicionCargando"
                            />
                        </div>

                        <PrimaryButton
                            :loading="edicionCargando"
                        >
                        Actualizar dato</PrimaryButton>
                    </form>
                    <PrimaryButton
                        @click="manejoEditHide"
                        :disabled="edicionCargando"
                    >Cancelar</PrimaryButton>
                </template>
                <template v-else>
                    <form action="#" method="post" @submit.prevent="manejoFotoEditForm">
                        <div>
                            <label for="nuevaFoto">
                            Imagen de perfil
                            </label>
                            <input
                                class="w-full px-4 py-2 border rounded-md disabled:bg-slate-200" 
                                type="file" 
                                id="nuevaFoto" 
                                :disabled="edicionFotoCargando"
                                @change="manejoCambioFoto"
                            />
                        </div>
                        <div
                            v-if="fotoData.preview !== null"
                        >
                            <p>Previsualización de la imagen seleccionada</p>
                            <img :src="fotoData.preview" alt="">
                        </div>
                        <PrimaryButton
                            :loading="edicionFotoCargando"
                        >Actualizar</PrimaryButton>
                        <PrimaryButton
                            @click="manejoFotoHide"
                        >Cancelar</PrimaryButton>
                    </form>
                </template>
            </template>
            <template v-else>
                <Loader />
            </template>
        </div>

    </section>
</template> 