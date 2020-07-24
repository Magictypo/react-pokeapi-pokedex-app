import { useState, useEffect } from 'react';
import { getByURL, getPokemons } from '../../services/PokeAPI';

function getIdFromURL(url) {
  const array = url.split('/');
  // id on array index 6 from url detail
  const id = array[6];
  return id;
}

function normalizer(data) {
  const result = { ...data };
  result.id = getIdFromURL(data.url);
  result.images = `/assets/sprites/pokemon/${result.id}.png`;
  return result;
}

function normalizerFiltered(data) {
  const result = { ...data };
  result.name = data.pokemon.name;
  result.url = data.pokemon.url;
  result.id = getIdFromURL(data.pokemon.url);
  result.images = `/assets/sprites/pokemon/${result.id}.png`;
  return result;
}

export function usePokemons(filterType, filterValue) {
  const [data, setData] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    setLoading(true);
    getPokemons(10, 0)
      .then((res) => {
        setData(res.data.results.map(normalizer));
        setNextPage(res.data.next);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!filterType) return;

    getByURL(`/${filterType.type}`).then((res) => {
      setFilters(res.data.results);
      setLoading(false);
    });
  }, [filterType]);

  useEffect(() => {
    if (!filterType || !filterValue) return;

    const id = getIdFromURL(filterValue.url);
    getByURL(`/${filterType.type}/${id}`).then((res) => {
      setData(res.data.pokemon.map(normalizerFiltered));
      setLoading(false);
    });
  }, [filterValue]);

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
    filters,
  };
}

export default { usePokemons };
