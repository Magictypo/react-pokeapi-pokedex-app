import React from 'react';
import PropTypes from 'prop-types';

const TYPES = [
  { type: 'type', label: 'Type' },
  { type: 'ability', label: 'Ability' },
];

const selectStyles = {
  margin: '8px',
};

export default function SelectType({ value, onChange, disabled }) {
  const listOptions = TYPES.map((o) => (
    <option value={o.type} key={o.type}>
      {`Filter By ${o.label}`}
    </option>
  ));

  return (
    <select
      value={value}
      className="form-control"
      style={selectStyles}
      onChange={onChange}
      name="filterType"
      id="filterType"
      disabled={disabled}
    >
      <option value="">Filter: No Filter</option>
      {listOptions}
    </select>
  );
}

SelectType.defaultProps = {
  disabled: false,
};

SelectType.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
