import React from 'react';

export default function SelectType({ filterTypes = [], onChange }) {
  return (
    <select
      onChange={onChange}
      className="form-control"
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
