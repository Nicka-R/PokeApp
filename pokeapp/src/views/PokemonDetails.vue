<template>
  <router-link to="/">
    <button>Retour</button>
  </router-link>
  <div v-if="loading" class="loading">
    Chargement des détails du Pokémon...
  </div>
  <div v-else-if="error" class="error">
    {{ error }}
  </div>
  <div v-else class="pokemon-detail">
    <img :src="pokemon.image" :alt="pokemon.name">
    <h1>{{ pokemon.name }}</h1>
    <p>Prix: {{ pokemon.price }} €</p>
    <p>Type: {{ pokemon.type }}</p>
    <p>Poids: {{ pokemon.weight }} kg</p>
    <p>Taille: {{ pokemon.height }} m</p>
  </div>
</template>

<script>
import { usePokemonStore } from '@/stores/pokemon'

export default {
  name: 'PokemonDetailView',
  data() {
    return {
      pokemonStore: null,
      pokemon: null,
      loading: false,
      error: null
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
    }
  }
}
</script>

<style>
.pokemon-detail {
  text-align: center;
  padding: 20px;
}

.pokemon-detail img {
  width: 200px;
  height: 200px;
}

.loading, .error {
  text-align: center;
  padding: 20px;
}
</style>