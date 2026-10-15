// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { AdminEditarProducto } from './AdminEditarProducto';
import { AuthProvider } from '../context/AuthContext';

describe('AdminEditarProducto View', () => {
  it('debe renderizar el formulario de edición de producto', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <AdminEditarProducto />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByText(/Editar Producto/i) || screen.getByRole('heading')).toBeInTheDocument();
  });
});