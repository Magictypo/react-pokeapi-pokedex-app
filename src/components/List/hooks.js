import { useState, useEffect } from 'react';
import { getPokemons } from '../../services/PokeAPI';

export function usePokemons() {
  const initialState = { data: [] };
  const [data, setData] = useState(initialState);

  useEffect(() => {
    async function getData() {
      const res = await getPokemons(10, 20);
      setData({ data: res.data.results });
    }
    getData();
  }, []);

  return data;
}

export default { usePokemons };
