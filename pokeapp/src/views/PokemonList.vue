<script>
import { usePokemonStore } from '@/stores/pokemon'

export default {
  name: 'pokemon-list',
  data() {
    return {
      pokemonStore: null,
      searchQuery: ''
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
      if (searchQuery) {
        await this.pokemonStore.searchPokemonByName(searchQuery)
      } else {
        await this.pokemonStore.fetchPokemons(1)
       }
      this.updateCurrentPage()
     },
    searchPokemon() {
      this.pokemonStore.searchPokemonByName(this.searchQuery)
      this.$router.push({ name: 'pokemon-list', query: { search: this.searchQuery } })
    },
    goToPokemonDetail(id) {
      this.$router.push({ name: 'pokemon-detail', params: { id } })
    },
    attachPaginationEvents() {
      const store = this.pokemonStore
      document.getElementById('prevPage').addEventListener('click', () => {
        store.previousPage().then(this.updateCurrentPage)
      })

      document.getElementById('nextPage').addEventListener('click', () => {
        store.nextPage().then(this.updateCurrentPage)
      })
    },
    updateCurrentPage() {
      document.getElementById('currentPage').textContent = `Page: ${this.pokemonStore.currentPage} / ${this.pokemonStore.totalPages}`
    }
  },
  created() {
    this.pokemonStore = usePokemonStore()
    this.pokemonStore.fetchPokemons()
  },
    mounted() {
    this.attachPaginationEvents()
    this.updateCurrentPage()
  }
}
</script>
<template>
  <div class="searchBar">
    <img src="@/assets/icons/search.svg" alt="Rechercher" />
    <input type="text" v-model="searchQuery" placeholder="Rechercher un Pokémon" />
    <button @click="searchPokemon">Rechercher</button>
  </div>
  
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
        <p>{{ pokemon.price }} €</p>
      </div>
    </div>
  </div>
  <footer>
    <button id="prevPage">Previous Page</button>
    <span id="currentPage">Page : 1</span>
    <button id="nextPage">Next Page</button>
  </footer>
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