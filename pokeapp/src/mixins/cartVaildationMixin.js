export default {
  methods: {
    validateOrderForm() {
      if (!this.firstName || !this.lastName || !this.email) {
        alert('Veuillez remplir tous les champs du formulaire.')
        return false
      }
      // Vérification de l'adresse email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.email)) {
        alert('Veuillez saisir une adresse email valide.')
        return false
      }

      //s'il n'y a qu'une seule lettre dans le prénom ou le nom
      if (this.firstName.length < 2 || this.lastName.length < 2) {
        alert('Veuillez saisir un prénom et un nom valide.')
        return false
      }
      return true
    }
  }
}