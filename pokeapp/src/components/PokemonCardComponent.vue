<script>
import { useCartStore } from '@/stores/cart'
import { usePokemonStore } from '@/stores/pokemon'
import '@/assets/css/pokemon-details.css'

export default {
  name: 'PokemonCardComponent',
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      pokemonStore: null,
      loading: false,
      error: null,
      pokemonDetails: this.pokemon
    }
  },
  async created() {
    this.pokemonStore = usePokemonStore()
    await this.fetchPokemonDetails()
  },
  methods: {
    async fetchPokemonDetails() {
      this.loading = true
      const pokemonId = this.$route.params.id
      try {
        this.pokemonDetails = await this.pokemonStore.fetchPokemonDetails(pokemonId)
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    addToCart() {
      const store = useCartStore()
      store.addToCart(this.pokemonDetails)
    }
  }
}
</script>

<template>
  <router-link to="/">
    <span class="return-link">< Retour</span>
  </router-link>
  <div v-if="loading" class="loading">
    Chargement des détails du Pokémon...
  </div>
  <div v-else-if="error" class="error">
    {{ error }}
  </div>
  <div v-else-if="pokemonDetails" class="pokemon-detail">
    <img :src="pokemonDetails.image" :alt="pokemonDetails.name">
    <div class="pokemon-info">
      <div class="pokemon-header">
        <div class="pokemon-name">{{ pokemonDetails.name }}</div>
        <div class="pokemon-type">
          <img v-for="type in pokemonDetails.types" :key="type" :alt="type" :src="`/src/assets/tags/${type}.svg`"/>
        </div>
      </div>
      <p><strong>Prix:</strong> {{ pokemonDetails.price }} €</p>
      <p><strong>Poids:</strong> {{ pokemonDetails.weight }} kg</p>
      <p><strong>Taille:</strong> {{ pokemonDetails.height }} m</p>
      <p class="abilities"><strong>Capacités:</strong> {{ pokemonDetails.abilities }}</p>
      <p class="moves"><strong>Attaques:</strong> {{ pokemonDetails.moves}}</p>
      <button @click="addToCart">Ajouter au panier</button>
    </div>
  </div>
</template>