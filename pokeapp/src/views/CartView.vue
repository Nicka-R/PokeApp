<script>
import { useCartStore } from '@/stores/cart'
export default {
  name: 'cart',
  computed: {
    cartItems() {
      const store = useCartStore()
      return store.items
    }
  },
  methods: {
    removeFromCart(pokemonId) {
      const store = useCartStore()
      store.removeFromCart(pokemonId)
    }
  },
}
</script>

<template>
  <router-link to="/"><button>Retour à la liste des pokémons</button></router-link>
  <div class="cart-view">
    <h1>Mon Panier</h1>
    <div v-if="cartItems.length === 0">
      <p>Votre panier est vide.</p>
    </div>
    <div v-else>
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.name">
        <h3>{{ item.name }}</h3>
        <p>Prix: {{ item.price }} €</p>
        <button @click="removeFromCart(item.id)">Retirer</button>
      </div>
    </div>
  </div>
</template>