import { useState } from 'react';
import { getPokemons } from '../../services/PokeAPI';

export function usePokemons() {
  const initialState = { data: [] };
  const [data, setData] = useState(initialState);

  async function getData() {
    const res = await getPokemons(10, 20);
    setData({ data: res.data.results });
  }
  getData();

  return data;
}

export function usePokemon(pokemon, index) {
  function onClick() {
    console.log('clicked');
  }

  return {
    key: index,
    value: pokemon.name,
    onClick,
  };
}

export default { usePokemons };