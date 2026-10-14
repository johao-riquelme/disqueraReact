import { useState, useEffect } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext.jsx';
import { obtenerProductosAPI } from '../services/api.js';

export const Productos = () => {

  const { agregarAlCarrito } = useCarrito();

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);


  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState('todos');

  const [showModal, setShowModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] =
    useState(null);

  useEffect(() => {

    let activo = true;

    const cargarProductos = async () => {

      try {

        const dataBD = await obtenerProductosAPI();

        if (activo) {
          setProductos(
            Array.isArray(dataBD) ? dataBD : []
          );
        }

      } catch (err) {

        console.error(
          'Error al cargar productos desde Neon:',
          err
        );

        if (activo) {
          setError(
            'No se pudo conectar con la base de datos de productos.'
          );
        }

      } finally {

        if (activo) {
          setCargando(false);
        }

      }

    };

    cargarProductos();

    return () => {
      activo = false;
    };

  }, []);


  const productosFiltrados = productos.filter((producto) => {

    if (categoriaSeleccionada === 'todos') {
      return true;
    }

    return producto.categoria === categoriaSeleccionada;

  });


  const handleAbrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setShowModal(true);
  };

  const handleCerrarModal = () => {
    setShowModal(false);
  };

  const formatearPrecio = (precio) =>
    new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(precio);


  if (cargando) {

    return (
      <div className="fondo-hero d-flex justify-content-center align-items-center vh-100">

        <Spinner animation="border" variant="warning" />

        <span className="ms-3 gold-title fs-4">
          Cargando productos...
        </span>

      </div>
    );

  }

  if (error) {

    return (
      <div className="fondo-hero min-vh-100 py-5 text-center text-light d-flex align-items-center">

        <div className="container">

          <h3 className="text-danger fw-bold">
            {error}
          </h3>

          <p className="text-muted">
            Asegúrate de que Spring Boot y Neon estén disponibles.
          </p>

        </div>

      </div>
    );

  }

  return (

    <main className="fondo-hero d-flex flex-column align-items-center text-center pt-5 min-vh-100">

      <div className="container text-center py-5">

        <h1 className="gold-title display-4 fw-bold mb-2">
          CATÁLOGO DE PRODUCTOS
        </h1>

        <p className="subtitle text-uppercase tracking-wider mb-5">
          SISTEMA INTEGRADO CON BASE DE DATOS
        </p>

        <hr className="divider mx-auto my-4" />

        <div className="d-flex justify-content-center flex-wrap gap-3 mb-5">

          <button
            type="button"
            className={`btn ${
              categoriaSeleccionada === 'todos'
                ? 'btn-warning'
                : 'btn-outline-warning'
            } fw-bold px-4`}
            onClick={() => setCategoriaSeleccionada('todos')}
            aria-pressed={categoriaSeleccionada === 'todos'}
          >
            Todos
          </button>

          <button
            type="button"
            className={`btn ${
              categoriaSeleccionada === 'microfono'
                ? 'btn-warning'
                : 'btn-outline-warning'
            } fw-bold px-4`}
            onClick={() => setCategoriaSeleccionada('microfono')}
            aria-pressed={categoriaSeleccionada === 'microfono'}
          >
            Micrófonos
          </button>

          <button
            type="button"
            className={`btn ${
              categoriaSeleccionada === 'interfaz'
                ? 'btn-warning'
                : 'btn-outline-warning'
            } fw-bold px-4`}
            onClick={() => setCategoriaSeleccionada('interfaz')}
            aria-pressed={categoriaSeleccionada === 'interfaz'}
          >
            Interfaces
          </button>

        </div>

        {productosFiltrados.length === 0 && (

          <div className="text-center text-light py-5">

            <h3 className="gold-title">
              No hay productos disponibles
            </h3>

            <p className="text-light">
              No encontramos productos en esta categoría.
            </p>

          </div>

        )}

        <div className="row justify-content-center g-4 px-lg-4 mb-5">

          {productosFiltrados.map((item) => (

            <div key={item.id} className="col-12 col-lg-6">

              <div className="card rr text-light border-gold p-3 shadow-lg h-100 d-flex flex-column flex-sm-row align-items-center gap-3">

                <button
                  type="button"
                  className="rounded-4 d-flex align-items-center justify-content-center p-2 flex-shrink-0 shadow-sm border-0"
                  style={{
                    width: '220px',
                    maxWidth: '100%',
                    height: '150px',
                    backgroundColor: '#ffffff',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleAbrirModal(item)}
                  title="Ver vista rápida"
                >

                  <img
                    src={item.imagen}
                    alt={item.nombre || item.titulo}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />

                </button>

                <div
                  className="text-start flex-grow-1 align-self-stretch"
                  style={{ minWidth: 0 }}
                >

                  <h2 className="gold-title fw-bold fs-5 mb-2">
                    {item.nombre || item.titulo}
                  </h2>

                  <p className="text-light mb-3">
                    Valor {formatearPrecio(item.precio)}
                  </p>

                  <Link
                    to={`/productos/${item.id}`}
                    className="btn btn-outline-warning fw-bold w-100 mb-2"
                  >
                    <i className="bi bi-eye me-2"></i>
                    Ver detalle
                  </Link>

                  <button
                    type="button"
                    className="btn btn-warning fw-bold w-100 text-dark"
                    onClick={() => agregarAlCarrito(item)}
                  >
                    <i className="bi bi-cart-plus me-2"></i>
                    Agregar al carrito
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      <Modal
        show={showModal}
        onHide={handleCerrarModal}
        centered
        size="lg"
        contentClassName="rr text-light border-gold"
      >

        <Modal.Header
          closeButton
          closeVariant="white"
          className="border-bottom border-secondary"
        >

          <Modal.Title className="gold-title fw-bold">
            {productoSeleccionado?.nombre}
          </Modal.Title>

        </Modal.Header>

        <Modal.Body className="text-center p-4">

          {productoSeleccionado && (

            <>

              <div
                className="rounded-4 mb-3 shadow d-flex align-items-center justify-content-center p-3"
                style={{
                  height: '300px',
                  backgroundColor: '#ffffff'
                }}
              >

                <img
                  src={productoSeleccionado.imagen}
                  alt={productoSeleccionado.nombre}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />

              </div>

              <p
                className="card-text mt-3 fs-6 text-start"
                style={{ whiteSpace: 'pre-line' }}
              >
                {productoSeleccionado.descripcion}
              </p>

              <p className="gold-title fs-3 fw-bold my-3">
                {formatearPrecio(productoSeleccionado.precio)}
              </p>

            </>

          )}

        </Modal.Body>

        <Modal.Footer className="border-top border-secondary">

          <Button
            variant="secondary"
            onClick={handleCerrarModal}
          >
            Cerrar
          </Button>

          <Button
            variant="warning"
            className="fw-bold text-dark"
            disabled={!productoSeleccionado}
            onClick={() => {

              if (!productoSeleccionado) {
                return;
              }

              agregarAlCarrito(productoSeleccionado);

              handleCerrarModal();

            }}
          >
            <i className="bi bi-cart-plus me-2"></i>
            Agregar al carrito
          </Button>

        </Modal.Footer>

      </Modal>

    </main>

  );
};
