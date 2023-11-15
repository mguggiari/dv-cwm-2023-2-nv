<script setup>
defineProps({
    user: {
        type: Object,
        required: true,
    },
});
</script>
<template>
    <div>
                        <dl>
                            <dt>
                                Email de usuario: {{ user.email }}
                            </dt>
                            <dt>
                                Nombre de usuario {{ user.displayName || "Sin nombre" }}
                            </dt>
                        </dl>
                        <div>
                            <img 
                                v-if="user.photoUrl != null"
                                :src="user.photoUrl"
                            >
                            <p v-else>No tienes foto de perfil -  poneruser
                            </p>
                        </div>
                    </div>
</template>