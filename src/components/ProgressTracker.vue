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
        width: 100%;
        height: 25px;
        border: 1px solid black;
        position: relative;
    }

    .progressTracker__bar {
        height: 25px;
        background: blue;
        position: absolute;
    }

</style>