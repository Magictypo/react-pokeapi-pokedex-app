import React from 'react';
import PropTypes from 'prop-types';

const titleStyle = {
  // 96px is height of the image sprites
  lineHeight: '96px',
};

export default function PokemonName({ order, name }) {
  return (
    <h2 style={titleStyle} className="card-title">
      {`#${order} ${name.toUpperCase()}`}
    </h2>
  );
}

PokemonName.propTypes = {
  order: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
