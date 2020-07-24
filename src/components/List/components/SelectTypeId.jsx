import React from 'react';
import PropTypes from 'prop-types';
import useFilters from '../useFilters';

const selectStyles = {
  margin: '8px',
};

export default function SelectFilter({
  value, type, onChange, disabled,
}) {
  const { options, isLoading } = useFilters(type);

  const listOptions = options.map((o) => (
    <option value={o.id} key={o.name}>
      {o.name.toUpperCase()}
    </option>
  ));

  return (
    <select
      value={value}
      style={selectStyles}
      onChange={onChange}
      className="form-control"
      name="filter"
      id="filter"
      disabled={!type || isLoading || disabled}
    >
      <option value="">Filter Value</option>
      {listOptions}
    </select>
  );
}

SelectFilter.defaultProps = {
  disabled: false,
};

SelectFilter.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
