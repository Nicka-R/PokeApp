<script>
import PokemonCardComponent from '@/components/PokemonCardComponent.vue'
import { usePokemonStore } from '@/stores/pokemon'

export default {
  name: 'PokemonDetails',
  components: {
    PokemonCardComponent
  },
  data() {
    return {
      pokemon: null,
      loading: true,
      error: null,
      pokemonStore: usePokemonStore()
    }
  },
  async created() {
    const pokemonId = this.$route.params.id
    try {
      this.pokemon = await this.pokemonStore.fetchPokemonDetails(pokemonId)
    } catch (error) {
      this.error = error.message
    } finally {
      this.loading = false
    }
  }
}
</script>

<template>
  <div>
    <div v-if="loading" class="loading">
      Chargement des détails du Pokémon...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else-if="pokemon">
      <PokemonCardComponent :pokemon="pokemon" />
    </div>
  </div>
</template>