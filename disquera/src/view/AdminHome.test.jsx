// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { AdminHome } from './AdminHome';

describe('AdminHome Component', () => {
  it('debe mostrar el mensaje de bienvenida y los KPIs', () => {
    render(
      <MemoryRouter>
        <AdminHome />
      </MemoryRouter>
    );

    expect(screen.getByText('¡Bienvenido, Administrador!')).toBeInTheDocument();
    expect(screen.getByText('Ventas Totales')).toBeInTheDocument();
    expect(screen.getByText('$12,450 USD')).toBeInTheDocument();
    expect(screen.getByText('Admin Online')).toBeInTheDocument();
  });
});