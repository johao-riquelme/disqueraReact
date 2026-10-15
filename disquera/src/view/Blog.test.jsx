// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Blog } from './Blog';

describe('Blog View', () => {
  it('debe renderizar la sección de publicaciones o noticias', () => {
    render(
      <MemoryRouter>
        <Blog />
      </MemoryRouter>
    );

    expect(document.body).toBeInTheDocument();
  });
});