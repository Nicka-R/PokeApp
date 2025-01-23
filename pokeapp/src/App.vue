<template>
<main>
  <input type="text" v-model="searchQuery" placeholder="Rechercher un Pokémon" />
  <button @click="searchPokemon">Rechercher</button>
  <RouterView />
  <div v-if="$route.name === 'pokemon-list'">
    <button id="prevPage">Previous Page</button>
    <span id="currentPage">Page : 1</span>
    <button id="nextPage">Next Page</button>
  </div>
</main>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    searchPokemon() {
      this.$router.push({ name: 'pokemon-list', query: { search: this.searchQuery } })
    }
  }
}
</script>

<style>
</style>