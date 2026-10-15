// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { PagoExitoso } from './PagoExitoso';
import { CarritoProvider } from '../context/CarritoContext';

describe('PagoExitoso View', () => {
  it('debe renderizar la confirmación del pago exitoso', () => {
    render(
      <CarritoProvider>
        <MemoryRouter>
          <PagoExitoso />
        </MemoryRouter>
      </CarritoProvider>
    );

    expect(document.body).toBeInTheDocument();
  });
});