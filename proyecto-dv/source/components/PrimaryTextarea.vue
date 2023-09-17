<script>
export default {
    name: 'PrimaryTextarea',
    props: ['modelValue'],
    emits: ['update:modelValue'],
}
</script>

<template>
    <textarea
        class="w-full border border-slate-400 rounded"
        :value="modelValue" 
        @input="$emit('update:modelValue', $event.target.value)"
    >
    </textarea> 
</template>