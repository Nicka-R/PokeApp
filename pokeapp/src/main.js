import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { usePokemonStore } from './stores/pokemon'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)

const store = usePokemonStore()
// if(document.getElementById('currentPage'))
// document.getElementById('currentPage').textContent = `Page: ${store.currentPage} / ${store.totalPages}`;

// Initial fetch
store.fetchPokemons().then()


app.mount('#app')