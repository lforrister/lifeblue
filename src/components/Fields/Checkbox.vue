<template>
    <fieldset class="forms__fieldset">
        <legend class="forms__input-label checkbox__legend">
            {{ field.label }} {{ field.required ? '*' : '' }}
        </legend>

        <div v-for="option in field.options" :key="field.id" class="checkbox__options">
            <input
                :type="field.type"
                :id="option.id"
                :name="field.name"
                :value="option.value"
                v-model="checked"
                @change="updateInput(checked)"
                class="forms__checkbox-input"
            />
            <span class="forms__checkbox" :class="check(option.value)"></span>
            <label :for="option.id" class="forms__options-label">
                {{ option.label }}
            </label>
        </div>
    </fieldset>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// == Define Props & Emits == //
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    field: {
        type: Object,
        default: null
    }
})

// == Declare Variables == //
const checked = ref([])

// == Functions == //
function updateInput(values) {
    emit('update:modelValue', values)
}

function check(option) {
    if (checked.value.includes(option)) {
        return 'is-checked'
    } else {
        return ''
    }
}

onMounted(() => {
    if (props.field.input && props.field.input.length) {
        checked.value = [...props.field.input]
    }
})
</script>

<style lang="scss">
.checkbox__legend {
    margin-bottom: $spacing-8;
}

.checkbox__options {
    position: relative;
    margin-bottom: $spacing-8;
    display: flex;
    align-items: center;

    .forms__options-label {
        margin-left: $spacing-26;
    }
}
</style>
