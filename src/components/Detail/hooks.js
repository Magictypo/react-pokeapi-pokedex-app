import { useState, useEffect } from 'react';
import { getPokemonById } from '../../services/PokeAPI';

const initialState = {
  height: '',
  weight: '',
  order: '',
  name: '',
  image: '',
  types: [],
  abilities: [],
  moves: [],
  stats: {
    hp: '',
    attack: '',
    defense: '',
    specialAttack: '',
    specialDefense: '',
    speed: '',
  },
};

function reduceNameByKey(array, key) {
  return array.reduce((types, o) => {
    types.push(o[key].name);
    return types;
  }, []);
}

function normalizer(data) {
  const normalized = { ...initialState };
  normalized.height = data.height;
  normalized.weight = data.weight;
  normalized.order = data.order;
  normalized.name = data.name;
  normalized.image = data.sprites.front_default;

  const types = reduceNameByKey(data.types, 'type');
  normalized.types = types.join(', ');

  const abilities = reduceNameByKey(data.abilities, 'ability');
  normalized.abilities = abilities.join(', ');

  const moves = reduceNameByKey(data.moves, 'move');
  normalized.moves = moves.join(', ');

  normalized.stats = {
    hp: data.stats.find((o) => o.stat.name === 'hp').base_stat,
    attack: data.stats.find((o) => o.stat.name === 'attack').base_stat,
    defense: data.stats.find((o) => o.stat.name === 'defense').base_stat,
    specialAttack: data.stats.find((o) => o.stat.name === 'special-attack').base_stat,
    specialDefense: data.stats.find((o) => o.stat.name === 'special-defense').base_stat,
    speed: data.stats.find((o) => o.stat.name === 'speed').base_stat,
  };
  return normalized;
}

export function usePokemon(name) {
  const [data, setData] = useState(initialState);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const res = await getPokemonById(name);
      setData(normalizer(res.data));
      setLoading(false);
    }
    getData();
  }, [name]);

  return [isLoading, data];
}

export default { usePokemon };
