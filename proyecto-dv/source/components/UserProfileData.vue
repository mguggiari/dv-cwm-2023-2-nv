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
    <div class="w-full xl:w-4/6">
        <h2 class="mb-10 text-lg text-blue-800 md:text-xl">Mis datos</h2>
        <div class="flex flex-col space-y-16">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-4">
                <ProfileImage :src="user.photoUrl" class="object-cover w-full h-40 col-span-1 bg-center" />
                <div class="col-span-1 md:col-span-3 flex items-center"> 
                    <ul>
                        <li class="mb-3 text-sm font-normal text-gray-800">
                            Email de usuario: <span class="text-gray-900 font-bold">{{ user.email }}</span>
                        </li>
                        <li class="mb-3 text-sm font-normal text-gray-800">
                            Nombre de usuario: <span class="text-gray-900 bold font-bold">{{ user.displayName || "Sin nombre de usuario" }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>