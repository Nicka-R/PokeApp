const BASE_URL = 'https://pokeapi.co/api/v2';

const request = async (
  endpoint,
  method = 'GET',
  body = null,
  isAuthRequest = false,
) => {
  // Pour l'API Pokémon, nous n'avons pas besoin d'authentification
  // mais gardons la structure de base pour d'éventuelles futures fonctionnalités
  const headers = {
    'Content-Type': 'application/json',
  };

  const config = {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    
    // Gérer la réponse
    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message || 'Something went wrong');
    }

    return await response.json();
    
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export { request };