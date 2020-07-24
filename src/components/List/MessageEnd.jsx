import React from 'react';
import PropTypes from 'prop-types';

export default function MessageEnd({ filterType, filterValue, hasMore }) {
  if (filterType && !filterValue) {
    return (
      <div className="text-center" style={{ padding: 8 }}>
        Please Select Filter Value.
      </div>
    );
  }

  if (hasMore === false) {
    return (
      <div className="text-center" style={{ padding: 8 }}>
        You have reach end of list. No More Pokemon Available
      </div>
    );
  }
  return null;
}

MessageEnd.propTypes = {
  filterType: PropTypes.string.isRequired,
  filterValue: PropTypes.string.isRequired,
  hasMore: PropTypes.bool.isRequired,
};
