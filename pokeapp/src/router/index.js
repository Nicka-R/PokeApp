import { createRouter, createWebHistory } from 'vue-router'
import PokemonDetailView from '../views/PokemonDetails.vue'
import PokemonList from '../views/PokemonList.vue'
import CartView from '@/views/CartView.vue'
import OrderFormComponent from '@/components/OrderFormComponent.vue'
import OrderConfirmationComponent from '@/components/OrderConfirmationComponent.vue'
import OrderHistoryComponent from '@/components/OrderHistoryComponent.vue'

const routes = [
  {
    path: '/',
    name: 'pokemon-list',
    component: PokemonList
  },
  {
    path: '/pokemon/:id',
    name: 'pokemon-detail',
    component: PokemonDetailView
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView

  },
  {
    path: '/order',
    name: 'order',
    component: OrderFormComponent
  },
  {
    path: '/order-confirmation',
    name: 'order-confirmation',
    component: OrderConfirmationComponent
  },

  {
    path: '/order-history',
    name: 'order-history',
    component: OrderHistoryComponent
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router