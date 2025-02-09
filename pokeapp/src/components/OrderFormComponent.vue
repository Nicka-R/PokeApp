<script>
import cartValidationMixin from '../mixins/cartVaildationMixin.js'
import { useCartStore } from '@/stores/cart'

export default {
  name: 'OrderFormComponent',
  mixins: [cartValidationMixin],
  data() {
    return {
      firstName: '',
      lastName: '',
      email: ''
    }
  },
  methods: {
    submitOrder() {
      this.validateOrderForm()
      const cartStore = useCartStore()
      cartStore.placeOrder()
      this.$router.push({ name: 'order-confirmation', query: { firstName: this.firstName, lastName: this.lastName, email: this.email } })
    }
  }
}
</script>

<template>
  <div class="order-form">
  <router-link to="/">
    <span>< Retour</span>
  </router-link>
    <h1>Passer la commande</h1>
    <form @submit.prevent="submitOrder" name="orderForm">
      <div>
        <label for="firstName">Prénom:</label>
        <input type="text" id="firstName" v-model="firstName" required />
      </div>
      <div>
        <label for="lastName">Nom:</label>
        <input type="text" id="lastName" v-model="lastName" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <button type="submit">Confirmer la commande</button>
    </form>
  </div>
</template>

<style>
.order-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}

.order-form div {
  margin-bottom: 10px;
}

.order-form label {
  display: block;
  margin-bottom: 5px;
}

.order-form input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
</style>