import { useEffect, useReducer } from 'react';
import { getPokemonById } from '../../services/PokeAPI';

const initialState = {
  id: '',
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
  normalized.id = data.id;
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

const ACTION = {
  MAKE_REQUEST: 'MAKE_REQUEST',
  GET_DATA: 'GET_DATA',
  ERROR: 'ERROR',
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION.MAKE_REQUEST:
      return { ...state, isLoading: true };
    case ACTION.GET_DATA:
      return { ...state, isLoading: false, data: action.payload.data };
    default:
      return state;
  }
}

export function usePokemon(id) {
  const [state, dispatch] = useReducer(reducer, { isLoading: false, data: initialState });

  useEffect(() => {
    dispatch({ type: ACTION.MAKE_REQUEST });
    getPokemonById(id).then((res) => {
      dispatch({
        type: ACTION.GET_DATA,
        payload: {
          data: normalizer(res.data),
        },
      });
    });
  }, [id]);

  return state;
}

export default { usePokemon };
