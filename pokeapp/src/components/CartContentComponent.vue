<script>
import { useCartStore } from '@/stores/cart'
import CartItemComponent from './CartItemComponent.vue'
import cartValidationMixin from '../mixins/cartVaildationMixin.js'

export default {
  name: 'CartContentComponent',
  components: {
    CartItemComponent
  },
  mixins: [cartValidationMixin],
  computed: {
    cartItems() {
      const store = useCartStore()
      return store.items
    },
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    }
  },
  methods: {
    proceedToOrder() {
      this.$router.push('/order')
    }
  }
}
</script>

<template>
  <router-link to="/">
    <span class="return-link">< Retour</span>
  </router-link>
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
      <button @click="proceedToOrder">Passer la commande</button>
    </div>
  </div>
</template>

<style>
.cart-view {
  padding: 20px;
}

.total-price {
  margin-top: 20px;
  font-size: 1.5em;
}
</style>