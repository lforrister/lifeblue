<template>
  <div>
    <input type="text" v-model="inputValue" placeholder="Enter value" />
    <div>
      <button @click="setLocalStorageContent">Set local storage</button>
      <button @click="removeLocalStorageContent">Remove local storage</button>
    </div>
    <div style="margin-top: 20px"> 
      <button @click="showLocalStorageContent">Show local storage content</button>
      <p>
        Value of 'item' is {{ localStorageValue  }}
      </p>
    </div>
  </div>
</template>

<script setup>  
  import { ref, onMounted } from "vue";
  
  const inputValue = ref('')
  const localStorageValue = ref('')
  
  onMounted(() => {
    showLocalStorageContent()
  })
  
  const setLocalStorageContent = () => {
    localStorage.setItem('item', inputValue.value)
  }
  
  const showLocalStorageContent = () => {
    localStorageValue.value = localStorage.getItem('item')
  }

  const removeLocalStorageContent = () => {
    localStorageValue.value = localStorage.removeItem('item')
  }
</script>