<template>
    <div>
        <label :for="field.id" class="forms__input-label">
            {{ field.label }} {{ field.required ? '*' : '' }}
        </label>
        <select
            :name="field.name"
            :id="field.id"
            @change="updateInput($event.target.value)"
            class="forms__input"
        >
            <option value="" disabled selected>{{ field.placeholder }}</option>
            <option
                v-for="option in field.options"
                :value="option.value"
                :selected="option.value === field.input"
                :key="option.id"
            >
                {{ option.label }}
            </option>
        </select>
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
