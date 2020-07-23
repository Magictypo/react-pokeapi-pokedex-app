import React from 'react';

function Spinner(props) {
  const { isLoading } = props;

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return null;
}

export default Spinner;
