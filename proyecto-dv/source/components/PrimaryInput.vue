<script setup>
    defineProps(['modelValue']);
    defineEmits(['update:modelValue']);
</script>

<template>
    <input
        class="w-full px-4 py-2 border rounded-md disabled:bg-slate-200"
        :value="modelValue" 
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>