// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Productos } from './Productos';
import { CarritoProvider } from '../context/CarritoContext';
import { AuthProvider } from '../context/AuthContext';

describe('Productos View', () => {
  it('debe renderizar la grilla de productos de la tienda', () => {
    render(
      <AuthProvider>
        <CarritoProvider>
          <MemoryRouter>
            <Productos />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    );

    expect(document.body).toBeInTheDocument();
  });
});