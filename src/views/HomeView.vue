<template>
	<main class="homeView__main">
		<Nav />
		<Header />
		<div class="homeView__wrapper" id="info-form">
			<div class="homeView__form">
				<Form />
			</div>
		</div>
		<Footer class="homeView__footer" />
	</main>
</template>

<script setup>
  import Footer from '../components/Footer.vue';
  import Form from '../components/Form.vue'
  import Header from '../components/Header.vue'
  import Nav from '../components/Nav.vue'
</script>



<style lang="scss">

  .homeView__main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: $grey-light;
    background-image: $grey-gradient;
    
  }

  .homeView__wrapper {
    @include wrapper;
    @include min-height;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
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

  .homeView__footer {
    margin-top: auto;
  }

</style>