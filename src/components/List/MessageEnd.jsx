import React from 'react';
import PropTypes from 'prop-types';

export default function MessageEnd({ type, filterURL, hasMore }) {
  if (type && !filterURL) {
    return (
      <div className="text-center p-2">
        Please Select Filter Value.
      </div>
    );
  }

  if (hasMore === false) {
    return (
      <div className="text-center p-2">
        You have reach end of list. No More Pokemon Available
      </div>
    );
  }
  return null;
}

MessageEnd.propTypes = {
  type: PropTypes.string.isRequired,
  filterURL: PropTypes.string.isRequired,
  hasMore: PropTypes.bool.isRequired,
};
