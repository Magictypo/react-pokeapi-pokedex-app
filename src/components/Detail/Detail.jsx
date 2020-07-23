import React from 'react';
import { useParams } from 'react-router-dom';
import { usePokemon } from './hooks';

function Detail() {
  const { name } = useParams();
  const pokemon = usePokemon(name);

  return (
    <div>
      <h1>
        Detail Page
        {' '}
        {pokemon.data.name}
      </h1>
    </div>
  );
}

export default Detail;
