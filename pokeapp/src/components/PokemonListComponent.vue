<script>
import { usePokemonStore } from '@/stores/pokemon'
import { useCartStore } from '@/stores/cart'
import hightlight from '@/directive/hightlight';
export default {
  name: 'PokemonListComponent',
  directives: {
    hightlight
  },
  data() {
    return {
      pokemonStore: usePokemonStore(),
      searchQuery: '',
      sortOrder: 'asc',
      selectedType: '',
      pokemonTypes: []
    }
  },
  computed: {
    pokemons() {
      let filteredPokemons = this.pokemonStore?.pokemons || []

      if (this.selectedType) {
        filteredPokemons = filteredPokemons.filter(pokemon =>
          pokemon.types.includes(this.selectedType)
        )
      }

      if (this.sortOrder === 'asc') {
        filteredPokemons.sort((a, b) => a.name.localeCompare(b.name))
      } else {
        filteredPokemons.sort((a, b) => b.name.localeCompare(a.name))
      }

      return filteredPokemons
    },
    loading() {
      return this.pokemonStore?.loading
    },
    error() {
      return this.pokemonStore?.error
    },
    currentPage() {
      return this.pokemonStore?.currentPage
    },
    totalPages() {
      return this.pokemonStore?.totalPages
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
    async fetchPokemonTypes() {
      try {
        const types = await this.pokemonStore.fecthPokemonTypes()
        this.pokemonTypes = types.map(type => type.name)
      } catch (error) {
        console.error('Failed to fetch Pokemon types:', error)
      }
    },
    searchPokemon() {
      if (!this.searchQuery) {
        return
      }
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
      this.pokemonStore.previousPage().then(this.updateCurrentPage)
    },
    nextPage() {
      this.pokemonStore.nextPage().then(this.updateCurrentPage)
    },
    updateCurrentPage() {
      document.getElementById('currentPage').textContent = `Page: ${this.pokemonStore.currentPage} / ${this.pokemonStore.totalPages}`
    },
    updateSortOrder(event) {
      this.sortOrder = event.target.value
    },
    updateSelectedType(event) {
      this.selectedType = event.target.value
    }
  },
  async created() {
    this.pokemonStore.fetchPokemons()
    await this.fetchPokemonTypes()
  },
  mounted() {
    this.updateCurrentPage()
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
      <label for="sortOrder">Trier par nom:</label>
      <select id="sortOrder" v-model="sortOrder" @change="updateSortOrder">
        <option value="asc">Croissant</option>
        <option value="desc">Décroissant</option>
      </select>

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
        <div v-for="pokemon in pokemons" :key="pokemon.id" class="pokemon-card" @click="goToPokemonDetail(pokemon.id)" v-hightlight>
          <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-icon"/>
          <h3>{{ pokemon.name }}</h3>
          <p>{{ pokemon.price }} €</p>
          <button @click.stop="addToCart(pokemon)">Ajouter au panier</button>
        </div>
      </div>
    </div>
    <footer>
      <button id="prevPage" @click="previousPage">Previous Page</button>
      <span id="currentPage">Page : {{ currentPage }} / {{ totalPages }}</span>
      <button id="nextPage" @click="nextPage">Next Page</button>
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
</style>