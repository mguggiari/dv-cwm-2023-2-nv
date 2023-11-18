<script setup>
defineProps({
    src: {
        type: String,
        required: true,
    },
    alt: {
        type: String,
        required: true,
    },
    default: {
    },
    defaultAlt: {
        type: String,
    }
});
</script>

<template>
    <img 
        v-if="src != null"
        :alt="alt"
        :src="src"
    >
    <img 
        v-else 
        :src="default" 
        :alt="defaultAlt || 'Sin imagen'"
    >
</template>