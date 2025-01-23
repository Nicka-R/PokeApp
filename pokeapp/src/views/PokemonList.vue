<script>
import { usePokemonStore } from '@/stores/pokemon'

export default {
  name: 'HomeView',
  data() {
    return {
      pokemonStore: null
    }
  },
  computed: {
    pokemons() {
      return this.pokemonStore?.pokemons || []
    },
    loading() {
      return this.pokemonStore?.loading
    },
    error() {
      return this.pokemonStore?.error
    }
  },
  watch: {
    '$route.query.search': 'fetchPokemons'
  },
  methods: {
    async fetchPokemons() {
      const searchQuery = this.$route.query.search || ''
      await this.pokemonStore.fetchPokemons(1, searchQuery)
    },
    goToPokemonDetail(id) {
      this.$router.push({ name: 'pokemon-detail', params: { id } })
    }
  },
  created() {
    this.pokemonStore = usePokemonStore()
    this.pokemonStore.fetchPokemons()
  }
}
</script>
<template>
  <div class="home">
    <div v-if="loading" class="loading">
      Chargement des Pokémon...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else class="pokemon-grid">
      <div v-for="pokemon in pokemons" :key="pokemon.id" class="pokemon-card" @click="goToPokemonDetail(pokemon.id)">
        <img :src="pokemon.image" :alt="pokemon.name">
        <h3>{{ pokemon.name }}</h3>
        <p>Prix: {{ pokemon.price }} €</p>
      </div>
    </div>
  </div>
</template>

<style>
.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.pokemon-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  background-color: #fff;
}

.pokemon-card img {
  width: 120px;
  height: 120px;
}

.loading, .error {
  text-align: center;
  padding: 20px;
}
</style>