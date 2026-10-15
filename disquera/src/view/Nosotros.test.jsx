// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Nosotros } from './Nosotros';

describe('Nosotros View', () => {
  it('debe renderizar la vista sobre la disquera', () => {
    render(
      <MemoryRouter>
        <Nosotros />
      </MemoryRouter>
    );

    expect(document.body).toBeInTheDocument();
  });
});