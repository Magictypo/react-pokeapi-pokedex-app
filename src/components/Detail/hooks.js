import { useState, useEffect } from 'react';
import { getPokemonById } from '../../services/PokeAPI';

export function usePokemon(name) {
  const initialState = { data: {} };
  const [data, setData] = useState(initialState);

  useEffect(() => {
    (async function () {
      const res = await getPokemonById(name);
      setData({ data: res.data });
    }());
  }, [name]);

  return data;
}

export default { usePokemon };
