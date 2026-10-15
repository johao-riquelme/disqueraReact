// @vitest-environment jsdom
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { AdminProductos } from './AdminProductos';

describe('AdminProductos Component', () => {
  it('debe renderizar el título de la vista y el mensaje de carga o productos', async () => {
    render(
      <MemoryRouter>
        <AdminProductos />
      </MemoryRouter>
    );

    // Verificamos el título principal
    expect(screen.getByText('Catálogo de Productos')).toBeInTheDocument();

    // Esperamos a que finalice el estado de carga o aparezcan los elementos de la vista
    await waitFor(() => {
      expect(screen.getByText(/Administra el inventario completo/i)).toBeInTheDocument();
    });
  });

  it('debe comprobar la presencia del botón para crear un nuevo producto', () => {
    render(
      <MemoryRouter>
        <AdminProductos />
      </MemoryRouter>
    );

    expect(screen.getByText(/NUEVO PRODUCTO/i)).toBeInTheDocument();
  });
});