import { useState, useEffect } from 'react';
import { getByURL, getPokemons } from '../../services/PokeAPI';

export function usePokemons() {
  const [data, setData] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const res = await getPokemons(10, 0);
      setData(res.data.results);
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
    setData([...data, ...res.data.results]);
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
