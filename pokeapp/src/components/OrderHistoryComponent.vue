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

<template>
  <router-link to="/">
    <span class="return-link">< Retour</span>
  </router-link>
  <div class="order-history">
    <h1>Historique des Commandes</h1>
    <div v-if="orderHistory.length === 0">
      <p>Aucune commande passée.</p>
    </div>
    <div v-else class="order-grid">
      <div v-for="order in orderHistory" :key="order.id" class="order">
        <h2>Commande du {{ order.date }}</h2>
        <ul>
          <li v-for="item in order.items" :key="item.id">
            {{ item.name }} - {{ item.quantity }} x {{ item.price }} €
          </li>
        </ul>
        <div>
          <span>Total: {{ order.total }} €</span> 
        </div>  
      </div>
    </div>
  </div>
</template>

<style>
.order-history {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  border-radius: 8px;
}

.order-history h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2em;
  color: #333;
}

.order-history .return-link {
  display: inline-block;
  margin-bottom: 20px;
  color: #e9283e;
  text-decoration: none;
  font-weight: bold;
}

.order-history .return-link:hover {
  text-decoration: underline;
}

.order-history p {
  text-align: center;
  font-size: 1.2em;
  color: #777;
}

.order-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.order {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  max-height: 400px;
}

.order h2 {
  margin-top: 0;
  font-size: 1.5em;
  color: #333;
  border-bottom: 1px solid #e9283e;
  padding-bottom: 10px;
}

.order ul {
  list-style: none;
  padding: 0;
  flex-grow: 1;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;  
}

.order ul::-webkit-scrollbar {
  display: none; 
}

.order li {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.order li:last-child {
  border-bottom: none;
}

.order li span {
  font-weight: bold;
  color: #333;
}
</style>