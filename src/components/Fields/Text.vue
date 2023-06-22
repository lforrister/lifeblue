<template>
    <div>
        <input
            type="text"
            :value="modelValue"
            @input="test($event.target.value)"
        >
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    // == Define Props & Emits == //
    const emit = defineEmits(['update:modelValue'])
    const props = defineProps({
        modelValue: {
            type: String,
            default: '',
            required: true
        }
    })

    function test(target) {
        console.log('emitting!', target)
        emit('update:modelValue', target)
    }

</script>