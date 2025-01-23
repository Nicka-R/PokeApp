<template>
<main>
  <header>
  <CartComponent /> 
  </header>
  <RouterView />
</main>
</template>

<script>
import CartComponent from '@/components/CartComponent.vue'
export default {
  components: {
    CartComponent
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