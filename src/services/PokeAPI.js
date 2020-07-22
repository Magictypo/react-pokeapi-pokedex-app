import axios from 'axios';
import { getCache, setCache } from './CacheSvc';

async function getFromAPI(url) {
  const cache = await getCache(url);

  console.log(cache);

  if (cache) {
    return cache;
  }

  const response = await axios.get(url, {
    // official website https://pokeapi.co
    baseURL: process.env.REACT_APP_POKE_API_BASE_URL || 'https://pokeapi.co/api/v2',
  });
  await setCache(url, response.data);
  return response;
}

export function getPokemons(limit, offset) {
  const url = `/pokemon?limit=${limit}&offset=${offset}`;
  return getFromAPI(url);
}

export function getPokemonById(id) {
  const url = `/pokemon/${id}`;
  return getFromAPI(url);
}
