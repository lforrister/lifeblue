<template>
    <fieldset>
        <legend> {{ field.label }} </legend>

        <div v-for="option in field.options">
            <input 
                :type="field.type" 
                :id="option.id" 
                :name="field.name" 
                :value="option.value" 
                @change="updateInput($event.target.value)" />
            <label :for="option.id">
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