<template>
    <div v-if="field">
        <label :for="field.id" class="forms__input-label">
            {{ field.label }}
        </label>
        <input
            :type="field.type"
            :id="field.id"
            :name="field.name"
            :min="min"
            @input="updateInput($event.target.value)"
            class="forms__input"
        >
    </div>
</template>

<script setup>
    import { computed } from 'vue'
    // == Define Props & Emits == //
    const emit = defineEmits(['update:modelValue'])
    const props = defineProps({
        field: {
            type: Object,
            default: null
        }
    })

    // == Computed Properties == //
    const min = computed(() => {
        if (props.field.id === 'start_date') {
            return formatDate(new Date())
        } else {
            let start = localStorage.getItem('start_date')
            return start ?? formateDate(new Date())
        }
    })

    // == Functions == //
    function updateInput(target) {
        emit('update:modelValue', target)
    }

    function formatDate(today) {
        let month = today.getMonth() + 1
        let day = today.getDate()
        let year = today.getFullYear()

        if (month < 10) {
            month = '0' + month.toString()
        }

        if (day < 10) {
            day = 0 + day.toString()
        }

        let minDate = `${year}-${month}-${day}`

        return minDate
    }

</script>