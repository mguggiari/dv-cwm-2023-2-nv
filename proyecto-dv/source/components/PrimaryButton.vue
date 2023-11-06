<script setup>
import Loader from './Loader.vue';
defineProps({
    loading: {
        type: Boolean,
        default: false,
    }
})
</script>

<template>
    <button 
        class="bg-blue-800  text-white p-2 rounded hover:bg-blue-900 active:bg-blue-700 transition disabled:bg-gray-100 motion-reduce:transition-none" 
        type="submit"
        :disabled="loading"
    >
        <template v-if="!loading">
            <slot>Enviar</slot>
        </template>
        <template v-else>
            <Loader size="small" />
        </template>
    </button>
</template>