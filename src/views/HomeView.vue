<template>
	<main>
		<Nav id="nav" />
		<Header id="header" />
		<div class="homeView__wrapper" :style="style">
			<div class="homeView__form">
				<Form @page-change="pageChange"/>
			</div>
		</div>
		<Footer id="footer" />
	</main>
</template>

<script setup>
  import Footer from '../components/Footer.vue';
  import Form from '../components/Form.vue'
  import Header from '../components/Header.vue'
  import Nav from '../components/Nav.vue'
  import { onMounted, onUnmounted, ref } from 'vue'

  const style = ref('')

  function setHeight() {
    console.log('setting height')
    let header = document.getElementById('header')
    let headerHeight = header.offsetHeight
    let navHeight = 40
    let footerHeight = 46
    let spacer = 75
    let height = headerHeight + navHeight + footerHeight - spacer
    style.value = `min-height: calc(100vh - ${height}px);`
  }

  function pageChange() {
    console.log('changing!')
    setHeight()
  }

  onMounted(() => {
    setHeight()
    window.addEventListener('resize', setHeight)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', setHeight)
  })

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

</style>