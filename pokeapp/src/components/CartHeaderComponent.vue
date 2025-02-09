<script>
import { useCartStore } from '@/stores/cart'
import '@/assets/css/header.css'

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
  <router-link to="/order-history"><span>Historique des commandes</span></router-link>
    <router-link to="/cart">
      <div class="cart-icon-container">
      <img src="../assets/icons/cart.svg" alt="Panier" />
      <span class="cart-item-count">{{ cartItemCount }}</span>
    </div>
    </router-link>
</template>