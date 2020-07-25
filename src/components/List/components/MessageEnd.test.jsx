import React from 'react';
import { render } from '@testing-library/react';
import MessageEnd from './MessageEnd';

const messageA = 'Please Select Filter Value.';
const messageB = 'No Pokemon Found.';
const messageC = 'You have reach end of list. No More Pokemon Available.';

describe('MessageEnd working correctly', () => {
  test('renders MessageEnd type helper', () => {
    const count = 0;
    const type = 'type';
    const id = '';
    const hasMore = false;
    const isLoading = false;

    const { getByText } = render(
      <MessageEnd
        isLoading={isLoading}
        count={count}
        type={type}
        id={id}
        hasMore={hasMore}
      />,
    );
    const linkElement = getByText(messageA);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders MessageEnd count', () => {
    const count = 0;
    const type = 'type';
    const id = '202';
    const hasMore = false;
    const isLoading = false;

    const { getByText } = render(
      <MessageEnd
        isLoading={isLoading}
        count={count}
        type={type}
        id={id}
        hasMore={hasMore}
      />,
    );
    const linkElement = getByText(messageB);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders MessageEnd count', () => {
    const count = 20;
    const type = 'type';
    const id = '202';
    const hasMore = false;
    const isLoading = false;

    const { getByText } = render(
      <MessageEnd
        isLoading={isLoading}
        count={count}
        type={type}
        id={id}
        hasMore={hasMore}
      />,
    );
    const linkElement = getByText(messageC);
    expect(linkElement).toBeInTheDocument();
  });
});
