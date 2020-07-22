import React from 'react';
import { render } from '@testing-library/react';
import PokedexApp from './PokedexApp';

test('renders learn react link', () => {
  const { getByText } = render(<PokedexApp />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
