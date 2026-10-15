// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Albunes } from './Albunes';
import { CarritoProvider } from '../context/CarritoContext';
import { AuthProvider } from '../context/AuthContext';

describe('Albunes View', () => {
  it('debe renderizar la vista del catálogo de álbumes', () => {
    render(
      <AuthProvider>
        <CarritoProvider>
          <MemoryRouter>
            <Albunes />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    );

    expect(document.body).toBeInTheDocument();
  });
});