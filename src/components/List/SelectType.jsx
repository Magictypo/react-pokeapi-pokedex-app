import React from 'react';

const selectStyles = {
  margin: '8px',
};

export default function SelectType({ value, filterTypes = [], onChange }) {
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
      { filterTypes.map((o) => (
        <option value={o.type} key={o.type}>
          {`Filter By ${o.label}`}
        </option>
      ))}
    </select>
  );
}
