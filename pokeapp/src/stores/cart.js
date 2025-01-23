import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  actions: {
    addToCart(pokemon) {
      this.items.push(pokemon)
    },
    removeFromCart(pokemonId) {
      this.items = this.items.filter(item => item.id !== pokemonId)
    },
    clearCart() {
      this.items = []
    }
  }
})