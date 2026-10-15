// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Checkout } from './Checkout';
import { CarritoProvider } from '../context/CarritoContext';
import { AuthProvider } from '../context/AuthContext';

describe('Checkout View', () => {
  it('debe renderizar la vista del proceso de pago', () => {
    render(
      <AuthProvider>
        <CarritoProvider>
          <MemoryRouter>
            <Checkout />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    );

    expect(document.body).toBeInTheDocument();
  });
});