// Respect PublicAPI by caching it.
import { Pokedex } from 'pokeapi-js-wrapper';

const options = {
  protocol: 'https',
  versionPath: '/api/v2/',
  cache: true,
  timeout: 24 * 60 * 60 * 1000, // 24hour
};

export default new Pokedex(options);
