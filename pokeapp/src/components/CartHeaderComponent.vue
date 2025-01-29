<script>
import { useCartStore } from '@/stores/cart'

export default {
  name: 'CartHeaderComponent',
  computed: {
    cartItemCount() {
      const store = useCartStore()
      // somme des quantités de chaque item
      return store.items.reduce((acc, item) => acc + item.quantity, 0)
    }
  }
}
</script>

<template>
    <router-link to="/"><h1>Pokéapp</h1></router-link>
    <router-link to="/cart">
      <img src="../assets/icons/cart.svg" alt="Panier" />
      <span>{{ cartItemCount }}</span>
    </router-link>
</template>