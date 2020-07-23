import React from 'react';
import { usePokemons } from './hooks';

export default function List() {
  const pokemons = usePokemons();

  const listItems = pokemons.data.map((pokemon) => (
    <li key={pokemon.name}>
      {pokemon.name}
    </li>
  ));

  return <ul>{listItems}</ul>;
}
