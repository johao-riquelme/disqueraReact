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
            <h2 className="gold-title fw-bold">¡Pago Realizado con Éxito!</h2>
            <p className="text-muted">Tu orden ha sido registrada en The Reyes Records</p>
          </div>

          {orden ? (
            <div className="bg-dark p-3 rounded-3 mb-4 border border-secondary">
              <p className="mb-2">
                <b>N° de Orden:</b> <span className="gold-title fw-bold">{orden.idOrden}</span>
              </p>
              <p className="mb-2"><b>Fecha:</b> {orden.fecha}</p>
              <p className="mb-2">
                <b>Cliente:</b> {orden.cliente?.nombre} {orden.cliente?.apellido}
              </p>
              <p className="mb-2"><b>Correo:</b> {orden.cliente?.email}</p>
              <p className="mb-2">
                <b>Dirección de despacho:</b> {orden.cliente?.direccion}, {orden.cliente?.comuna}
              </p>
              <hr className="border-secondary my-2" />
              <p className="mb-0 fs-5">
                <b>Total Pagado:</b>{' '}
                <span className="gold-title fw-bold">
                  ${orden.total?.toLocaleString('es-CL')} CLP
                </span>
              </p>
            </div>
          ) : (
            <div className="alert alert-info text-center">
              Tu orden ha sido procesada correctamente.
            </div>
          )}

          <div className="text-center mt-4">
            <Link to="/productos" className="btn btn-warning fw-bold px-4 text-dark">
              Volver al Catálogo
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};