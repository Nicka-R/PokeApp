<template>
<main>
  <header>
    <div class="cart-header">
      <CartHeaderComponent /> 
    </div>
    <div class="pokeapp-header">
      <router-link to="/"><h1>Pokéapp</h1></router-link>
    </div>
  </header>
  
  <RouterView />
</main>
</template>

<script>
import CartHeaderComponent from '@/components/CartHeaderComponent.vue'
import '@/assets/css/main.css'
import '@/assets/css/header.css'
export default {
  components: {
    CartHeaderComponent
  }
}
</script>

<style>

</style>