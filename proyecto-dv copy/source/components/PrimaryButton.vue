<script>
import Loader from './Loader.vue';

export default {
    name: 'PrimaryButton',
    components: { Loader },
    props: {
        loading: {
            type: Boolean,
            default: false,
        }
    },
}
</script>

<template>
    <button 
        class="bg-red-900 text-white p-2 rounded w-full hover:bg-cyan-950 active:bg-cyan-700 transition disabled:bg-gray-100 motion-reduce:transition-none" 
        type="submit"
        :disabled="loading"
    >
        <template v-if="!loading">
            <slot>Enviar</slot>
        </template>
        <template v-else>
            <Loader />
        </template>
    </button>
</template>