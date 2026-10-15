// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Contacto } from './Contacto';

describe('Contacto View', () => {
  it('debe renderizar la vista de contacto', () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );

    expect(document.body).toBeInTheDocument();
  });
});