import React from 'react';

const backButtonStyle = {
  fontSize: '2rem',
  marginTop: '1.25vw',
};

export default function BackButton() {
  return (
    <div>
      <button
        style={backButtonStyle}
        onClick={() => window.history.back()}
        className="form-control"
        type="button"
      >
        Back
      </button>
    </div>
  );
}
