
import { defineStore } from 'pinia'
import { request } from '@/services/httpClient'
export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [],
    loading: false,
    error: null,
    currentPage: null,
    totalPages: 0,
    limit: 24
  }),
  actions: {
    async fetchPokemons(page = 1, searchQuery = '') {
      this.loading = true
      this.currentPage = page
      const offset = (page - 1) * this.limit
      try {
        const response = await request(`/pokemon?limit=${this.limit}&offset=${offset}`);
        let pokemonDetails = await Promise.all(
          response.results.map(async (pokemon) => {
            const details = await request(pokemon.url.replace('https://pokeapi.co/api/v2', ''));
            return {
              id: details.id,
              name: details.name,
              image: details.sprites.front_default,
              price: details.base_experience
            }
          })
        )
        if (searchQuery) {
          pokemonDetails = pokemonDetails.filter(pokemon => pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()))
        }
        this.pokemons = pokemonDetails;
        this.totalPages = Math.ceil(response.count / this.limit);
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    async fetchPokemonDetails(id) {
      this.loading = true
      try {
        const details = await request(`/pokemon/${id}`)
        return {
          id: details.id,
          name: details.name,
          image: details.sprites.front_default,
          price: details.base_experience,
          type: details.types.map(typeInfo => typeInfo.type.name).join(', '),
          weight: details.weight / 10, 
          height: details.height / 10 
        }
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    async nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1
        this.fetchPokemons(this.currentPage)
      }
    },
    async previousPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1
        this.fetchPokemons(this.currentPage)
      }
    }
  }
})