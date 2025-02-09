<script>
import { useCartStore } from '@/stores/cart'
import { usePokemonStore } from '@/stores/pokemon'
import '@/assets/css/pokemon-details.css'

export default {
  name: 'PokemonCardComponent',
  data() {
    return {
      pokemonStore: null,
      pokemon: null,
      loading: false,
      error: null
    }
  },
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },
  async created() {
    this.pokemonStore = usePokemonStore()
    await this.fetchPokemonDetails()
  },
  methods: {
    async fetchPokemonDetails() {
      this.loading = true
      const pokemonId = this.$route.params.id
      try {
        this.pokemon = await this.pokemonStore.fetchPokemonDetails(pokemonId)
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    addToCart() {
      const store = useCartStore()
      store.addToCart(this.pokemon)
    }
  }
}
</script>

<template>
  <router-link to="/">
    <span>< Retour</span>
  </router-link>
  <div v-if="loading" class="loading">
    Chargement des détails du Pokémon...
  </div>
  <div v-else-if="error" class="error">
    {{ error }}
  </div>
  <div v-else-if="pokemon" class="pokemon-detail">
    <img :src="pokemon.image" :alt="pokemon.name">
    <div class="pokemon-info">
      <div class="pokemon-header">
        <div class="pokemon-name">{{ pokemon.name }}</div>
        <div class="pokemon-type">
          <img v-for="type in pokemon.types" :key="type" :alt="type" :src="`/src/assets/tags/${type}.svg`"/>
        </div>
      </div>
      <p><strong>Prix:</strong> {{ pokemon.price }} €</p>
      <p><strong>Poids:</strong> {{ pokemon.weight }} kg</p>
      <p><strong>Taille:</strong> {{ pokemon.height }} m</p>
      <p class="abilities"><strong>Capacités:</strong> {{ pokemon.abilities }}</p>
      <p class="moves"><strong>Attaques:</strong> {{ pokemon.moves}}</p>
      <button @click="addToCart">Ajouter au panier</button>
    </div>
  </div>
</template>