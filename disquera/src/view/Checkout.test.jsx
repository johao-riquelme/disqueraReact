
import {
  render,
  screen,
  fireEvent,
  waitFor
} from '@testing-library/react';

import {
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom';

import {
  describe,
  it,
  expect,
  vi
} from 'vitest';

import { Checkout } from './Checkout.jsx';

const mocks = vi.hoisted(() => ({
  crearPedidoAPI: vi.fn(),
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
        cantidad: 1
      },
      {
        id: 1,
        tipo: 'plan',
        claveCarrito: 'plan-1',
        nombre: 'PLAN BÁSICO',
        precio: 50000,
        cantidad: 1
      }
    ],
    obtenerTotalPrecio: () => 209990,
    vaciarCarrito: mocks.vaciarCarrito
  })
}));

vi.mock('../context/AuthContext.jsx', () => ({
  useAuth: () => ({
    usuario: {
      nombre: 'Cliente',
      apellido: 'Prueba',
      correo: 'cliente@ejemplo.com',
      direccion: 'Dirección de prueba'
    }
  })
}));

vi.mock('../services/api.js', () => ({
  crearPedidoAPI: mocks.crearPedidoAPI
}));

describe('Checkout View', () => {

  it('debe comprar productos y planes diferenciando sus tipos', async () => {

    mocks.crearPedidoAPI.mockReset();
    mocks.vaciarCarrito.mockReset();

    mocks.crearPedidoAPI.mockResolvedValue({
      id: 10,
      numeroPedido: 10,
      total: 209990,
      estado: 'aprobado_simulado',
      medioPago: 'simulado'
    });

    render(
      <MemoryRouter initialEntries={['/checkout']}>
        <Routes>
          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/pago-exitoso"
            element={
              <div>Pago simulado registrado</div>
            }
          />
        </Routes>
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
    fireEvent.click(
      screen.getByRole('button', {
        name: 'Confirmar y Pagar'
      })
    );
    await waitFor(() => {
      expect(
        mocks.crearPedidoAPI
      ).toHaveBeenCalledTimes(1);
    });
    expect(
      mocks.crearPedidoAPI
    ).toHaveBeenCalledWith(
      expect.objectContaining({
        items: [
          {
            id: 1,
            cantidad: 1,
            tipo: 'producto'
          },
          {
            id: 1,
            cantidad: 1,
            tipo: 'plan'
          }
        ]
      })
    );
    await waitFor(() => {
      expect(
        mocks.vaciarCarrito
      ).toHaveBeenCalledTimes(1);
    });
    expect(
      await screen.findByText(
        'Pago simulado registrado'
      )
    ).toBeInTheDocument();
  });
});
