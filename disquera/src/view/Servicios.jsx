import { useState, useEffect } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

export const Servicios = () => {
  const [planes, setPlanes] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    const obtenerPlanesDeBD = async () => {
      try {
        const dataFalsaBD = [
          { 
            id: 1, 
            nombre: "PLAN BÁSICO", 
            precio: 50, 
            imagen: "/planes/planB.png", 
            descripcion: "Ideal para artistas emergentes. Incluye 4 horas semanales de grabación en estudio profesional y asesoría legal básica para proteger tus temas." 
          },
          { 
            id: 2, 
            nombre: "PLAN PREMIUM", 
            precio: 70, 
            imagen: "/planes/planD.png", 
            descripcion: "Perfecto para potenciar tu talento. Incluye 4 horas de grabación con asistencia técnica de un productor y un taller guiado sobre la industria musical." 
          },
          { 
            id: 3, 
            nombre: "PLAN GOLD", 
            precio: 85, 
            imagen: "/planes/planG.png", 
            descripcion: "Para artistas comprometidos. Producción de alto nivel, mezcla avanzada y distribución digital oficial." 
          },
          { 
            id: 4, 
            nombre: "PLAN DELUXE", 
            precio: 180, 
            imagen: "/planes/planP.png", 
            descripcion: "Edición exclusiva Platinum. Grabación ilimitada, asesoría de imagen y derechos de autor garantizados." 
          }
        ];

        setPlanes(dataFalsaBD);
        setCargando(false);
      } catch (error) {
        console.error("Error conectando a la base de datos:", error);
        setCargando(false);
      }
    };

    obtenerPlanesDeBD();
  }, []);

  const handleAbrirModal = (plan) => {
    setProductoSeleccionado(plan);
    setShowModal(true);
  };

  const handleCerrarModal = () => setShowModal(false);

  if (cargando) {
    return (
      <div className="fondo-hero d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="warning" />
        <span className="ms-3 gold-title fs-4">Cargando planes...</span>
      </div>
    );
  }

  return (
    <div className="fondo-hero d-flex flex-column align-items-center justify-content-center text-center pt-5">
      <div className="container text-center py-5">
        
        {/* TÍTULO PRINCIPAL */}
        <h1 className="gold-title display-4 fw-bold mb-2">PLANES</h1>
        <p className="subtitle text-uppercase tracking-wider mb-5">SERVICIOS DE DISQUERA Y PRODUCCIÓN</p>
        <hr className="divider mx-auto my-4" />

        {/* GRILLA DE PLANES */}
        <div className="row justify-content-center g-4 mb-5">
          {planes.map((plan) => (
            <div key={plan.id} className="col-12 col-md-6 col-lg-3">
              <div className="card rr text-light border-gold p-3 shadow-lg h-100 d-flex flex-column align-items-center">
                
                {/* Imagen interactiva del vinilo */}
                <div 
                  style={{ width: '100%', height: '200px', cursor: 'pointer' }} 
                  className="rounded-4 d-flex align-items-center justify-content-center p-2 mb-3"
                  onClick={() => handleAbrirModal(plan)}
                  title="Haz clic para ver detalles"
                >
                  <img 
                    src={plan.imagen} 
                    alt={plan.nombre} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                  />
                </div>

                {/* Título, Precio y Botón */}
                <h5 className="gold-title fw-bold fs-5 mb-2">{plan.nombre}</h5>
                <p className="text-light mb-3">Valor ${plan.precio} USD</p>
                <button 
                  className="btn btn-warning fw-bold w-100 text-dark mt-auto"
                  onClick={() => alert(`Añadido al carrito: ${plan.nombre}`)}
                >
                  Agregar al Carrito
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* MODAL DE DETALLE DEL PLAN */}
      <Modal show={showModal} onHide={handleCerrarModal} centered size="md" contentClassName="rr text-light border-gold">
        <Modal.Header closeButton closeVariant="white" className="border-bottom border-secondary">
          <Modal.Title className="gold-title fw-bold fs-5">
            {productoSeleccionado?.nombre}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center p-4">
          {productoSeleccionado && (
            <>
              <div style={{ height: '220px', width: '100%' }} className="rounded-4 mb-3 d-flex align-items-center justify-content-center p-2">
                <img 
                  src={productoSeleccionado.imagen} 
                  alt={productoSeleccionado.nombre} 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <p className="card-text mt-3 fs-6 text-center px-2" style={{ whiteSpace: 'pre-line' }}>
                {productoSeleccionado.descripcion}
              </p>
              <h3 className="gold-title my-3">${productoSeleccionado.precio} USD</h3>
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