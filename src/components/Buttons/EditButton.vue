<template>
    <div class="editButton__button" :class="direction"> 
        <EditIcon />
    </div>
</template>

<script setup>
    import EditIcon from '../icons/EditIcon.vue'

    // == Define Props & Emits == //
    const props = defineProps({
        direction: {
            type: String,
            default: ''
        }
    })

</script>

<style lang="scss">

	.editButton__button {
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