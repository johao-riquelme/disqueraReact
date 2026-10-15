import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { MisCompras } from './MisCompras.jsx';
vi.mock('../context/AuthContext.jsx', () => ({
  useAuth: () => ({
    usuario: {
      id: 5,
      nombre: 'Cliente',
      apellido: 'Prueba',
      correo: 'cliente@ejemplo.com'
    }
  })
}));
vi.mock('../services/api.js', () => ({
  obtenerMisComprasAPI: vi.fn().mockResolvedValue([
    {
      id: 10,
      numeroPedido: 10,
      fecha: '2026-10-15T10:00:00',
      total: 209990,
      estado: 'aprobado_simulado',
      medioPago: 'simulado',
      direccionEnvio: 'Santiago, Región Metropolitana',
      productos: [
        {
          productoId: 1,
          nombre: 'Micrófono de prueba',
          cantidad: 1,
          precioUnitario: 159990,
          subtotal: 159990
        }
      ],
      planes: [
        {
          planId: 1,
          nombre: 'PLAN BÁSICO',
          cantidad: 1,
          precioUnitario: 50000,
          subtotal: 50000
        }
      ]
    }
  ])
}));

describe('MisCompras View', () => {

  it('debe mostrar productos y planes contratados en el historial', async () => {

    render(
      <MemoryRouter>
        <MisCompras />
      </MemoryRouter>
    );

    expect(
      await screen.findByText('Pedido N.º 10')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Micrófono de prueba')
    ).toBeInTheDocument();
    expect(
      screen.getByText('PLAN BÁSICO')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Productos Comprados')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Planes Contratados')
    ).toBeInTheDocument();
    expect(
      screen.getByText('$209.990 CLP')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Aprobado (simulación)')
    ).toBeInTheDocument();

  });

});
