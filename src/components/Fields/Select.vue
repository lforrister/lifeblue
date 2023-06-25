<template>
    <div>
        <label :for="field.id" class="forms__input-label">
            {{ field.label }}
        </label>
        <select :name="field.name" :id="field.id" @change="updateInput($event.target.value)" class="forms__input">
            <option value="" disabled selected>{{ field.placeholder }}</option>
            <option 
                v-for="option in field.options"
                :value="option.value"
                :selected="option.value === field.input"
            >
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<script setup>
    import { onMounted, onUpdated } from 'vue';

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

    function setFocus() {
        let el = document.getElementById(props.field.id)
        el.focus()
    }

    onMounted(() => {
        setFocus()
    })

    onUpdated(() => {
        setFocus()
    })

</script>