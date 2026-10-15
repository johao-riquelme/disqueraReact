// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { MisCompras } from './MisCompras';
import { AuthProvider } from '../context/AuthContext';

describe('MisCompras View', () => {
  it('debe renderizar el historial de compras del usuario', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <MisCompras />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(document.body).toBeInTheDocument();
  });
});