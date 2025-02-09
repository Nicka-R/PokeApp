import { defineStore } from 'pinia'
import { request } from '@/services/httpClient'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalCount: 0,
    limit: 24,
    searchCache: new Map(),
    types: []
  }),
  actions: {
    async fetchPokemons(page = 1, searchQuery = '', type = '') {
      this.loading = true
      this.currentPage = page
      const offset = (page - 1) * this.limit
      const cacheKey = `pokemons_${page}_${searchQuery}_${type}`

      try {
        if (this.searchCache.has(cacheKey)) {
          this.pokemons = this.searchCache.get(cacheKey)
          this.totalCount = this.pokemons.length
          return
        }

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

        this.totalCount = response.count
        this.searchCache.set(cacheKey, this.pokemons)
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async searchPokemonByName(name) {
      this.loading = true
      const searchTerm = name.toLowerCase()
      const cacheKey = `search_${searchTerm}`

      try {
        if (this.searchCache.has(cacheKey)) {
          this.pokemons = this.searchCache.get(cacheKey)
          this.totalCount = this.pokemons.length
          return
        }

        const response = await request(`/pokemon/${searchTerm}`)
        const pokemon = await this.fetchPokemonDetails(response.id)
        
        this.pokemons = [pokemon]
        this.totalCount = this.pokemons.length
        this.searchCache.set(cacheKey, this.pokemons)
        
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
          this.totalCount = this.pokemons.length
          this.searchCache.set(cacheKey, pokemonDetails)
        } catch (secondError) {
          this.error = "Aucun Pokémon trouvé avec ce nom"
          this.pokemons = []
          this.totalCount = 0
        }
      } finally {
        this.loading = false
      }
    },

    async searchPokemonByType(type) {
      this.loading = true
      const cacheKey = `type_${type}`

      try {
        if (this.searchCache.has(cacheKey)) {
          this.pokemons = this.searchCache.get(cacheKey)
          this.totalCount = this.pokemons.length
          return
        }

        const response = await request(`/type/${type}`)
        const pokemonDetails = await Promise.all(
          response.pokemon.map(async (p) => {
            return this.fetchPokemonDetails(p.pokemon.url.split('/').slice(-2, -1)[0])
          })
        )

        this.pokemons = pokemonDetails
        this.totalCount = this.pokemons.length
        this.searchCache.set(cacheKey, pokemonDetails)
      } catch (error) {
        this.error = `Aucun Pokémon trouvé avec le type ${type}`
        this.pokemons = []
        this.totalCount = 0
      } finally {
        this.loading = false
      }
    },

    async fetchPokemonDetails(id) {
      const cacheKey = `details_${id}`
      if (this.searchCache.has(cacheKey)) {
        return this.searchCache.get(cacheKey)
      }

      try {
        const details = await request(`/pokemon/${id}`)
        const pokemon = {
          id: details.id,
          name: details.name,
          image: details.sprites.other.dream_world.front_default ?? details.sprites.front_default,
          price: details.base_experience,
          types: details.types.map(typeInfo => typeInfo.type.name),
          weight: details.weight / 10,
          height: details.height / 10,
          abilities: details.abilities.map(ability => ability.ability.name).join(', '),
          moves: details.moves.map(moveInfo => moveInfo.move.name).slice(0, 5).join(', ')
        }
        this.searchCache.set(cacheKey, pokemon)
        return pokemon
      } catch (error) {
        throw error
      }
    },

    async fecthPokemonTypes() {
      try {
        const response = await request('/type')
        this.types = response.results.slice(0, -2)
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