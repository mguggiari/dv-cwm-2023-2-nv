<script setup>
import { computed } from 'vue';
import { btn_sizes, btn_size_normal, btn_size_small } from './../constants/constants.js';

const props = defineProps({
    size: {
        type: String,
        default: btn_size_normal,
        validator: value => btn_sizes.includes(value),
    },
});

const loaderClass = computed(() => {
    return {
        'loader-mini': props.size === btn_size_small,
        'loader': props.size === btn_size_normal || !btn_sizes.includes(props.size),
    }
});
</script>

<template>
    <div :class="loaderClass">
        <div class="sr-only">Cargando</div>
    </div>
</template>