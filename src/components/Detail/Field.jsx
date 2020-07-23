import React from 'react';

function Field(props) {
  return (
    <div>
      <h6 className="card-subtitle mb-1">{props.label}</h6>
      <p className="card-text mb-3">{props.value}</p>
    </div>
  );
}

export default Field;
