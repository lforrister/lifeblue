<template>
    <div class="pulseButton__container">
    	<div class="pulseButton__bg"></div>
		<button class="pulseButton__button">
			<ArrowDown />
		</button>
    </div>
</template>

<script setup>
    import ArrowDown from '../icons/ArrowDown.vue';

</script>

<style lang="scss">
	.pulseButton__container {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		height: 60px;
	}

	.pulseButton__bg,
	.pulseButton__button {
		position: absolute;
		width: 50px;
		height: 50px;
		border-radius: 100%;
		font-family: $raleway;

		@media screen and (min-width: $breakpoint-md) {
			width: 60px;
			height: 60px;
		}
	}

	.pulseButton__button {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		border: none;
		background: $grey-light;
		cursor: pointer;
		outline: none;

		svg {
			height: 38px;
			fill: $dark-ocean;
		}

		&:focus,
		&:hover {
			background: linear-gradient(to left top, $sky-blue, $iceberg);
		}
	}

	.pulseButton__bg {
		animation: pulse 5s ease infinite;
		background: linear-gradient(to left top, $light-ocean, $iceberg);
	}


	@keyframes pulse {
		0% {
			transform: scale(1, 1);
		}
		50% {
			opacity: 0.3;
		}
		100% {
			transform: scale(1.4);
			opacity: 0;
		}
	}

</style>