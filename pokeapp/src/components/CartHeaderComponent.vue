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
      <div>
        <img src="../assets/icons/cart.svg" alt="Panier" />
        <span>{{ cartItemCount }}</span>
      </div>
      <router-link to="/order-history">Historique des commandes</router-link>
    </router-link>
</template>