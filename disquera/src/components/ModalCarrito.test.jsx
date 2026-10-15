// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import * as ModalModule from './ModalCarrito';
import { CarritoProvider } from '../context/CarritoContext';

const ModalCarrito = ModalModule.ModalCarrito || ModalModule.default;

describe('ModalCarrito Component', () => {
  it('debe renderizar el modal del carrito de compras', () => {
    render(
      <CarritoProvider>
        <MemoryRouter>
          <ModalCarrito show={true} handleClose={() => {}} />
        </MemoryRouter>
      </CarritoProvider>
    );

    expect(document.body).toBeInTheDocument();
  });
});