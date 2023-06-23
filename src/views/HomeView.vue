<script setup>
import Form from '../components/Form.vue'
import Header from '../components/Header.vue'
import Nav from '../components/Nav.vue'
</script>

<template>
  <main>
    <Nav></Nav>
    <Header />
    <div class="homeView__wrapper">
      <div class="homeView__form">
          <Form />
      </div>
    </div>
  </main>
</template>


<style lang="scss">

  .homeView__wrapper {
    @include wrapper;
    min-height: 100vh;
    background: $grey-light;
  }

  .homeView__form {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

</style>