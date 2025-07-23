// pokemonServices.js
import api from './api';

export const getPokemons = async () => {
  try {
    const response = await api.get('/pokemon');
    return response.data;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    throw error;
  }
};

