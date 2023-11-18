<script setup>
import Image from './Image.vue';
import noImage from '/imagenes/no-image.jpg';

defineProps({
    src: {
        required: true,
    },
    alt: {
        type: String,
    },
});
</script>
<template>
    <Image
        :src="src"
        :alt="alt || ''"
        :default="noImage"
        :defaultAlt="defaultAlt || 'Sin imagen de pefil'"
    />
</template>