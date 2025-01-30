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
    searchCache: new Map(),
    types: []
  }),
  actions: {
    async fetchPokemons(page = 1, searchQuery = '', type = '') {
      this.loading = true
      this.currentPage = page
      const offset = (page - 1) * this.limit

      try {
        if (searchQuery) {
          await this.searchPokemonByName(searchQuery)
          return
        }

        if (type) {
          await this.searchPokemonByType(type)
          return
        }

        const response = await request(`/pokemon?limit=${this.limit}&offset=${offset}`)
        const pokemonDetails = await Promise.all(
          response.results.map(async (pokemon) => {
            return this.fetchPokemonDetails(pokemon.url.split('/').slice(-2, -1)[0])
          })
        )

        if (page === 1) {
          this.pokemons = pokemonDetails
        } else {
          this.pokemons = [...this.pokemons, ...pokemonDetails]
        }

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

    async searchPokemonByType(type) {
      this.loading = true

      try {
        const response = await request(`/type/${type}`)
        const pokemonDetails = await Promise.all(
          response.pokemon.map(async (p) => {
            return this.fetchPokemonDetails(p.pokemon.url.split('/').slice(-2, -1)[0])
          })
        )

        this.pokemons = pokemonDetails
        this.totalPages = Math.ceil(this.pokemons.length / this.limit)
      } catch (error) {
        this.error = `Aucun Pokémon trouvé avec le type ${type}`
        this.pokemons = []
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
          height: details.height / 10,
          abilities: details.abilities.map(ability => ability.ability.name).join(', '),
          moves: details.moves.map(moveInfo => moveInfo.move.name).slice(0, 5).join(', ')
        }
      } catch (error) {
        throw error
      }
    },

    async fecthPokemonTypes() {
      try {
        const response = await request('/type')
        this.types = response.results
        return this.types
      } catch (error) {
        throw error
      }
    },

    async nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1
        await this.fetchPokemons(this.currentPage)
      }
    },
    async previousPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1
        await this.fetchPokemons(this.currentPage)
      }
    }
  }
})