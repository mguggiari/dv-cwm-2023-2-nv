<script>
export default {
    name: 'PrimaryInput',
    props: ['modelValue'],
    emits: ['update:modelValue'],
}
</script>

<template>
    <input
        class="w-full p-2 border border-slate-400 rounded"
        :value="modelValue" 
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>