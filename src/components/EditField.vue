<template>
    <div>
        <Select v-if="field.type === 'select'" v-model="field.input" :field="field" />
        <Checkbox v-else-if="field.type === 'checkbox'" v-model="field.input" :field="field" />
        <Radio v-else-if="field.type === 'radio'" v-model="field.input" :field="field" />
        <DatePicker v-else-if="field.type === 'date'" v-model="field.input" :field="field" />
        <Text
            v-else
            v-model="field.input"
            :field="field"
            @validate-input="updateDisabled(field), setErrors(field)"
        />

        <p v-if="errors.find((err) => err.id === field.id)" class="forms__error">
            {{ field.errorMessage }}
        </p>
    </div>
</template>

<script setup>
import Checkbox from './Fields/Checkbox.vue'
import DatePicker from './Fields/DatePicker.vue'
import Radio from './Fields/Radio.vue'
import Select from './Fields/Select.vue'
import Text from './Fields/Text.vue'
import { debouncing, validation } from '../utilities/utils'
import { ref } from 'vue'

// == Define Props & Emits == //
const emit = defineEmits(['updateValidation'])
const props = defineProps({
    field: {
        type: Object,
        default: {}
    }
})

// == Declare Variables = //
const errors = ref([])

function updateDisabled(field) {
    // I want to immediately trigger this so the button will be enabled/disabled asap to prevent user submitting when they shouldn't
    if (field.validate) {
        const valid = validation(field.type, field.input)
        emit('updateValidation', [field.id, valid])
    }
}

// But I'll debounce the messages to improve the user experience
const setErrors = debouncing((field) => errorMsg(field))

function errorMsg(field) {
    if (field.validate) {
        const valid = validation(field.type, field.input)

        if (valid) {
            errors.value = errors.value.filter((err) => err.id !== field.id)
        } else {
            errors.value.push({
                id: field.id,
                message: field.errorMessage ?? field.errorMessage
            })
        }
    }
}
</script>
