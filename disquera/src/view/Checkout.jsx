import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { crearPedidoAPI } from '../services/api.js';

export const Checkout = () => {

  const navigate = useNavigate();

  const {
    carrito,
    obtenerTotalPrecio,
    vaciarCarrito
  } = useCarrito();

  const { usuario } = useAuth();
  const [formData, setFormData] = useState({
    nombre: usuario?.nombre || '',
    apellido: usuario?.apellido || '',
    email: usuario?.correo || usuario?.email || '',
    direccion: usuario?.direccion || '',
    comuna: usuario?.comuna || 'Santiago',
    region: usuario?.region || 'Región Metropolitana',
    metodoPago: 'simulado',
  });

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const obtenerTipoArticulo = (item) => {
    return item.tipo === 'plan'
      ? 'plan'
      : 'producto';
  };

  const obtenerClaveArticulo = (item) => {
    return item.claveCarrito ||
      `${obtenerTipoArticulo(item)}-${item.id}`;
  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((anterior) => ({
      ...anterior,
      [name]: value,
    }));

  };
  const handleProcesarPago = async (e) => {
    e.preventDefault();
    if (carrito.length === 0 || cargando) {
      return;
    }
    setCargando(true);
    setError(null);

    try {

      const itemsPedido = carrito.map((item) => ({
        id: item.id,
        cantidad: item.cantidad,
        tipo: obtenerTipoArticulo(item),
      }));

      const ordenData = {
        cliente: {
          ...formData,
          metodoPago: 'simulado',
        },
        items: itemsPedido,
        total: obtenerTotalPrecio(),
      };
      const respuestaBD = await crearPedidoAPI(ordenData);

      if (
        !respuestaBD ||
        respuestaBD.estado !== 'aprobado_simulado' ||
        !respuestaBD.id
      ) {
        throw new Error(
          'No se pudo confirmar el resultado de la compra.'
        );
      }

      const ordenConfirmada = {

        idOrden: respuestaBD.id,

        fecha: new Date().toLocaleDateString('es-CL'),

        cliente: {
          ...formData,
        },

        total: Number(respuestaBD.total),

        estado: respuestaBD.estado,

        medioPago: respuestaBD.medioPago,

      };

      vaciarCarrito();

      navigate('/pago-exitoso', {
        state: {
          orden: ordenConfirmada,
        },
        replace: true,
      });

    } catch (err) {

      console.error(
        'Error al procesar el pedido:',
        err
      );

      setError(
        err.message ||
        'No se pudo procesar la compra simulada.'
      );

    } finally {

      setCargando(false);

    }

  };

  if (carrito.length === 0) {

    return (
      <div className="fondo-hero min-vh-100 py-5 text-center text-light d-flex align-items-center justify-content-center">

        <div className="container pt-5">

          <h2 className="gold-title mb-3">
            Tu carrito está vacío
          </h2>

          <p className="text-muted">
            Agrega productos o planes desde la tienda
            antes de realizar el pago.
          </p>

        </div>

      </div>
    );

  }
  return (

    <main className="fondo-hero min-vh-100 py-5 text-light">

      <div className="container pt-5">

        <h2 className="gold-title fw-bold text-center mb-4">
          Finalizar Compra (Checkout)
        </h2>

        {error && (
          <div className="alert alert-danger mb-4" role="alert">
            {error}
          </div>
        )}

        <div className="row g-4">

          <div className="col-lg-7">

            <div className="rr text-light border-gold p-4 rounded-4 shadow-lg">

              <h4 className="gold-title mb-3">
                Datos de Despacho
              </h4>

              <form onSubmit={handleProcesarPago}>

                <div className="row g-3">

                  <div className="col-md-6 text-start">

                    <label className="form-label">
                      Nombre
                    </label>

                    <input
                      type="text"
                      name="nombre"
                      className="form-control bg-dark text-light border-secondary"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="col-md-6 text-start">

                    <label className="form-label">
                      Apellido
                    </label>

                    <input
                      type="text"
                      name="apellido"
                      className="form-control bg-dark text-light border-secondary"
                      value={formData.apellido}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="col-12 text-start">

                    <label className="form-label">
                      Correo Electrónico
                    </label>

                    <input
                      type="email"
                      name="email"
                      className="form-control bg-dark text-light border-secondary"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="col-12 text-start">

                    <label className="form-label">
                      Dirección
                    </label>

                    <input
                      type="text"
                      name="direccion"
                      className="form-control bg-dark text-light border-secondary"
                      value={formData.direccion}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="col-md-6 text-start">

                    <label className="form-label">
                      Comuna
                    </label>

                    <input
                      type="text"
                      name="comuna"
                      className="form-control bg-dark text-light border-secondary"
                      value={formData.comuna}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="col-md-6 text-start">

                    <label className="form-label">
                      Región
                    </label>

                    <input
                      type="text"
                      name="region"
                      className="form-control bg-dark text-light border-secondary"
                      value={formData.region}
                      onChange={handleChange}
                      required
                    />

                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-warning w-100 fw-bold py-2 mt-4 text-dark"
                  disabled={cargando}
                >
                  {cargando
                    ? 'Procesando Pago...'
                    : 'Confirmar y Pagar'
                  }
                </button>
              </form>
            </div>
          </div>

          <div className="col-lg-5">

            <div className="rr text-light border-gold p-4 rounded-4 shadow-lg">

              <h4 className="gold-title mb-3">
                Resumen del Pedido
              </h4>

              <ul className="list-group list-group-flush mb-3">

                {carrito.map((item) => (

                  <li
                    key={obtenerClaveArticulo(item)}
                    className="list-group-item bg-transparent text-light d-flex justify-content-between align-items-center px-0 border-secondary"
                  >

                    <div>

                      <p className="mb-0 fw-bold">
                        {item.nombre || item.titulo}
                      </p>

                      <small className="text-muted">
                        Cantidad: {item.cantidad}
                      </small>

                      {item.tipo === 'plan' && (

                        <div>

                          <small className="text-warning">
                            Plan de servicio
                          </small>

                        </div>

                      )}

                    </div>

                    <span className="gold-title fw-bold">
                      ${(Number(item.precio) * item.cantidad).toLocaleString('es-CL')}
                    </span>

                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-between align-items-center fs-5 fw-bold border-top border-secondary pt-3">

                <span>
                  Total:
                </span>
                <span className="gold-title">
                  ${obtenerTotalPrecio().toLocaleString('es-CL')} CLP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
