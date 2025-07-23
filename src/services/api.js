import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5029/PokemonReviewAPP', // try HTTP first
});

export default api;
