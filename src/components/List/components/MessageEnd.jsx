import React from 'react';
import PropTypes from 'prop-types';

export default function MessageEnd({
  count, type, id, hasMore, isLoading,
}) {
  let message = '';

  if (type && !id) {
    message = 'Please Select Filter Value.';
  } else if (count === 0 && !isLoading) {
    message = 'No Pokemon Found.';
  } else if (hasMore === false) {
    message = 'You have reach end of list. No More Pokemon Available.';
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

MessageEnd.defaultProps = {
  id: '',
  type: '',
};

MessageEnd.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  hasMore: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
