<template>
	<main>
		<Nav ref="nav" />
		<Header ref="header" />
		<div class="homeView__wrapper">
			<div class="homeView__form">
				<Form />
			</div>
		</div>
		<Footer ref="footer" />
	</main>
</template>

<script setup>
  import Footer from '../components/Footer.vue';
  import Form from '../components/Form.vue'
  import Header from '../components/Header.vue'
  import Nav from '../components/Nav.vue'
</script>



<style lang="scss">

  .homeView__wrapper {
    @include wrapper;
    @include min-height;
    background: $grey-light;
    background-image: linear-gradient(to bottom right, $grey-light , $metallic);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .homeView__form {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: $spacing-32 0;

    @media screen and (min-width: $breakpoint-md) {
      padding: $spacing-88 0;
    }
  }

</style>