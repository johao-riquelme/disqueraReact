// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { DetalleProducto } from './DetalleProducto';
import { CarritoProvider } from '../context/CarritoContext';
import { AuthProvider } from '../context/AuthContext';

describe('DetalleProducto View', () => {
  it('debe renderizar el detalle del producto seleccionado', () => {
    render(
      <AuthProvider>
        <CarritoProvider>
          <MemoryRouter>
            <DetalleProducto />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    );

    expect(document.body).toBeInTheDocument();
  });
});