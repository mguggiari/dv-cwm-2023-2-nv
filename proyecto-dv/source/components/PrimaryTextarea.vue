<script setup>
    defineProps(['modelValue']);
    defineEmits(['update:modelValue']);
</script>

<template>
    <textarea
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  resize-none"
        :value="modelValue" 
        @input="$emit('update:modelValue', $event.target.value)"
    >
    </textarea> 
</template>