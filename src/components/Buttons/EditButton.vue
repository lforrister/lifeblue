<template>
    <button class="editButton__button">
        <EditIcon />
    </button>
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
		width: 30px;
		height: 30px;
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
            stroke: $dark-ocean;
        }

        &.is-disabled {
            border: 2px solid $silver;

            svg {
                stroke: $silver;
            }

            &:hover {
                cursor: not-allowed;
            }
        }

        &:focus {
            box-shadow:rgba(30, 60, 114, 0.5) 0px 4px 12px;
        }
	}

</style>