<template>
    <div class="formHeader__container">
        <h3>{{ copy }}</h3>
    </div>
</template>

<script setup>
    import { computed, onMounted, ref } from 'vue'
    
    // == Define Props & Emits == //
    const props = defineProps({
        index: {
            type: Number,
            default: 0
        },
        display: {
            type: String,
            default: ''
        }
    })

    // == Computed Properties == //
    const copy = computed(() => {

        if (props.display === 'full') {
            return 'Step 3: Review & Submit'
        } else if (props.index < 4) {
            return 'Step 1: Your Information'
        } else if (props.index <= 10) {
            return 'Step 2: Your Dream Trip'
        } 

        return "Let's Get Started"
    })
</script>

<style lang="scss">
    .formHeader__container {
        background-image: linear-gradient(to right, $ocean , $dark-ocean);
        color: white;
        margin-left: calc($spacing-40 * -1);
        margin-right: calc($spacing-40 * -1);
        padding: $spacing-8 $spacing-40;
        border-top-right-radius: 12px;
        border-top-left-radius: 12px;
    }
</style>