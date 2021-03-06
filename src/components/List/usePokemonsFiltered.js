import { useEffect, useReducer } from 'react';
import { getByURL } from '../../services/PokeAPI';

function getIdFromURL(url) {
  const array = url.split('/');
  // id on array index 6 from url detail
  // example url : https://pokeapi.co/api/v2/pokemon/202/
  const id = array[6];
  return id;
}

function normalizer(data) {
  const result = { ...data };
  result.name = data.pokemon.name;
  result.url = data.pokemon.url;
  result.id = getIdFromURL(data.pokemon.url);
  result.images = `/assets/sprites/pokemon/${result.id}.png`;
  return result;
}

const ACTION = {
  MAKE_REQUEST: 'MAKE_REQUEST',
  GET_DATA: 'GET_DATA',
  GET_MORE: 'GET_MORE',
  CLEAR_DATA: 'CLEAR_DATA',
  ERROR: 'ERROR',
};

const initialState = ({
  isLoading: false,
  data: [],
  nextData: [],
  isNextPage: false,
});

function reducer(state, action) {
  switch (action.type) {
    case ACTION.CLEAR_DATA:
      return { ...initialState };
    case ACTION.MAKE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isNextPage: false,
        data: [],
      };
    case ACTION.GET_DATA:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        nextData: action.payload.nextData,
        isNextPage: !!action.payload.nextData.length,
      };
    case ACTION.GET_MORE:
      return {
        ...state,
        isLoading: false,
        data: [...state.data, ...action.payload.data],
        isNextPage: !!state.nextData.length,
      };
    default:
      return state;
  }
}

export default function usePokemonsFiltered(type, typeId) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!type) return;
    if (type && !typeId) {
      dispatch({ type: ACTION.CLEAR_DATA });
      return;
    }

    dispatch({ type: ACTION.MAKE_REQUEST });
    getByURL(`/${type}/${typeId}`).then((res) => {
      const data = res.data.pokemon.map(normalizer);

      dispatch({
        type: ACTION.GET_DATA,
        payload: {
          data: data.splice(0, 5),
          nextData: data,
        },
      });
    });
  }, [type, typeId]);

  function getMore() {
    if (state.isLoading) return;
    if (state.isNextPage === false) return;

    dispatch({
      type: ACTION.GET_MORE,
      payload: {
        data: state.nextData.splice(0, 5),
      },
    });
  }

  return { ...state, getMore };
}
