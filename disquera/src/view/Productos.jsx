import { useState, useEffect } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Productos = () => {
  const [microfonos, setMicrofonos] = useState([]);
  const [interfaces, setInterfaces] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    // Datos temporales. Después conectaremos el catálogo al backend.
    const dataFalsaBD = {
      microfonos: [
        {
          id: 1,
          nombre: 'Neumann U 87 Ai',
          precio: 3750,
          imagen: '/micro/micro1.jpg',
          descripcion:
            'El rey indiscutible de los estudios comerciales para voces principales, locución y orquestas.\n\nCaracterísticas: Tres patrones polares (cardioide, omni, figura 8), atenuador de -10 dB, rango de 20Hz-20kHz y fabricación artesanal en Alemania.',
        },
        {
          id: 2,
          nombre: 'AKG C414 XLII',
          precio: 1299,
          imagen: '/micro/micro2.jpg',
          descripcion:
            'El micrófono multipatrón más versátil del mercado, ideal para pianos, guitarras acústicas, coros y overheads de batería.',
        },
        {
          id: 3,
          nombre: 'Telefunken TF51',
          precio: 1895,
          imagen: '/micro/micro3.jpg',
          descripcion:
            'Voces principales de alta gama, guitarras acústicas, mandolinas y overheads de batería.',
        },
        {
          id: 4,
          nombre: 'Manley Reference Cardioid',
          precio: 2999,
          imagen: '/micro/micro4.jpg',
          descripcion:
            'El estándar moderno para voces principales en Pop, R&B, Rap y música urbana comercial.',
        },
      ],
      interfaces: [
        {
          id: 5,
          nombre: 'Apollo Twin X Gen 2',
          precio: 2899,
          imagen: '/interfaces/interfaz1.jpg',
          descripcion:
            'El centro de control moderno de la mayoría de los estudios profesionales y comerciales.',
        },
        {
          id: 6,
          nombre: 'Apogee Symphony Desktop',
          precio: 1499,
          imagen: '/interfaces/interfaz2.jpg',
          descripcion:
            'Calidad de conversión legendaria de rack en un formato de escritorio.',
        },
      ],
    };

    setMicrofonos(dataFalsaBD.microfonos);
    setInterfaces(dataFalsaBD.interfaces);
    setCargando(false);
  }, []);

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
      currency: 'USD',
      currencyDisplay: 'code',
    }).format(precio);

  if (cargando) {
    return (
      <div
        className="fondo-hero d-flex justify-content-center
                   align-items-center vh-100"
        role="status"
      >
        <Spinner animation="border" variant="warning" />
        <span className="ms-3 gold-title fs-4">
          Cargando catálogo...
        </span>
      </div>
    );
  }

  const renderTarjetaProducto = (item) => (
    <div key={item.id} className="col-12 col-lg-6">
      <div
        className="card rr text-light border-gold p-3 shadow-lg
                   h-100 d-flex flex-column flex-sm-row
                   align-items-center gap-3"
      >
        {/* Imagen: abre la vista rápida */}
        <button
          type="button"
          className="rounded-4 d-flex align-items-center
                     justify-content-center p-2 flex-shrink-0
                     shadow-sm border-0"
          style={{
            width: '220px',
            maxWidth: '100%',
            height: '150px',
            backgroundColor: '#ffffff',
            cursor: 'pointer',
          }}
          onClick={() => handleAbrirModal(item)}
          aria-label={`Ver vista rápida de ${item.nombre}`}
          title="Ver vista rápida"
        >
          <img
            src={item.imagen}
            alt={item.nombre}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </button>

        {/* Información y acciones */}
        <div
          className="text-start flex-grow-1 align-self-stretch"
          style={{ minWidth: 0 }}
        >
          <h2 className="gold-title fw-bold fs-5 mb-2">
            {item.nombre}
          </h2>

          <p className="text-light mb-3">
            Valor {formatearPrecio(item.precio)}
          </p>

          <Link
            to={`/productos/${item.id}`}
            className="btn btn-outline-warning fw-bold w-100 mb-2"
          >
            <i className="bi bi-eye me-2" aria-hidden="true"></i>
            Ver detalle
          </Link>

          <button
            type="button"
            className="btn btn-warning fw-bold w-100 text-dark"
            disabled
            aria-describedby={`aviso-carrito-${item.id}`}
          >
            <i className="bi bi-cart-plus me-2" aria-hidden="true"></i>
            Agregar al carrito
          </button>

          <small
            id={`aviso-carrito-${item.id}`}
            className="d-block text-light mt-2"
          >
            La compra estará disponible próximamente.
          </small>
        </div>
      </div>
    </div>
  );

  return (
    <main
      className="fondo-hero d-flex flex-column align-items-center
                 justify-content-center text-center pt-5"
    >
      <div className="container text-center py-5">
        <h1 className="gold-title display-4 fw-bold mb-2">
          PRODUCTOS
        </h1>

        <p className="subtitle text-uppercase tracking-wider mb-5">
          ENCUENTRA TODO LO QUE BUSQUES PARA TU HOME STUDIO
        </p>

        <hr className="divider mx-auto my-4" />

        {/* Micrófonos */}
        <section aria-labelledby="titulo-microfonos">
          <h2
            id="titulo-microfonos"
            className="gold-title fw-bold mb-4 fs-3"
          >
            MICRÓFONOS
          </h2>

          <div className="row justify-content-center g-4 px-lg-4 mb-5">
            {microfonos.map(renderTarjetaProducto)}
          </div>
        </section>

        <hr className="divider mx-auto my-5" />

        {/* Interfaces */}
        <section aria-labelledby="titulo-interfaces">
          <h2
            id="titulo-interfaces"
            className="gold-title fw-bold mb-4 fs-3"
          >
            INTERFACES DE AUDIO
          </h2>

          <div className="row justify-content-center g-4 px-lg-4 mb-5">
            {interfaces.map(renderTarjetaProducto)}
          </div>
        </section>
      </div>

      {/* Modal de vista rápida */}
      <Modal
        show={showModal}
        onHide={handleCerrarModal}
        centered
        size="lg"
        contentClassName="rr text-light border-gold"
        aria-labelledby="titulo-vista-rapida"
      >
        <Modal.Header
          closeButton
          closeVariant="white"
          className="border-bottom border-secondary"
        >
          <Modal.Title
            id="titulo-vista-rapida"
            className="gold-title fw-bold"
          >
            {productoSeleccionado?.nombre}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center p-4">
          {productoSeleccionado && (
            <>
              <div
                className="rounded-4 mb-3 shadow d-flex
                           align-items-center justify-content-center p-3"
                style={{
                  height: '300px',
                  backgroundColor: '#ffffff',
                }}
              >
                <img
                  src={productoSeleccionado.imagen}
                  alt={productoSeleccionado.nombre}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
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

              <small id="aviso-carrito-modal" className="text-light">
                La compra estará disponible próximamente.
              </small>
            </>
          )}
        </Modal.Body>

        <Modal.Footer className="border-top border-secondary">
          <Button variant="secondary" onClick={handleCerrarModal}>
            Cerrar
          </Button>

          {productoSeleccionado && (
            <Link
              to={`/productos/${productoSeleccionado.id}`}
              className="btn btn-outline-warning fw-bold"
              onClick={handleCerrarModal}
            >
              Ver detalle completo
            </Link>
          )}

          <Button
            variant="warning"
            className="fw-bold text-dark"
            disabled
            aria-describedby="aviso-carrito-modal"
          >
            Agregar al carrito
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};