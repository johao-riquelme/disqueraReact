import { useState, useEffect } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

export const Productos = () => {
  const [microfonos, setMicrofonos] = useState([]);
  const [interfaces, setInterfaces] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    const obtenerProductosDeBD = async () => {
      try {
        const dataFalsaBD = {
          microfonos: [
             { id: 1, nombre: "Neumann U 87 Ai", precio: 3750, imagen: "/micro/micro1.jpg", descripcion: "El rey indiscutible de los estudios comerciales para voces principales, locución y orquestas.\n\nCaracterísticas: Tres patrones polares (cardioide, omni, figura 8), atenuador de -10 dB, rango de 20Hz-20kHz y fabricación artesanal en Alemania." },
             { id: 2, nombre: "AKG C414 XLII", precio: 1299, imagen: "/micro/micro2.jpg", descripcion: "El micrófono multipatrón más versátil del mercado, ideal para pianos, guitarras acústicas, coros y overheads de batería." },
             { id: 3, nombre: "Telefunken TF51", precio: 1895, imagen: "/micro/micro3.jpg", descripcion: "Voces principales de alta gama, guitarras acústicas, mandolinas y overheads de batería." },
             { id: 4, nombre: "Manley Reference Cardioid", precio: 2999, imagen: "/micro/micro4.jpg", descripcion: "El estándar moderno para voces principales en Pop, R&B, Rap y música urbana comercial." }
          ],
          interfaces: [
             { id: 5, nombre: "Apollo Twin X Gen 2", precio: 2899, imagen: "/intefaces/interfaz1.jpg", descripcion: "El centro de control moderno de la mayoría de los estudios profesionales y comerciales." },
             { id: 6, nombre: "Apogee Symphony Desktop", precio: 1499, imagen: "/intefaces/interfaz2.jpg", descripcion: "Calidad de conversión legendaria de rack en un formato de escritorio." }
          ]
        };

        setMicrofonos(dataFalsaBD.microfonos);
        setInterfaces(dataFalsaBD.interfaces);
        setCargando(false);
      } catch (error) {
        console.error("Error conectando a la base de datos:", error);
        setCargando(false);
      }
    };

    obtenerProductosDeBD();
  }, []);

  const handleAbrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setShowModal(true);
  };

  const handleCerrarModal = () => setShowModal(false);

  if (cargando) {
    return (
      <div className="fondo-hero d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="warning" />
        <span className="ms-3 gold-title fs-4">Cargando catálogo...</span>
      </div>
    );
  }

  const renderTarjetaProducto = (item) => (
    <div key={item.id} className="col-12 col-lg-6">
      <div className="card rr text-light border-gold p-3 shadow-lg h-100 d-flex flex-row align-items-center">
        
        {/* Contenedor blanco con ancho y alto fijos expandidos */}
        <div 
          style={{ width: '220px', height: '150px', backgroundColor: '#ffffff', cursor: 'pointer' }} 
          className="rounded-4 d-flex align-items-center justify-content-center p-2 flex-shrink-0 shadow-sm"
          onClick={() => handleAbrirModal(item)}
          title="Haz clic para ver detalles"
        >
          <img 
            src={item.imagen} 
            alt={item.nombre} 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
          />
        </div>

        {/* Información y botón Agregar al Carrito */}
        <div className="ms-3 text-start flex-grow-1">
          <h5 className="gold-title fw-bold fs-5 mb-2">{item.nombre}</h5>
          <p className="text-light mb-3">Valor ${item.precio.toLocaleString()} USD</p>
          <button 
            className="btn btn-warning fw-bold w-100 text-dark"
            onClick={() => alert(`Añadido al carrito: ${item.nombre}`)}
          >
            Agregar al Carrito
          </button>
        </div>

      </div>
    </div>
  );

  return (
    <div className="fondo-hero d-flex flex-column align-items-center justify-content-center text-center pt-5">
      <div className="container text-center py-5">
        
        <h1 className="gold-title display-4 fw-bold mb-2">PRODUCTOS</h1>
        <p className="subtitle text-uppercase tracking-wider mb-5">ENCUENTRA TODO LO QUE BUSQUES PARA TU HOME STUDIO</p>
        <hr className="divider mx-auto my-4" />
        
        {/* SECCIÓN MICRÓFONOS */}
        <h3 className="gold-title fw-bold mb-4 fs-3">MICRÓFONOS</h3>
        <div className="row justify-content-center g-4 px-lg-4 mb-5">
          {microfonos.map(renderTarjetaProducto)}
        </div>

        <hr className="divider mx-auto my-5" />
        
        {/* SECCIÓN INTERFACES */}
        <h3 className="gold-title fw-bold mb-4 fs-3">INTERFAZ DE AUDIO</h3>
        <div className="row justify-content-center g-4 px-lg-4 mb-5">
          {interfaces.map(renderTarjetaProducto)}
        </div>

      </div>

      {/* MODAL DE DETALLE DEL PRODUCTO */}
      <Modal show={showModal} onHide={handleCerrarModal} centered size="lg" contentClassName="rr text-light border-gold">
        <Modal.Header closeButton closeVariant="white" className="border-bottom border-secondary">
          <Modal.Title className="gold-title fw-bold">
            {productoSeleccionado?.nombre}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center p-4">
          {productoSeleccionado && (
            <>
              <div style={{ height: '300px', backgroundColor: '#ffffff' }} className="rounded-4 mb-3 shadow d-flex align-items-center justify-content-center p-3">
                <img 
                  src={productoSeleccionado.imagen} 
                  alt={productoSeleccionado.nombre} 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <p className="card-text mt-3 fs-6 text-start" style={{ whiteSpace: 'pre-line' }}>
                {productoSeleccionado.descripcion}
              </p>
              <h3 className="gold-title my-3">${productoSeleccionado.precio.toLocaleString()} USD</h3>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="border-top border-secondary">
          <Button variant="secondary" onClick={handleCerrarModal}>Cerrar</Button>
          <Button variant="warning" className="fw-bold text-dark" onClick={() => {
            alert(`Añadido al carrito: ${productoSeleccionado?.nombre}`);
            handleCerrarModal();
          }}>
            Agregar al Carrito
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};