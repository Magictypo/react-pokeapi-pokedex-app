import { useEffect, useReducer } from 'react';
import { getByURL, getPokemons } from '../../services/PokeAPI';

function getIdFromURL(url) {
  const array = url.split('/');
  // id on array index 6 from url detail
  // example url : https://pokeapi.co/api/v2/pokemon/202/
  const id = array[6];
  return id;
}

function normalizer(data) {
  const result = { ...data };
  result.id = getIdFromURL(data.url);
  result.images = `/assets/sprites/pokemon/${result.id}.png`;
  return result;
}

const ACTION = {
  MAKE_REQUEST: 'MAKE_REQUEST',
  GET_DATA: 'GET_DATA',
  GET_NEXT: 'GET_NET',
  ERROR: 'ERROR',
};

const initialState = ({
  isLoading: false,
  data: [],
  nextURL: '',
  isNextPage: false,
});

function reducer(state, action) {
  switch (action.type) {
    case ACTION.MAKE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isNextPage: false,
      };
    case ACTION.GET_DATA:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        isNextPage: !!action.payload.next,
        nextURL: action.payload.next,
      };
    case ACTION.GET_NEXT:
      return {
        ...state,
        isLoading: false,
        data: [...state.data, ...action.payload.data],
        isNextPage: !!action.payload.next,
        nextURL: action.payload.next,
      };
    default:
      return state;
  }
}

export default function usePokemons() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: ACTION.MAKE_REQUEST });
    getPokemons(10, 0).then((res) => {
      dispatch({
        type: ACTION.GET_DATA,
        payload: {
          data: res.data.results.map(normalizer),
          next: res.data.next,
          nextURL: res.data.next,
        },
      });
    });
  }, []);

  function getMore() {
    if (state.isLoading) return;
    if (state.isNextPage === false) return;

    dispatch({ type: ACTION.MAKE_REQUEST });
    getByURL(state.nextURL).then((res) => {
      dispatch({
        type: ACTION.GET_NEXT,
        payload: {
          data: res.data.results.map(normalizer),
          next: res.data.next,
          nextURL: res.data.next,
        },
      });
    });
  }

  return { ...state, getMore };
}
