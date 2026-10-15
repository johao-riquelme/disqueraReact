// @vitest-environment jsdom
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { AdminUsuarios } from './AdminUsuarios';

describe('AdminUsuarios Component', () => {
  it('debe renderizar los usuarios y el distintivo del Administrador', () => {
    render(
      <MemoryRouter>
        <AdminUsuarios />
      </MemoryRouter>
    );

    expect(screen.getByText('Johao Riquelme')).toBeInTheDocument();
    expect(screen.getByText('admin@thereyesrecords.cl')).toBeInTheDocument();
    expect(screen.getByText('Administrador')).toBeInTheDocument();
  });

  it('debe remover al usuario seleccionado tras la confirmación', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);

    render(
      <MemoryRouter>
        <AdminUsuarios />
      </MemoryRouter>
    );

    const botonesEliminar = screen.getAllByText(/Eliminar/i);
    fireEvent.click(botonesEliminar[1]);

    expect(screen.queryByText('Carlos Torres')).not.toBeInTheDocument();
  });
});