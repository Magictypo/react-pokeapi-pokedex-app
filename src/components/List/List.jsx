import React from 'react';
import { Link } from 'react-router-dom';
import { usePokemons } from './hooks';

export default function List() {
  const pokemons = usePokemons();

  const listItems = pokemons.data.map((pokemon) => (
    <li key={pokemon.name}>
      <Link to={`/${pokemon.name}`}>{pokemon.name}</Link>
    </li>
  ));

  return <ul>{listItems}</ul>;
}
