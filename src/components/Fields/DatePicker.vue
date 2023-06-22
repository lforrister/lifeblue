<template>
    <div v-if="field">
        <label :for="field.id" class="forms__input-label">
            {{ field.label }}
        </label>
        <input
            :type="field.type"
            :id="field.id"
            :name="field.name"
            @input="updateInput($event.target.value)"
            class="forms__input"
        >
    </div>
</template>

<script setup>
    // == Define Props & Emits == //
    const emit = defineEmits(['update:modelValue'])
    const props = defineProps({
        field: {
            type: Object,
            default: null
        }
    })

    // == Functions == //
    function updateInput(target) {
        emit('update:modelValue', target)
    }

</script>