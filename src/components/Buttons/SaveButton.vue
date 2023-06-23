<template>
    <div class="SaveButton__button" :class="direction"> 
        <SaveIcon />
    </div>
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

	.SaveButton__button {
		width: 25px;
		height: 25px;
		border-radius: 100%;
		font-family: $raleway;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2px solid $dark-ocean;
		background: $grey-light;
		cursor: pointer;
		outline: none;

		svg {
            height: 18px;
            stroke: $dark-ocean;
        }
	}

</style>