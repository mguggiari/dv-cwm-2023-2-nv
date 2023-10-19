<script>
import { getUsersByRol } from "../services/user.js";

export default {
    name: "MiPerfil",
    data() {
        return {
            admins: [],
        };
    },
    methods: {
        cargarAdmins() {
            getUsersByRol("admin")
                .then((admins) => {
                    this.admins = admins;
                    //console.log(admins)
                })
                .catch((error) => {
                    console.error("Error al obtener admins:", error);
                });
        },
    },
    mounted() {
        this.cargarAdmins();
    },
};
</script>

<template>
    <h1>Mi perfil</h1>
    <p>CHATEAR con asesores</p>
    <div v-for="admin in admins">
        <p>{{ admin.email }}</p>
        <router-link 
            class="text-blue-500 hover:underline"
            :to="`/usuario/${admin.id}/chat`"
        >{{ admin.email }}</router-link>
    </div>
</template> 