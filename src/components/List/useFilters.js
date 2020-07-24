import { useEffect, useReducer } from 'react';
import { getByURL } from '../../services/PokeAPI';

const ACTION = {
  MAKE_REQUEST: 'MAKE_REQUEST',
  GET_FILTER_OPTIONS: 'GET_FILTER_OPTIONS',
  ERROR: 'ERROR',
};

const initialState = {
  isLoading: false,
  options: [],
};

function getIdFromURL(url) {
  const array = url.split('/');
  // id on array index 6 from url detail
  const id = array[6];
  return id;
}

function normalizer(data) {
  const result = { ...data };
  result.id = getIdFromURL(data.url);
  return result;
}

function reducer(state, action) {
  switch (action.type) {
    case ACTION.MAKE_REQUEST:
      return { ...state, isLoading: true, options: [] };
    case ACTION.GET_FILTER_OPTIONS:
      return { ...state, isLoading: false, options: action.payload.data };
    default:
      return state;
  }
}

export default function useFilters(type) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!type) return;

    dispatch({ type: ACTION.MAKE_REQUEST });
    getByURL(`/${type}`).then((res) => {
      dispatch({
        type: ACTION.GET_FILTER_OPTIONS,
        payload: {
          data: res.data.results.map(normalizer),
        },
      });
    });
  }, [type]);

  return state;
}
