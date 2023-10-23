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
    <div class="pb-64">
        <div class="max-w-7xl px-4 pt-20 mx-auto text-center sm:text-left">
            <h1 class="mb-3 text-4xl font-bold leading-tight text-gray-900 md:text-5xl md:font-extrabold">Mi perfil || Admin</h1>
        </div>
    </div>
    <div class="max-w-7xl pb-20 mx-auto -mt-48">
        <h2 class="mb-10 text-lg text-gray-600 md:text-xl">
            Chats con clientes
        </h2>
        <ul v-for="user in users" class="divide-y divide-gray-100">
            <li class="flex justify-between gap-x-6 py-5">
                <div class="flex min-w-0 gap-x-4">
                    <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                    <div class="min-w-0 flex-auto">
                        <p class="text-sm font-semibold leading-6 text-gray-900">{{ user.email }}</p>
                        <router-link 
                            class="text-blue-500 hover:underline"
                            :to="`/usuario/${user.id}/chat`"
                        >
                            {{ user.email }}
                        </router-link>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template> 