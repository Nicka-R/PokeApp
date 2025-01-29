<template>
<main>
  <header>
  <CartHeaderComponent /> 
  </header>
  <RouterView />
</main>
</template>

<script>
import CartHeaderComponent from '@/components/CartHeaderComponent.vue'
export default {
  components: {
    CartHeaderComponent
  }
}
</script>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #769bff;
  }
  a {
    text-decoration: none;
    color: rgb(255, 255, 255);
  }
</style>