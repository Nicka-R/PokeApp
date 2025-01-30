<script>
import { useCartStore } from '@/stores/cart'
import { usePokemonStore } from '@/stores/pokemon'

export default {
  name: 'PokemonCardComponent',
  data() {
    return {
      pokemonStore: null,
      pokemon: null,
      loading: false,
      error: null
    }
  },
  props: {
    pokemon: {
      type: Object,
      required: true
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
        this.pokemon = await this.pokemonStore.fetchPokemonDetails(pokemonId)
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    addToCart() {
      const store = useCartStore()
      store.addToCart(this.pokemon)
    }
  }
}
</script>

<template>
  <router-link to="/">
    <button>Retour</button>
  </router-link>
  <div v-if="loading" class="loading">
    Chargement des détails du Pokémon...
  </div>
  <div v-else-if="error" class="error">
    {{ error }}
  </div>
  <div v-else-if="pokemon" class="pokemon-detail">
    <img :src="pokemon.image" :alt="pokemon.name">
    <h1>{{ pokemon.name }}</h1>
    <p>Prix: {{ pokemon.price }} €</p>
    <p>Type: {{ pokemon.types }}</p>
    <p>Poids: {{ pokemon.weight }} kg</p>
    <p>Taille: {{ pokemon.height }} m</p>
    <p>Abilites: {{ pokemon.abilities }}</p>
    <p>Moves: {{ pokemon.moves }}</p>
  </div>
  <div>
    <button @click="addToCart">Ajouter au panier</button>
  </div>
</template>

<style>
.pokemon-detail {
  text-align: center;
  padding: 20px;
}

.pokemon-detail img {
  width: 200px;
  height: 200px;
}

.loading, .error {
  text-align: center;
  padding: 20px;
}
</style>