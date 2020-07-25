import React from 'react';
import { render } from '@testing-library/react';
import ListItem from './ListItem';

describe('button ListItem working correctly', () => {
  test('rendered correctly', async () => {
    const id = '1';
    const name = 'John Doe';
    const imageSrc = '/assets/sprites/pokemon/1.png';
    const wrap = render(<ListItem id={id} name={name} images={imageSrc} />);

    const idH1 = wrap.getByText(`#${id}`);
    const nameH1 = wrap.getByText(name.toUpperCase());
    const renderedImage = await wrap.findAllByAltText('pokemon');

    expect(idH1).toBeInTheDocument();
    expect(nameH1).toBeInTheDocument();
    expect(renderedImage[0].src).toBe(`http://localhost${imageSrc}`);
  });
});
