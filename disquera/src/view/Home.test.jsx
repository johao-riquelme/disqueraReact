// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Home } from './Home';
import { CarritoProvider } from '../context/CarritoContext';
import { AuthProvider } from '../context/AuthContext';

describe('Home View', () => {
  it('debe renderizar la vista principal de la tienda', () => {
    render(
      <AuthProvider>
        <CarritoProvider>
          <MemoryRouter>
            <Home />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    );

    expect(document.body).toBeInTheDocument();
  });
});