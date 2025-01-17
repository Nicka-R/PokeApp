
import { defineStore } from 'pinia'
import { request } from '@/services/httpClient'
export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchPokemons() {
      this.loading = true
      try {
          const response = await request('/pokemon?limit=20&offset=0')
                console.log(response.results)
          const pokemonDetails = await Promise.all(
              response.results.map(async (pokemon) => {
                const details = await request(pokemon.url.replace('https://pokeapi.co/api/v2', ''))
                return {
                  id: details.id,
                  name: details.name,
                  image: details.sprites.front_default,
                  price: details.base_experience
                }
                
            })
        
        )
        this.pokemons = pokemonDetails
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
})