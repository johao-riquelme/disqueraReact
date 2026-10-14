import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const PagoExitoso = () => {

  const location = useLocation();
  const orden = location.state?.orden;

  return (
    <main className="fondo-hero min-vh-100 py-5 text-light d-flex align-items-center justify-content-center">
      <div className="container pt-5 text-center">

        <div
          className="rr text-light border-gold p-4 p-md-5 rounded-4 shadow-lg d-inline-block text-start"
          style={{ maxWidth: '650px', width: '100%' }}
        >

          <div className="text-center mb-4">

            <i className="bi bi-check-circle-fill text-success display-1 mb-2"></i>

            <h2 className="gold-title fw-bold">
              {orden
                ? '¡Compra Simulada Exitosa!'
                : 'Comprobante de Compra'}
            </h2>

            <p className="text-muted">
              {orden
                ? 'Tu pedido ha sido registrado en The Reyes Records.'
                : 'No hay un comprobante disponible para mostrar.'}
            </p>

          </div>

          {orden ? (

            <div className="bg-dark p-3 rounded-3 mb-4 border border-secondary">

              <p className="mb-2">
                <b>N° de Orden:</b>{' '}

                <span className="gold-title fw-bold">
                  {orden.idOrden}
                </span>
              </p>

              <p className="mb-2">
                <b>Fecha:</b> {orden.fecha}
              </p>

              <p className="mb-2">
                <b>Cliente:</b>{' '}
                {orden.cliente?.nombre}{' '}
                {orden.cliente?.apellido}
              </p>

              <p className="mb-2">
                <b>Correo:</b> {orden.cliente?.email}
              </p>

              <p className="mb-2">
                <b>Dirección de despacho:</b>{' '}
                {orden.cliente?.direccion},{' '}
                {orden.cliente?.comuna},{' '}
                {orden.cliente?.region}
              </p>

              <p className="mb-2">
                <b>Estado:</b>{' '}

                <span className="text-success fw-bold">
                  {orden.estado === 'aprobado_simulado'
                    ? 'Aprobado (simulación)'
                    : orden.estado || 'Sin información'}
                </span>
              </p>

              <p className="mb-2">
                <b>Método de pago:</b> Simulado
              </p>

              <hr className="border-secondary my-2" />

              <p className="mb-0 fs-5">
                <b>Total de la compra:</b>{' '}

                <span className="gold-title fw-bold">
                  ${Number(orden.total || 0).toLocaleString('es-CL')} CLP
                </span>
              </p>

              <p className="text-muted small mt-3 mb-0">
                Esta es una compra de laboratorio.
                No se ha realizado ningún cobro real.
              </p>

            </div>

          ) : (

            <div className="alert alert-info text-center">
              Para ver un comprobante, realiza una compra
              desde el carrito.
            </div>

          )}

          <div className="text-center mt-4">

            <Link
              to="/productos"
              className="btn btn-warning fw-bold px-4 text-dark"
            >
              Volver al Catálogo
            </Link>

          </div>

        </div>

      </div>
    </main>
  );
};
