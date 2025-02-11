import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    orderHistory: []
  }),
  actions: {
    addToCart(pokemon, quantity = 1) {
      const existingItem = this.items.find(item => item.id === pokemon.id)
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({ ...pokemon, quantity })
      }
    },
    removeFromCart(pokemonId, quantity = 1) {
      const existingItem = this.items.find(item => item.id === pokemonId)
      if (existingItem) {
        existingItem.quantity -= quantity
        if (existingItem.quantity <= 0) {
          this.items = this.items.filter(item => item.id !== pokemonId)
        }
      }
    },
    placeOrder() {
      if (this.items.length > 0) {
        const order = {
          id: Date.now(),
          date: new Date().toLocaleString(),
          items: [...this.items],
          total: this.items.reduce((total, item) => total + item.price * item.quantity, 0)
        }
        this.orderHistory.push(order)
        this.clearCart()
      }
    },
    clearCart() {
      this.items = []
    }
  },
  getters: {
    history() {
      return this.orderHistory
    }
  }
})