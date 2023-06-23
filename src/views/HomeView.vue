<script setup>
import Form from '../components/Form.vue'
import LocalTest from '../components/LocalTest.vue'
</script>

<template>
  <main>
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