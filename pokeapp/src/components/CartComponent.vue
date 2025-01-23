<script>
import { useCartStore } from '@/stores/cart'

export default {
  name: 'CartComponent',
  computed: {
    cartItemCount() {
      const store = useCartStore()
      return store.items.length
    }
  }
}
</script>

<template>
    <router-link to="/"><h1>Pokéapp</h1></router-link>
    <router-link to="/cart"><img src="../assets/icons/cart.svg" alt="Panier" /><span>{{ cartItemCount }}</span></router-link>
</template>