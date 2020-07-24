import React from 'react';

export default function SelectFilter({ filterType, filters, onChange }) {
  if (filterType) {
    return (
      <select
        onChange={onChange}
        className="form-control"
        name="filter"
        id="filter"
      >
        <option value="">
          {`SELECT ${filterType.label}`}
        </option>
        { filters.map((o) => (
          <option value={o.name} key={o.name}>
            {o.name.toUpperCase()}
          </option>
        ))}
      </select>
    );
  }
  return null;
}
