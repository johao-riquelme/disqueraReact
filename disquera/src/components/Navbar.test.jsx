// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Navbar } from './Navbar';
import { CarritoProvider } from '../context/CarritoContext';
import { AuthProvider } from '../context/AuthContext';

describe('Navbar Component', () => {
  it('debe renderizar el nombre de la disquera y las secciones principales', () => {
    render(
      <AuthProvider>
        <CarritoProvider>
          <MemoryRouter>
            <Navbar />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    );

    expect(screen.getByText(/THE REYES RECORDS/i)).toBeInTheDocument();
    expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
    expect(screen.getByText(/Productos/i)).toBeInTheDocument();
  });
});