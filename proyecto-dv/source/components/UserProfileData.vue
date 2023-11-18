<script setup>
import ProfileImage from './ProfileImage.vue';

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
            <ProfileImage :src="user.photoUrl"/>
        </div>
    </div>
</template>