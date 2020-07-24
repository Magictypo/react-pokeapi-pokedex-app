import { useEffect, useReducer } from 'react';
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

const ACTION = {
  MAKE_REQUEST: 'make-request',
  GET_POKEMON: 'get-pokemon',
  GET_NEXT_PAGE: 'get-next-page',
  GET_FILTERS: 'get-filters',
  GET_POKEMON_BY_FILTER: 'get-pokemon-by-filter',
  MAKE_REQUEST_BY_FILTER: 'make-request-by-filter',
};

const initialState = ({
  data: [],
  isFilteredData: false,
  isNextPage: false,
  nextURL: '',
  isLoading: false,
  filters: [],
});

function reducer(state, action) {
  switch (action.type) {
    case ACTION.MAKE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isFilteredData: false,
        isNextPage: false,
      };
    case ACTION.MAKE_REQUEST_BY_FILTER:
      return {
        ...state,
        isLoading: true,
        isFilteredData: true,
        isNextPage: false,
        data: [],
      };
    case ACTION.GET_POKEMON:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        isNextPage: !!action.payload.next,
        nextURL: action.payload.next,
      };
    case ACTION.GET_NEXT_PAGE:
      return {
        ...state,
        isLoading: false,
        data: [...state.data, ...action.payload.data],
        isNextPage: !!action.payload.next,
        nextURL: action.payload.next,
      };
    case ACTION.GET_FILTERS:
      return {
        ...state,
        isLoading: false,
        filters: action.payload.data,
      };
    case ACTION.GET_POKEMON_BY_FILTER:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        isNextPage: false,
      };
    default:
      return state;
  }
}

export function usePokemons(page, filterType, filterValue) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: ACTION.MAKE_REQUEST });
    getPokemons(10, 0).then((res) => {
      dispatch({
        type: ACTION.GET_POKEMON,
        payload: {
          data: res.data.results.map(normalizer),
          next: res.data.next,
          nextURL: res.data.next,
        },
      });
    });
  }, []);

  useEffect(() => {
    if (!filterType) return;

    dispatch({ type: ACTION.MAKE_REQUEST_BY_FILTER });
    getByURL(`/${filterType.type}`).then((res) => {
      dispatch({
        type: ACTION.GET_FILTERS,
        payload: {
          data: res.data.results,
        },
      });
    });
  }, [filterType]);

  useEffect(() => {
    if (!filterType || !filterValue) return;

    dispatch({ type: ACTION.MAKE_REQUEST_BY_FILTER });
    const id = getIdFromURL(filterValue.url);
    getByURL(`/${filterType.type}/${id}`).then((res) => {
      dispatch({
        type: ACTION.GET_POKEMON_BY_FILTER,
        payload: {
          data: res.data.pokemon.map(normalizerFiltered),
        },
      });
    });
  }, [filterValue]);

  useEffect(() => {
    // exit if invalid condition
    if (state.isLoading) return;
    if (state.isNextPage === false) return;
    if (state.isFilteredData === true) return;

    // start load data
    dispatch({ type: ACTION.MAKE_REQUEST });
    getByURL(state.nextURL).then((res) => {
      dispatch({
        type: ACTION.GET_NEXT_PAGE,
        payload: {
          data: res.data.results.map(normalizer),
          next: res.data.next,
          nextURL: res.data.next,
        },
      });
    });
  }, [page]);

  return state;
}

export default { usePokemons };
