import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { usePokemonStore } from './stores/pokemon'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)

const store = usePokemonStore()
router.isReady().then(() => {
  if (router.currentRoute.value.name === 'pokemon-list') {
    document.getElementById('prevPage').addEventListener('click', () => {
      store.previousPage().then(updateCurrentPage)
    })

    document.getElementById('nextPage').addEventListener('click', () => {
      store.nextPage().then(updateCurrentPage)
    })

    function updateCurrentPage() {
      document.getElementById('currentPage').textContent = `Page: ${store.currentPage} / ${store.totalPages}`
    }

    // Initial fetch
    store.fetchPokemons().then(updateCurrentPage)
  }
})

app.mount('#app')