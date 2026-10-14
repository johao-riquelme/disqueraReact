
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext.jsx';
import { obtenerProductoPorIdAPI } from '../services/api.js';

export const DetalleProducto = () => {
  const { id } = useParams();
  const { agregarAlCarrito } = useCarrito();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let activo = true;

    const cargarProducto = async () => {
      setCargando(true);
      setError('');
      setProducto(null);

      try {
        const datos = await obtenerProductoPorIdAPI(id);

        if (activo) {
          setProducto(datos);
        }
      } catch (err) {
        console.error('Error al cargar el producto:', err);

        if (activo) {
          setError(
            'El producto no existe o no está disponible.'
          );
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };
    cargarProducto();
    return () => {
      activo = false;
    };
  }, [id]);
  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(precio);
  };

  if (cargando) {
    return (
      <main className="fondo-hero min-vh-100 py-5">
        <div className="container pt-5 mt-4 text-center">
          <h1 className="gold-title fw-bold">
            Cargando producto...
          </h1>
        </div>
      </main>
    );
  }

  if (error || !producto) {
    return (
      <main className="fondo-hero min-vh-100 py-5">
        <div className="container pt-5 mt-4 text-center">
          <h1 className="gold-title fw-bold">
            Producto no encontrado
          </h1>

          <p className="text-light">
            {error ||
              'El producto que buscas no está disponible en el catálogo.'}
          </p>

          <Link
            to="/productos"
            className="btn btn-warning fw-bold"
          >
            Volver a productos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="fondo-hero min-vh-100 py-5">
      <div className="container pt-5 mt-4">

        <nav
          aria-label="Ruta de navegación"
          className="mb-4"
        >
          <ol className="breadcrumb">

            <li className="breadcrumb-item">
              <Link to="/" className="text-warning">
                Inicio
              </Link>
            </li>

            <li className="breadcrumb-item">
              <Link to="/productos" className="text-warning">
                Productos
              </Link>
            </li>

            <li
              className="breadcrumb-item active text-light"
              aria-current="page"
            >
              {producto.nombre}
            </li>

          </ol>
        </nav>

        <div className="rr rounded-4 border-gold p-3 p-md-5 shadow-lg">
          <div className="row g-4 align-items-center">

            <div className="col-12 col-md-6">
              <div
                className="bg-white rounded-4 p-4 d-flex align-items-center justify-content-center"
                style={{ minHeight: '300px' }}
              >
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="img-fluid"
                  style={{
                    maxHeight: '380px',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </div>

            <div className="col-12 col-md-6 text-light">

              <span className="badge bg-warning text-dark mb-3">
                {producto.categoria === 'microfono'
                  ? 'Micrófonos'
                  : producto.categoria === 'interfaz'
                  ? 'Interfaces de audio'
                  : producto.categoria}
              </span>

              <h1 className="gold-title fw-bold mb-3">
                {producto.nombre}
              </h1>

              <p className="fs-5 mb-4">
                {producto.descripcion}
              </p>

              <p className="gold-title fs-2 fw-bold mb-4">
                {formatearPrecio(producto.precio)}
              </p>
              <div className="d-flex flex-column gap-3">

                <button
                  type="button"
                  className="btn btn-warning fw-bold py-3 text-dark"
                  onClick={() => agregarAlCarrito(producto)}
                  disabled={producto.stock <= 0}
                >
                  <i className="bi bi-cart-plus me-2"></i>
                  {producto.stock > 0
                    ? 'Agregar al carrito'
                    : 'Sin stock'}
                </button>

                <Link
                  to="/productos"
                  className="btn btn-outline-light"
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Volver al catálogo
                </Link>

              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};
