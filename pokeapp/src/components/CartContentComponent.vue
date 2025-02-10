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
    <div v-else class="cart-content">
      <div>
      <CartItemComponent
        v-for="item in cartItems"
        :key="item.id"
        :item="item"
      />
      </div>  
      <div class="total-price">
        <span>Total: {{ totalPrice }} €</span>
        <div class = "cart-summary">
          <div v-for="item in cartItems" :key="item.id" class="item-summary">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-quantity">x {{ item.quantity }}</span>
            <span class="item-total">Total: {{ item.price * item.quantity }} €</span>
          </div>
        </div>
        <button @click="proceedToOrder">Passer la commande</button>
      </div>
    </div>
  </div>
</template>