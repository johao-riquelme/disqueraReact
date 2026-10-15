// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Servicios } from './Servicios';

describe('Servicios View', () => {
  it('debe renderizar la vista de servicios ofrecidos', () => {
    render(
      <MemoryRouter>
        <Servicios />
      </MemoryRouter>
    );

    expect(document.body).toBeInTheDocument();
  });
});