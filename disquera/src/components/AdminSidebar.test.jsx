// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { AdminSidebar } from './AdminSidebar';

describe('AdminSidebar Component', () => {
  it('debe renderizar el título del panel y los enlaces principales', () => {
    render(
      <MemoryRouter>
        <AdminSidebar />
      </MemoryRouter>
    );

    expect(screen.getByText('THE REYES')).toBeInTheDocument();
    expect(screen.getByText('PANEL ADMIN')).toBeInTheDocument();
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Productos/i)).toBeInTheDocument();
    expect(screen.getByText(/Usuarios/i)).toBeInTheDocument();
  });

  it('debe contener el botón para volver a la vista de usuario', () => {
    render(
      <MemoryRouter>
        <AdminSidebar />
      </MemoryRouter>
    );

    expect(screen.getByText(/Ir a Vista Usuario/i)).toBeInTheDocument();
  });
});