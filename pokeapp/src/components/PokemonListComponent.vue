<script>
import { usePokemonStore } from '@/stores/pokemon'
import { useCartStore } from '@/stores/cart'
import highlight from '@/directive/hightlight'

export default {
  name: 'PokemonListComponent',
  directives: {
    highlight
  },
  data() {
    return {
      pokemonStore: usePokemonStore(),
      searchQuery: '',
      selectedType: '',
      pokemonTypes: []
    }
  },
  computed: {
    paginatedPokemons() {
      const start = (this.pokemonStore.currentPage - 1) * this.pokemonStore.limit
      const end = start + this.pokemonStore.limit
      return this.pokemonStore.pokemons.slice(start, end)
    },
    loading() {
      return this.pokemonStore?.loading
    },
    error() {
      return this.pokemonStore?.error
    },
    currentPage() {
      return this.pokemonStore.currentPage
    },
    totalPages() {
      return this.pokemonStore.totalPages
    }
  },
  watch: {
    '$route.query.search': 'fetchPokemons',
    selectedType: 'fetchPokemons',
  },
  methods: {
    async fetchPokemons() {
      const searchQuery = this.$route.query.search || ''
      const type = this.selectedType || ''
      await this.pokemonStore.fetchPokemons(this.pokemonStore.currentPage, searchQuery, type)
      this.updateTotalPages()
    },
    async fetchPokemonTypes() {
      try {
        const types = await this.pokemonStore.fecthPokemonTypes()
        this.pokemonTypes = types.map(type => type.name)
      } catch (error) {
        console.error('Failed to fetch Pokemon types:', error)
      }
    },
    searchPokemon() {
      this.pokemonStore.searchPokemonByName(this.searchQuery)
      this.$router.push({ name: 'pokemon-list', query: { search: this.searchQuery } })
    },
    goToPokemonDetail(id) {
      this.$router.push({ name: 'pokemon-detail', params: { id } })
    },
    addToCart(pokemon) {
      const cartStore = useCartStore()
      cartStore.addToCart(pokemon)
    },
    previousPage() {
      this.pokemonStore.previousPage()
    },
    nextPage() {
      this.pokemonStore.nextPage()
    },
    updateTotalPages() {
      this.totalPages = Math.ceil(this.pokemonStore.pokemons.length / this.pokemonStore.limit)
    },
    updateSelectedType(event) {
      this.selectedType = event.target.value
      this.fetchPokemons()
    }
  },
  async created() {
    await this.pokemonStore.fetchPokemons()
    await this.fetchPokemonTypes()
    this.updateTotalPages()
  }
}
</script>

<template>
  <div>
    <div class="searchBar">
      <img src="@/assets/icons/search.svg" alt="Rechercher" />
      <input type="text" v-model="searchQuery" placeholder="Rechercher un Pokémon" />
      <button @click="searchPokemon">Rechercher</button>
    </div>

    <div class="filters">
      <label for="typeFilter">Filtrer par type:</label>
      <select id="typeFilter" v-model="selectedType" @change="updateSelectedType">
        <option value="">Tous</option>
        <option v-for="type in pokemonTypes" :key="type" :value="type">{{ type }}</option>
      </select>
    </div>

    <div class="home">
      <div v-if="loading" class="loading">
        Chargement des Pokémon...
      </div>
      <div v-else-if="error" class="error">
        {{ error }}
      </div>
      <div v-else class="pokemon-grid">
        <div v-for="pokemon in paginatedPokemons" :key="pokemon.id" class="pokemon-card" @click="goToPokemonDetail(pokemon.id)" v-highlight>
          <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-icon"/>
          <h3>{{ pokemon.name }}</h3>
          <p>{{ pokemon.price }} €</p>
          <button @click.stop="addToCart(pokemon)">Ajouter au panier</button>
        </div>
      </div>
    </div>
    <footer>
      <button id="prevPage" @click="previousPage" :disabled="currentPage === 1">Previous Page</button>
      <span id="currentPage">Page : {{ currentPage }} / {{ totalPages }}</span>
      <button id="nextPage" @click="nextPage" :disabled="currentPage === totalPages">Next Page</button>
    </footer>
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

.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.filters label {
  margin-right: 10px;
}

footer {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  margin-top: 20px;
}

footer button {
  margin: 0 10px;
}
</style>