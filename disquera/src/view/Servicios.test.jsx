import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Servicios } from './Servicios.jsx';
const mocks = vi.hoisted(() => ({
  agregarAlCarrito: vi.fn()
}));

vi.mock('../context/CarritoContext.jsx', () => ({
  useCarrito: () => ({
    agregarAlCarrito: mocks.agregarAlCarrito
  })
}));

describe('Servicios View', () => {
  it('debe mostrar los planes y permitir agregar uno al carrito', async () => {
    render(<Servicios />);
    expect(
      await screen.findByText('PLAN BÁSICO')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Valor $50.000 CLP')
    ).toBeInTheDocument();
    const botones = screen.getAllByRole('button', {
      name: 'Agregar al Carrito'
    });
    fireEvent.click(botones[0]);
    expect(mocks.agregarAlCarrito).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        tipo: 'plan',
        nombre: 'PLAN BÁSICO',
        precio: 50000
      })
    );
  });
});
