import React from 'react';

export default function MessageEnd(props) {
  const { hasMore } = props;

  if (hasMore === false) {
    return (
      <div className="text-center" style={{ padding: 8 }}>
        You have reach end of list. No More Pokemon Available
      </div>
    );
  }
  return null;
}
