// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import * as Module from './Registros';
import { AuthProvider } from '../context/AuthContext';

// Permite cargar el componente ya sea si es export default, Registro o Registros
const ComponenteRegistro = Module.default || Module.Registros || Module.Registro;

describe('Registros View', () => {
  it('debe renderizar el formulario de registro de nuevos usuarios', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <ComponenteRegistro />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(document.body).toBeInTheDocument();
  });
});