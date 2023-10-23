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
    <section>
        <div class="pb-64">
            <div class="max-w-7xl px-4 pt-20 mx-auto text-center sm:text-left">
                <h1 class="mb-3 text-4xl font-bold leading-tight text-gray-900 md:text-5xl md:font-extrabold">Mi perfil</h1>
            </div>
        </div>
        <div class="max-w-7xl pb-20 mx-auto -mt-48">
            <h2 class="text-base font-semibold leading-7 text-gray-900">Chatear con asesores</h2>
            <p>Si tenes algún problema o duda no dudes en contactarte con nuestros administradores.</p>
            <div class="mt-6 border-t border-gray-100">
                <dl v-for="admin in admins" class="divide-y divide-gray-200">
                    <div class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Nombre</dt>
                        <dd class="text-gray-900">Admin</dd>
                    </div>
                    <div class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Email</dt>
                        <dd class="text-gray-900">
                            <router-link 
                                class="text-blue-500 hover:underline"
                                :to="`/usuario/${admin.id}/chat`"
                            >{{ admin.email }}</router-link>
                        </dd>
                    </div>
                </dl>        
            </div>
        </div>
    </section>
</template> 