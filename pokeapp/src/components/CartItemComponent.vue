<script>
import { useCartStore } from '@/stores/cart'
import '@/assets/css/cart-item.css'

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
    <div class="cart-item-info">
      <div class="cart-item-header">
        <div class="item-name">{{ item.name }}</div>
        <div class="item-types">
          <img v-for="type in item.types" :key="type" :alt="type" :src="`/src/assets/tags/${type}.svg`" />
        </div>
      </div>
      <p><strong>Prix:</strong> {{ item.price }} €</p>
      <p class="item-quantity"><strong>Quantité:</strong> {{ item.quantity }}</p>
      <div class="item-actions">
        <button class="remove-button" @click="removeItem">Supprimer</button>
        <button class="add-button" @click="addToCart">Ajouter</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>