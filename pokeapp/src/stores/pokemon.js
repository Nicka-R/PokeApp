import { defineStore } from 'pinia'
import { request } from '@/services/httpClient'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 0,
    limit: 24,
    searchCache: new Map() 
  }),
  actions: {
    async fetchPokemons(page = 1, searchQuery = '') {
      this.loading = true
      this.currentPage = page
      const offset = (page - 1) * this.limit

      try {
        if (searchQuery) {
          await this.searchPokemonByName(searchQuery)
          return
        }

        const response = await request(`/pokemon?limit=${this.limit}&offset=${offset}`)
        const pokemonDetails = await Promise.all(
          response.results.map(async (pokemon) => {
            return this.fetchPokemonDetails(pokemon.url.split('/').slice(-2, -1)[0])
          })
        )

        this.pokemons = pokemonDetails
        this.totalPages = Math.ceil(response.count / this.limit)
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async searchPokemonByName(name) {
      this.loading = true
      const searchTerm = name.toLowerCase()

      try {
        // utilisation du cache pour ne pas faire trop de requêtes
        if (this.searchCache.has(searchTerm)) {
          this.pokemons = this.searchCache.get(searchTerm)
          return
        }

        const response = await request(`/pokemon/${searchTerm}`)
        const pokemon = await this.fetchPokemonDetails(response.id)
        
        this.pokemons = [pokemon]
        this.searchCache.set(searchTerm, this.pokemons)
        
      } catch (error) {
        try {
          const response = await request('/pokemon?limit=100&offset=0')
          const filteredResults = response.results.filter(p => 
            p.name.includes(searchTerm)
          )

          const pokemonDetails = await Promise.all(
            filteredResults.slice(0, 10).map(pokemon => 
              this.fetchPokemonDetails(pokemon.url.split('/').slice(-2, -1)[0])
            )
          )

          this.pokemons = pokemonDetails
          this.searchCache.set(searchTerm, pokemonDetails)
        } catch (secondError) {
          this.error = "Aucun Pokémon trouvé avec ce nom"
          this.pokemons = []
        }
      } finally {
        this.loading = false
      }
    },

    async fetchPokemonDetails(id) {
      try {
        const details = await request(`/pokemon/${id}`)
        return {
          id: details.id,
          name: details.name,
          image: details.sprites.other.dream_world.front_default ?? details.sprites.front_default,
          price: details.base_experience,
          type: details.types.map(typeInfo => typeInfo.type.name).join(', '),
          weight: details.weight / 10,
          height: details.height / 10
        }
      } catch (error) {
        throw error
      }
    }
  }
})