import React from 'react';
import { render } from '@testing-library/react';
import PokedexApp from './PokedexApp';

test('renders pokedex link', () => {
  const { getByText } = render(<PokedexApp />);
  const linkElement = getByText(/Pokedex/i);
  expect(linkElement).toBeInTheDocument();
});
