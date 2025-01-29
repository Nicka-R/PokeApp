<template>
  <div>
    <PokemonCardComponent :pokemon="pokemon" />
  </div>
</template>

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
      pokemonStore: usePokemonStore()
    }
  },
  async created() {
    const pokemonId = this.$route.params.id
    this.pokemon = await this.pokemonStore.fetchPokemonDetails(pokemonId)
  }
}
</script>