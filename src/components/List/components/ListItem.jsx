import React from 'react';
import PropTypes from 'prop-types';

const listItemStyles = {
  margin: '8px',
};

const alignTextMiddle = {
  // 96px is height of the image sprites
  lineHeight: '96px',
};

export default function ListItem({ id, images, name }) {
  return (
    <div style={listItemStyles} className="list-group-item d-flex justify-content-between">
      <h1 style={alignTextMiddle} className="mb-0">{`#${id}`}</h1>
      <img src={images} alt="" />
      <h1 style={alignTextMiddle}>{`${name.toUpperCase()}`}</h1>
    </div>
  );
}

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  images: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
