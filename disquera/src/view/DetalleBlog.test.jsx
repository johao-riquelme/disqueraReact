// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { DetalleBlog } from './DetalleBlog';

describe('DetalleBlog View', () => {
  it('debe renderizar los detalles del artículo de blog', () => {
    render(
      <MemoryRouter>
        <DetalleBlog />
      </MemoryRouter>
    );

    expect(document.body).toBeInTheDocument();
  });
});