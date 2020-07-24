import React from 'react';
import PropTypes from 'prop-types';

const FILTER_TYPES = [
  { type: 'type', label: 'Type' },
  { type: 'ability', label: 'Ability' },
];

const selectStyles = {
  margin: '8px',
};

export default function SelectType({ value, onChange }) {
  return (
    <select
      value={value}
      className="form-control"
      style={selectStyles}
      onChange={onChange}
      name="filterType"
      id="filterType"
    >
      <option value="">Filter: No Filter</option>
      { FILTER_TYPES.map((o) => (
        <option value={o.type} key={o.type}>
          {`Filter By ${o.label}`}
        </option>
      ))}
    </select>
  );
}

SelectType.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
