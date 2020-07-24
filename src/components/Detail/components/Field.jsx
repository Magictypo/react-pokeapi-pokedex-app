import React from 'react';
import PropTypes from 'prop-types';

export default function Field({ label, value }) {
  return (
    <div>
      <h6 className="card-subtitle mb-1">{label}</h6>
      <p className="card-text mb-3">{value}</p>
    </div>
  );
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
