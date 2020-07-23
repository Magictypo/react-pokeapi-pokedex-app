import React from 'react';
import { Link } from 'react-router-dom';
import { usePokemons } from './hooks';

const listStyle = { width: '18rem' };

export default function List() {
  const pokemons = usePokemons();

  const listItems = pokemons.data.map((pokemon) => (
    <li className="list-group-item" key={pokemon.name}>
      <Link to={`/${pokemon.name}`}>{pokemon.name}</Link>
    </li>
  ));

  return (
    <div className="card" style={listStyle}>
      <ul className="list-group list-group-flush">{listItems}</ul>
    </div>
  );
}
