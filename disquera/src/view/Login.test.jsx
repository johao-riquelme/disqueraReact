// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Login } from './Login';
import { AuthProvider } from '../context/AuthContext';

describe('Login View', () => {
  it('debe contener los campos para ingresar credenciales', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthProvider>
    );

    // Búsqueda por sus etiquetas asociadas en el HTML
    const campoEmail = screen.getByLabelText(/Correo Electrónico/i);
    const campoPassword = screen.getByLabelText(/Contraseña/i);
    const botonIngresar = screen.getByRole('button', { name: /INGRESAR/i });

    expect(campoEmail).toBeInTheDocument();
    expect(campoPassword).toBeInTheDocument();
    expect(botonIngresar).toBeInTheDocument();
  });
});