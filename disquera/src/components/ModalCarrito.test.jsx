import {
  render,
  screen,
  fireEvent,
  within
} from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { ModalCarrito } from './ModalCarrito.jsx';
const mocks = vi.hoisted(() => ({
  actualizarCantidad: vi.fn(),
  eliminarDelCarrito: vi.fn(),
  vaciarCarrito: vi.fn()
}));

vi.mock('../context/CarritoContext.jsx', () => ({
  useCarrito: () => ({
    carrito: [
      {
        id: 1,
        tipo: 'producto',
        claveCarrito: 'producto-1',
        nombre: 'Micrófono de prueba',
        precio: 159990,
        cantidad: 1,
        imagen: '/micro/micro1.jpg'
      },
      {
        id: 1,
        tipo: 'plan',
        claveCarrito: 'plan-1',
        nombre: 'PLAN BÁSICO',
        precio: 50000,
        cantidad: 1,
        imagen: '/planes/planB.png'
      }
    ],
    actualizarCantidad: mocks.actualizarCantidad,
    eliminarDelCarrito: mocks.eliminarDelCarrito,
    vaciarCarrito: mocks.vaciarCarrito,
    obtenerTotalPrecio: () => 209990
  })
}));
describe('ModalCarrito Component', () => {
  it('debe mostrar productos y planes, calcular el total y diferenciarlos al modificar el carrito', () => {
    render(
      <MemoryRouter>
        <ModalCarrito
          show={true}
          handleClose={() => {}}
        />
      </MemoryRouter>
    );
    expect(
      screen.getByText('Micrófono de prueba')
    ).toBeInTheDocument();
    expect(
      screen.getByText('PLAN BÁSICO')
    ).toBeInTheDocument();
    expect(
      screen.getByText('$209.990 CLP')
    ).toBeInTheDocument();
    const filaPlan = screen
      .getByText('PLAN BÁSICO')
      .closest('tr');
    fireEvent.click(
      within(filaPlan).getByRole('button', {
        name: '+'
      })
    );
    expect(
      mocks.actualizarCantidad
    ).toHaveBeenCalledWith(1, 2, 'plan');
    fireEvent.click(
      within(filaPlan).getByTitle('Eliminar producto')
    );
    expect(
      mocks.eliminarDelCarrito
    ).toHaveBeenCalledWith(1, 'plan');
    const filaProducto = screen
      .getByText('Micrófono de prueba')
      .closest('tr');
    fireEvent.click(
      within(filaProducto).getByRole('button', {
        name: '-'
      })
    );
    expect(
      mocks.actualizarCantidad
    ).toHaveBeenCalledWith(1, 0, 'producto');
  });
});
