<template>
    <div v-if="field">
        <label :for="field.id" class="forms__input-label">
            {{ field.label }} {{ field.required ? '*' : '' }}
        </label>
        <input
            :type="field.type"
            :id="field.id"
            :name="field.name"
            :min="min"
            :value="field.input"
            @input="updateInput($event.target.value)"
            class="forms__input"
        />
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatDateHyphen } from '../../utilities/utils'

// == Define Props & Emits == //
const emit = defineEmits(['update:modelValue', 'checkEndDate'])
const props = defineProps({
    field: {
        type: Object,
        default: null
    }
})

// == Computed Properties == //
const min = computed(() => {
    return formatDate(new Date())
})

// == Functions == //
function updateInput(target) {
    emit('update:modelValue', target)
}

function formatDate(today) {
    return formatDateHyphen(today)
}
</script>
