<template>
  <router-link to="/"><button>Retour à la liste des pokémons</button></router-link>
  <div class="cart-view">
    <h1>Mon Panier</h1>
    <div v-if="cartItems.length === 0">
      <p>Votre panier est vide.</p>
    </div>
    <div v-else>
      <CartItemComponent
        v-for="item in cartItems"
        :key="item.id"
        :item="item"
      />
      <div class="total-price">
        <h2>Prix Total: {{ totalPrice }} €</h2>
      </div>
        <router-link to="/order"><button>Passer la commande</button></router-link>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cart'
import CartItemComponent from './CartItemComponent.vue'

export default {
  name: 'CartContentComponent',
  components: {
    CartItemComponent
  },
  computed: {
    cartItems() {
      const store = useCartStore()
      return store.items
    },
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    }
  }
}
</script>

<style>
.cart-view {
  padding: 20px;
}

.total-price {
  margin-top: 20px;
  font-size: 1.5em;
}
</style>