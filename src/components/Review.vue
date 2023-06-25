<template>
    <div>
        <div v-if="editable != field.id" class="review__container">
            <div class="review__row">
                <h4>
                    {{ field.label }}
                </h4>
            </div>
            <p class="review__response">
                {{ response(field) }}
            </p>
        </div>   
    </div>
</template>

<script setup>
    import { formatDateString } from '../utilities/utils'
    
    // == Define Props & Emits == //
    const emit = defineEmits(['update:modelValue', 'validateInput'])
    const props = defineProps({
        field: {
            type: Object,
            default: {}
        },
        editable: {
            type: String,
            default:''
        }
    })

    // == Functions == //
    function response(field) {
        if (field.type === 'checkbox') {
            return field.input.join(', ')
        } else if (field.type === 'date') {
            return formatDateString(field.input, { month: 'long', day: 'numeric', year: 'numeric'})
        }

        return field.input
    }


</script>

<style lang="scss">
    .review__container {
        margin-bottom: $spacing-16;
    }

    .review__row {
        display: flex;
        justify-content: space-between;
        margin: $spacing-24 0;

        h4 {
            margin-right: $spacing-40;
        }
    }

    .review__response {
        font-family: $raleway;
        border-bottom: 1px solid $stars;
        padding-bottom: $spacing-8;
    }

</style>