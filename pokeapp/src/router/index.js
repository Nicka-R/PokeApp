import { createRouter, createWebHistory } from 'vue-router'
import PokemonDetailView from '../views/PokemonDetails.vue'
import PokemonList from '../views/PokemonList.vue'
import CartView from '@/views/CartView.vue'

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

  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router