// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { AdminNuevoProducto } from './AdminNuevoProducto';
import { AuthProvider } from '../context/AuthContext';

describe('AdminNuevoProducto View', () => {
  it('debe renderizar el formulario para crear un nuevo producto', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <AdminNuevoProducto />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByText(/Nuevo Producto/i) || screen.getByRole('button')).toBeInTheDocument();
  });
});