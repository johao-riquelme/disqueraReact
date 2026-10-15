import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { obtenerMisComprasAPI } from '../services/api.js';

export const MisCompras = () => {

  const { usuario } = useAuth();

  const [compras, setCompras] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const formatearPrecio = (precio) => {
    return `$${Number(precio || 0).toLocaleString('es-CL')} CLP`;
  };

  const formatearFecha = (fecha) => {
    if (!fecha) {
      return 'Sin fecha';
    }

    const fechaConvertida = new Date(fecha);

    if (Number.isNaN(fechaConvertida.getTime())) {
      return 'Sin fecha';
    }

    return fechaConvertida.toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  useEffect(() => {
    let activo = true;

    const cargarMisCompras = async () => {

      if (!usuario) {
        setCompras([]);
        setCargando(false);
        return;
      }

      try {
        setCargando(true);
        setError('');

        const datos = await obtenerMisComprasAPI();

        if (activo) {
          setCompras(Array.isArray(datos) ? datos : []);
        }

      } catch (err) {

        if (activo) {
          setError(
            err.message ||
            'No se pudo consultar el historial de compras.'
          );
        }

      } finally {

        if (activo) {
          setCargando(false);
        }

      }
    };

    cargarMisCompras();

    return () => {
      activo = false;
    };

  }, [usuario]);

  if (!usuario) {
    return (
      <main className="fondo-hero min-vh-100 py-5 text-light">
        <div className="container text-center pt-5">

          <h2 className="gold-title fw-bold mb-4">
            MIS COMPRAS
          </h2>

          <div className="rr border-gold rounded-4 p-4 shadow-lg">

            <h4 className="text-light mb-3">
              Debes iniciar sesión
            </h4>

            <p className="text-light">
              Inicia sesión para consultar tu historial de compras.
            </p>

            <Link
              to="/login"
              className="btn btn-warning fw-bold text-dark px-4"
            >
              Iniciar Sesión
            </Link>

          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="fondo-hero min-vh-100 py-5 text-light">

      <div className="container pt-5">

        <div className="text-center mb-5">

          <h1 className="gold-title fw-bold mb-3">
            MIS COMPRAS
          </h1>

          <p className="text-light">
            Consulta los pedidos registrados en THE REYES RECORDS.
          </p>

          <p className="gold-title">
            Cliente: {usuario.nombre} {usuario.apellido}
          </p>

        </div>
        {cargando && (
          <div className="text-center py-5">

            <div
              className="spinner-border text-warning"
              role="status"
            />

            <p className="mt-3 text-light">
              Cargando tus compras...
            </p>

          </div>
        )}
        {!cargando && error && (
          <div
            className="alert alert-danger text-center"
            role="alert"
          >
            {error}
          </div>
        )}
        {!cargando && !error && compras.length === 0 && (
          <div className="rr border-gold rounded-4 p-5 text-center shadow-lg">

            <h3 className="gold-title mb-3">
              Todavía no tienes compras registradas
            </h3>

            <p className="text-light mb-4">
              Cuando realices una compra, aparecerá aquí.
            </p>

            <Link
              to="/productos"
              className="btn btn-warning fw-bold text-dark px-4"
            >
              Ver Productos
            </Link>

          </div>
        )}

        {!cargando && !error && compras.length > 0 && (
          <div className="row g-4">

            {compras.map((compra) => {

              const productos = Array.isArray(compra.productos)
                ? compra.productos
                : [];

              const planes = Array.isArray(compra.planes)
                ? compra.planes
                : [];

              return (
                <div
                  className="col-12"
                  key={compra.id}
                >

                  <div className="rr text-light border-gold rounded-4 p-4 shadow-lg">

                    <div className="row g-3 align-items-center mb-3">

                      <div className="col-md-6">

                        <h4 className="gold-title fw-bold mb-2">
                          Pedido N.º {compra.numeroPedido}
                        </h4>

                        <p className="text-light mb-0">
                          <strong>Fecha:</strong>{' '}
                          {formatearFecha(compra.fecha)}
                        </p>

                      </div>

                      <div className="col-md-6 text-md-end">

                        <p className="mb-2">

                          <strong>Estado:</strong>{' '}

                          <span className="text-success fw-bold">
                            {compra.estado === 'aprobado_simulado'
                              ? 'Aprobado (simulación)'
                              : compra.estado}
                          </span>

                        </p>

                        <p className="mb-0">
                          <strong>Pago:</strong> Simulado
                        </p>

                      </div>

                    </div>

                    <hr className="border-secondary" />

                    {productos.length > 0 && (
                      <>

                        <h5 className="gold-title fw-bold mb-3">
                          Productos Comprados
                        </h5>

                        <div className="table-responsive">

                          <table className="table table-dark table-bordered align-middle">

                            <thead>
                              <tr>

                                <th>Producto</th>

                                <th className="text-center">
                                  Cantidad
                                </th>

                                <th className="text-end">
                                  Precio Unitario
                                </th>

                                <th className="text-end">
                                  Subtotal
                                </th>

                              </tr>
                            </thead>

                            <tbody>

                              {productos.map((producto, indice) => (
                                <tr
                                  key={`${producto.productoId}-${indice}`}
                                >

                                  <td>
                                    {producto.nombre}
                                  </td>

                                  <td className="text-center">
                                    {producto.cantidad}
                                  </td>

                                  <td className="text-end">
                                    {formatearPrecio(
                                      producto.precioUnitario
                                    )}
                                  </td>

                                  <td className="text-end">
                                    {formatearPrecio(
                                      producto.subtotal
                                    )}
                                  </td>

                                </tr>
                              ))}

                            </tbody>

                          </table>

                        </div>

                      </>
                    )}

                    {planes.length > 0 && (
                      <>

                        <h5 className="gold-title fw-bold mb-3 mt-4">
                          Planes Contratados
                        </h5>

                        <div className="table-responsive">

                          <table className="table table-dark table-bordered align-middle">

                            <thead>
                              <tr>

                                <th>Plan</th>

                                <th className="text-center">
                                  Cantidad
                                </th>

                                <th className="text-end">
                                  Precio Unitario
                                </th>

                                <th className="text-end">
                                  Subtotal
                                </th>

                              </tr>
                            </thead>

                            <tbody>

                              {planes.map((plan, indice) => (
                                <tr
                                  key={`${plan.planId}-${indice}`}
                                >

                                  <td>
                                    {plan.nombre}
                                  </td>

                                  <td className="text-center">
                                    {plan.cantidad}
                                  </td>

                                  <td className="text-end">
                                    {formatearPrecio(
                                      plan.precioUnitario
                                    )}
                                  </td>

                                  <td className="text-end">
                                    {formatearPrecio(
                                      plan.subtotal
                                    )}
                                  </td>

                                </tr>
                              ))}

                            </tbody>

                          </table>

                        </div>

                      </>
                    )}

                    <p className="text-light mt-3">

                      <strong>Dirección de despacho:</strong>{' '}

                      {compra.direccionEnvio}

                    </p>

                    <hr className="border-secondary" />

                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

                      <h5 className="text-light fw-bold mb-0">
                        Total del Pedido:
                      </h5>
                      <h4 className="gold-title fw-bold mb-0">
                        {formatearPrecio(compra.total)}
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        )}

        <div className="text-center mt-5">
          <Link
            to="/productos"
            className="btn btn-outline-warning fw-bold px-4"
          >
            Volver al Catálogo
          </Link>
        </div>
      </div>
    </main>
  );
};
