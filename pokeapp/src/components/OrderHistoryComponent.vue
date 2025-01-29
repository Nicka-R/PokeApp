<template>
  <div class="order-history">
    <h1>Historique des Commandes</h1>
    <div v-if="orderHistory.length === 0">
      <p>Aucune commande passée.</p>
    </div>
    <div v-else>
      <div v-for="order in orderHistory" :key="order.id" class="order">
        <h2>Commande du {{ order.date }}</h2>
        <ul>
          <li v-for="item in order.items" :key="item.id">
            {{ item.name }} - {{ item.quantity }} x {{ item.price }} €
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cart'

export default {
  name: 'OrderHistoryComponent',
  computed: {
    orderHistory() {
      const store = useCartStore()
      return store.history
    }
  }
}
</script>

<style>
.order-history {
  padding: 20px;
}

.order {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}
</style>