<template>
    <button class="saveButton__button" :class="direction"> 
        <SaveIcon />
    </button>
</template>

<script setup>
    import SaveIcon from '../icons/SaveIcon.vue'

    // == Define Props & Emits == //
    const props = defineProps({
        direction: {
            type: String,
            default: ''
        }
    })

</script>

<style lang="scss">

	.saveButton__button {
		width: 30px;
		height: 30px;
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
            stroke: $dark-ocean;
        }

        &:focus {
            box-shadow:rgba(30, 60, 114, 0.5) 0px 4px 12px;
        }
	}

</style>