<template>
    <div>
        <Select v-if="field.type === 'select'" v-model="field.input" :field="field" />
        <Checkbox v-else-if="field.type === 'checkbox'" v-model="field.input" :field="field" />
        <Radio v-else-if="field.type === 'radio'" v-model="field.input" :field="field" />
        <DatePicker v-else-if="field.type === 'date'" v-model="field.input" :field="field" />
        <Text v-else v-model="field.input" :field="field" @validate-input="triggerValidate"/>

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
    import { debouncing, validation } from '../plugins/utils'
    import { ref } from 'vue'

    // == Define Props & Emits == //
    const emit = defineEmits([ 'updateValidation'])
    const props = defineProps({
        field: {
            type: Object,
            default: {}
        }
    })

    // == Declare Variables = //
    const errors = ref([])


    // == Functions == //
    const triggerValidate = debouncing((field) => validateInput(field))

    function validateInput(field) {
        if (field.validate) {
            const valid = validation(field.type, field.input)

            if(valid) {
                errors.value = errors.value.filter((err) => err.id !== field.id)
            } else {
                errors.value.push({
                    id: field.id,
                    message: field.errorMessage ?? field.errorMessage
                })
            }
        } 

        let validated = errors.value.length ? false : true
        emit('updateValidation', [props.field.id, validated])
        
    }

</script>