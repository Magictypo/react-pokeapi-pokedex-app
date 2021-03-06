import React from 'react';
import PropTypes from 'prop-types';

export default function FieldBar({ label, value }) {
  const barStyle = { width: `${value}%` };
  return (
    <div>
      <h6 className="card-subtitle mb-1">{label}</h6>
      <div className="progress mb-3">
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <div
          style={barStyle}
          className="progress-bar progress-bar-striped"
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </div>
  );
}

FieldBar.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
