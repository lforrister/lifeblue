<template>
    <div v-if="field" class="text__container">
        <label :for="field.id" class="forms__input-label">
            {{ field.label }}
        </label>
        <input
            :type="field.type"
            :id="field.id"
            :name="field.name"
            :value="field.input"
            @input="updateInput($event.target.value)"
            class="forms__input"
        >
    </div>
</template>

<script setup>
    import { onMounted, onUpdated } from 'vue';

    // == Define Props & Emits == //
    const emit = defineEmits(['update:modelValue', 'validateInput'])
    const props = defineProps({
        field: {
            type: Object,
            default: null
        }
    })

    // == Functions == //
    function updateInput(target) {
        emit('update:modelValue', target)
        emit('validateInput', props.field)
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

<style lang="scss">
    .text__container {
        display: flex;
        flex-wrap: wrap;
    }
</style>