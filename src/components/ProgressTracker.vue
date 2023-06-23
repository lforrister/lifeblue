<template>
    <div class="progressTracker__container">
        <span id="tracker" class="progressTracker__bar" :style="style"></span>
    </div>
</template>

<script setup>
    import { computed, onMounted, ref } from 'vue'
    
    // == Define Props & Emits == //
    const props = defineProps({
        percent: {
            type: Number,
            default: 0
        }
    })

    // == Computed Properties == //
    const style = computed(() => {
        return `width: ${props.percent}%`
    })
</script>

<style lang="scss">
    .progressTracker__container {
        position: relative;
        height: 10px;
        margin-bottom: $spacing-24;
        background: $grey-light;
    }

    .progressTracker__bar {
        background-image: linear-gradient(to right, $dark-ocean , $light-ocean);
        position: absolute;
        height: 10px;
    }

</style>