<template>
    <div>
        <Select v-if="field.type === 'select'" v-model="field.input" :field="field" />
        <Checkbox v-else-if="field.type === 'checkbox'" v-model="field.input" :field="field" />
        <Radio v-else-if="field.type === 'radio'" v-model="field.input" :field="field" />
        <DatePicker v-else-if="field.type === 'date'" v-model="field.input" :field="field" />
        <Text v-else v-model="field.input" :field="field" @validate-input="triggerValidate"/>
    </div>
</template>

<script setup>
    import Checkbox from './Fields/Checkbox.vue'
    import DatePicker from './Fields/DatePicker.vue'
    import Radio from './Fields/Radio.vue'
    import Select from './Fields/Select.vue'
    import Text from './Fields/Text.vue'

    // == Define Props & Emits == //
    const emit = defineEmits([ 'triggerValidate'])
    const props = defineProps({
        field: {
            type: Object,
            default: {}
        }
    })

    // == Functions == //
    function triggerValidate() {
        console.log('triggering!')
        emit('triggerValidate', props.field)
    }
</script>