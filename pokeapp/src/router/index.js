import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/PokemonList.vue'
import PokemonDetailView from '../views/PokemonDetails.vue'

const routes = [
  {
    path: '/',
    name: 'pokemon-list',
    component: HomeView
  },
  {
    path: '/pokemon/:id',
    name: 'pokemon-detail',
    component: PokemonDetailView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router