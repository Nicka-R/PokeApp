<script>
import { usePokemonStore } from '@/stores/pokemon'
import { useCartStore } from '@/stores/cart'
import highlight from '@/directive/hightlight'
import '@/assets/css/pokemon-list.css'

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
      typeFilter: false,
      pokemonTypes: [],
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
      return Math.ceil(this.pokemonStore.totalCount / this.pokemonStore.limit)
    }
  },
  watch: {
    '$route.query.search': 'fetchPokemons',
    selectedType: 'fetchPokemons',
  },
  methods: {
    async fetchPokemons() {
      const searchQuery = this.searchQuery || ''
      const type = this.selectedType || ''
      await this.pokemonStore.fetchPokemons(this.pokemonStore.currentPage, searchQuery, type)
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
      this.selectedType = ''
      this.updateURL()
      this.fetchPokemons()
    },
    goToPokemonDetail(id) {
      this.$router.push({ name: 'pokemon-detail', params: { id } })
    },
    addToCart(pokemon) {
      const cartStore = useCartStore()
      cartStore.addToCart(pokemon)
    },
    async previousPage() {
      if (this.pokemonStore.currentPage > 1) {
        this.pokemonStore.currentPage -= 1
        await this.fetchPokemons()
        this.updateURL()
      }
    },
    async nextPage() {
      if (this.pokemonStore.currentPage < this.totalPages) {
        this.pokemonStore.currentPage += 1
        await this.fetchPokemons()
        this.updateURL()
      }
    },
    toggleTypeFilter() {
      this.typeFilter = !this.typeFilter
    },
    updateSelectedType(event) {
      this.searchQuery = ''
      this.selectedType = event.target.getAttribute('value')
      this.pokemonStore.currentPage = 1 // Reset to page 1
      this.updateURL()
      this.fetchPokemons()
    },
    updateURL() {
      this.$router.push({ name: 'pokemon-list', query: { search: this.searchQuery, type: this.selectedType, page: this.pokemonStore.currentPage } })
    },
  },
  async created() {
    await this.pokemonStore.fetchPokemons()
    await this.fetchPokemonTypes()
  },
}
</script>

<template>
  <div>
    <div class="search-container">
      <div class="searchBar">
        <img src="@/assets/icons/search.svg" alt="Rechercher" />
        <input name="search-pokemon" type="text" v-model="searchQuery" placeholder="Rechercher un Pokémon" />
        <button @click="searchPokemon">Rechercher</button>
      </div>

      <div class="filters">
        <div id="typeFilter">
          <button @click="toggleTypeFilter">Filtrer par type</button>
          <div class="typeFilter" v-show="typeFilter">
            <div class="select-default" value="" @click="updateSelectedType($event)">Tous</div>
            <div v-for="type in pokemonTypes" :key="type" @click="updateSelectedType($event)">
              <img :src="`./src/assets/tags/${type}.svg`" :alt="type" :value="type" />
            </div>
          </div>
        </div>
      </div>
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
          <div class="pokemon-header">
            <span class="pokemon-id">#{{ pokemon.id }}</span>
            <div v-if="pokemon.types.length === 1" class="pokemon-type">
              <img :src="`./src/assets/tags/${pokemon.types[0]}.svg`" :alt="pokemon.types[0]" class="pokemon-type"/>
            </div>
            <div v-else class="pokemon-types">
              <img v-for="type in pokemon.types" :key="type" :alt="type" class="pokemon-type" :src="`./src/assets/types/${type}.svg`"/>
            </div>
          </div>
          <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-icon"/>
          <div class="pokemon-details">
            <span class="pokemon-name">{{ pokemon.name }}</span>
            <span>{{ pokemon.price }}€</span>
          </div>
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