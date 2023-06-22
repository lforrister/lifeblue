<template>
    <fieldset>
        <legend> {{ field.label }} </legend>
        
        <div v-for="option in field.options">
            <input 
                :type="field.type" 
                :id="option.id" 
                :name="field.name" 
                :value="option.value" 
                v-model="checked"
                @change="updateInput(checked)" />
            <label :for="option.id">
                {{ option.label }}
            </label>
        </div>
    </fieldset>
</template>

<script setup>
    import { ref } from 'vue'

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
        console.log('updating!', values)
        emit('update:modelValue', values)
    }

</script>