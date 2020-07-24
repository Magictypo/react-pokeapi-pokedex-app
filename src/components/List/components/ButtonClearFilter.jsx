import React from 'react';
import PropTypes from 'prop-types';

const buttonStyles = {
  margin: '8px',
};

export default function ButtonClearFilter({ onClick, disabled }) {
  return (
    <button
      style={buttonStyles}
      className="btn-warning form-control"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      Clear Filter
    </button>
  );
}

ButtonClearFilter.defaultProps = {
  disabled: false,
};

ButtonClearFilter.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
