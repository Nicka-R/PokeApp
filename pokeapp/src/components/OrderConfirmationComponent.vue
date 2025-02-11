<script>
export default {
  name: 'OrderConfirmationComponent',
  computed: {
    firstName() {
      return this.$route.query.firstName
    },
    lastName() {
      return this.$route.query.lastName
    },
    email() {
      return this.$route.query.email
    }
  }
}
</script>

<template>
  <div class="order-confirmation">
    <h1>Commande Confirmée</h1>
    <p>Merci pour votre commande, {{ firstName }} {{ lastName }}!</p>
    <p>Un email de confirmation a été envoyé à {{ email }}.</p>
    <router-link to="/"><button>Retour à la page d'accueil</button></router-link>
  </div>
</template>

<style>
.order-confirmation {
  text-align: center;
  padding: 20px;
}
</style>