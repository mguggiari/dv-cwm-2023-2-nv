<script setup>
import { computed } from "vue";

const props = defineProps({
    data: {
        type: Object,
        required: true,
    }
});

const bgClase = computed(() => {
    switch (props.data.type) {
        case 'success':
            return 'bg-green-50 ring-green-100 text-green-700';
        
        case 'error':
            return 'bg-red-50 ring-red-100 text-red-700';

        default:
            return 'bg-cyan-50 ring-cyan-00 text-cyan-800';
    }
});
</script>

<template>
    <div v-if="data.mensaje !== ''" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity"></div>
    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div class="ring-1 ring-inset relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" :class="bgClase">
                <div class="flex justify-end pe-4">
                    <button v-if="data.closable" type="button" class="px-2 text-2xl align-end text-black flex justify-end" @click="$emit('close')">&times;</button>
                </div>
                <div class="p-3">
                    <div class="sm:flex sm:items-start">
                        <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <p>{{ data.mensaje }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

