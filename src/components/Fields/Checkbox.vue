<template>
    <fieldset class="forms__fieldset">
        <legend class="forms__input-label"> {{ field.label }} </legend>
        
        <div v-for="option in field.options" class="checkbox__options">
            <input 
                :type="field.type" 
                :id="option.id" 
                :name="field.name" 
                :value="option.value" 
                v-model="checked"
                @change="updateInput(checked)" 
                class="forms__checkbox-input"/>
            <span class="forms__checkbox" :class="checked.includes(option.value) ? 'is-checked' : ''"></span>
            <label :for="option.id" class="forms__options-label">
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

<style lang="scss">
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