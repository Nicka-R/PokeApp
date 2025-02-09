<script>
import { useCartStore } from '@/stores/cart'

export default {
  name: 'CartItemComponent',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    removeItem() {
      const store = useCartStore()
      store.removeFromCart(this.item.id)
    },
    addToCart() {
      const store = useCartStore()
      store.addToCart(this.item)
    }
  }
}
</script>

<template>
  <div class="cart-item">
    <img :src="item.image" :alt="item.name" />
    <div>
      <h3>{{ item.name }}</h3>
      <p>Prix: {{ item.price }} €</p>
      <p>Quantité: {{ item.quantity }}</p>
      <button @click="removeItem">Supprimer</button>
      <button @click="addToCart">Ajouter</button>
    </div>
  </div>
</template>

<style>
</style>