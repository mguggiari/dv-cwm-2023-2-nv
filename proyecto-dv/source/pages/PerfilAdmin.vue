<script>
import { getUsersByRol } from "../services/user.js";

export default {
    name: "PerfilAdmin",
    data() {
        return {
            users: [],
        };
    },
    methods: {
        cargarUsers() {
            getUsersByRol("user")
                .then((users) => {
                    this.users = users;
                    console.log(users)
                })
                .catch((error) => {
                    console.error("Error al obtener users:", error);
                });
        },
    },
    mounted() {
        this.cargarUsers();
    },
};
</script>

<template>
    <h1>Mi perfil</h1>
    <p>CHATEAR con clientes</p>
    <div v-for="user in users">
        <p>{{ user.email }}</p>
        <router-link 
            class="text-blue-500 hover:underline"
            :to="`/usuario/${user.id}/chat`"
        >{{ user.email }}</router-link>
    </div>
</template> 