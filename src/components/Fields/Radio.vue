<template>
    <fieldset class="forms__fieldset">
        <legend class="forms__input-label radio__legend">
            {{ field.label }} {{ field.required ? '*' : '' }}
        </legend>

        <div v-for="option in field.options" :key="field.id" class="radio__options">
            <input
                :type="field.type"
                :id="option.id"
                :name="field.name"
                :value="option.value"
                @change="updateInput($event.target.value)"
                class="forms__radio-input"
            />
            <span
                class="forms__radio"
                :class="option.value === field.input ? 'is-selected' : ''"
            ></span>
            <label :for="option.id" class="forms__options-label">
                {{ option.label }}
            </label>
        </div>
    </fieldset>
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

<style lang="scss">
.radio__options {
    position: relative;
    margin-bottom: $spacing-8;
    display: flex;
    align-items: center;

    .forms__options-label {
        margin-left: $spacing-26;
    }
}

.radio__legend {
    margin-bottom: $spacing-8;
}
</style>
