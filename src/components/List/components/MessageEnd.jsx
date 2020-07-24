import React from 'react';
import PropTypes from 'prop-types';

export default function MessageEnd({
  count, type, filterURL, hasMore, isLoading,
}) {
  let message = '';

  if (type && !filterURL) {
    message = 'Please Select Filter Value.';
  }

  if (hasMore === false) {
    message = 'You have reach end of list. No More Pokemon Available';
  }

  if (count === 0 && !isLoading) {
    message = 'No Pokemon Found.';
  }

  if (message) {
    return (
      <div className="text-center p-2">
        {message}
      </div>
    );
  }
  return null;
}

MessageEnd.propTypes = {
  type: PropTypes.string.isRequired,
  filterURL: PropTypes.string.isRequired,
  hasMore: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
