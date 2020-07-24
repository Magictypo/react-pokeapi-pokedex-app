import React from 'react';

const selectStyles = {
  margin: '8px',
};

export default function SelectFilter({ filters, onChange }) {
  return (
    <select
      style={selectStyles}
      onChange={onChange}
      className="form-control"
      name="filter"
      id="filter"
    >
      <option value="">Filter Value</option>
      { filters.map((o) => (
        <option value={o.name} key={o.name}>
          {o.name.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
