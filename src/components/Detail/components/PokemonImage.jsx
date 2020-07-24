import React from 'react';
import PropTypes from 'prop-types';

export default function PokemonImage({ id }) {
  return (
    <img src={`/assets/sprites/pokemon/${id}.png`} alt="" />
  );
}

PokemonImage.propTypes = {
  id: PropTypes.string.isRequired,
};
