<template>
    <div class="arrowButton__button" :class="direction"> 
        <ArrowIcon />
    </div>
</template>

<script setup>
    import ArrowIcon from '../icons/ArrowIcon.vue'

    // == Define Props & Emits == //
    const props = defineProps({
        direction: {
            type: String,
            default: ''
        }
    })
</script>

<style lang="scss">

	.arrowButton__button {
		width: 40px;
		height: 40px;
		border-radius: 100%;
		font-family: $raleway;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2px solid $dark-ocean;
		background: $cloud;
		cursor: pointer;
		outline: none;

		svg {
            height: 28px;
            fill: $dark-ocean;
        }

        &.right {
            svg {
                transform: rotate(270deg);
            }
        }

        &.left {
            svg {
                transform: rotate(90deg);
            }
        }
	}

</style>