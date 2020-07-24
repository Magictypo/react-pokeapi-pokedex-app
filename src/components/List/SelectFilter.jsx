import React from 'react';

const selectStyles = {
  margin: '8px',
};

export default function SelectFilter({
  value, filterType, filters, onChange, isLoading,
}) {
  return (
    <select
      value={value}
      style={selectStyles}
      onChange={onChange}
      className="form-control"
      name="filter"
      id="filter"
      disabled={!filterType && isLoading}
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
