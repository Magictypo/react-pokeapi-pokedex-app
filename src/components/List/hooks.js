import { useState, useEffect } from 'react';
import { getByURL, getPokemons } from '../../services/PokeAPI';

function getPokemonId(url) {
  const array = url.split('/');
  // id on array index 6 from url detail
  const id = array[6];
  return id;
}

function normalizer(data) {
  const result = { ...data };
  result.id = getPokemonId(data.url);
  result.images = `/assets/sprites/pokemon/${result.id}.png`;
  return result;
}

export function usePokemons() {
  const [data, setData] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const res = await getPokemons(10, 0);
      setData(res.data.results.map(normalizer));
      setNextPage(res.data.next);
      setLoading(false);
    }
    getData();
  }, []);

  async function getNextPage() {
    // exit if still loading or no next page
    if (isLoading || nextPage === null) return;

    // start load data
    setLoading(true);
    const res = await getByURL(nextPage);
    setData([...data.map(normalizer), ...res.data.results.map(normalizer)]);
    setNextPage(res.data.next);
    setLoading(false);
  }

  return {
    isLoading,
    data,
    nextPage,
    getNextPage,
  };
}

export default { usePokemons };
