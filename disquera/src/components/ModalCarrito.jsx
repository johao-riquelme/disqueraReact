import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext.jsx';

export const ModalCarrito = ({ show, handleClose }) => {
  const navigate = useNavigate();
  const { 
    carrito, 
    eliminarDelCarrito, 
    actualizarCantidad, 
    vaciarCarrito, 
    obtenerTotalPrecio 
  } = useCarrito();

  const handleIrAlPago = () => {
    handleClose();
    navigate('/checkout');
  };

  return (
    <Modal show={show} onHide={handleClose} contentClassName="rr text-light border-gold" centered size="lg">
      <Modal.Header closeButton closeVariant="white" className="border-bottom border-secondary">
        <Modal.Title className="gold-title">🛒 Tu Carrito de Compras</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {carrito.length === 0 ? (
          <div className="text-center py-4">
            <p className="fs-5 mb-0">El carrito está vacío</p>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <Table variant="dark" hover className="align-middle mb-3">
                <thead>
                  <tr className="gold-title">
                    <th>Álbum</th>
                    <th>Precio</th>
                    <th className="text-center">Cantidad</th>
                    <th>Subtotal</th>
                    <th className="text-end">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          {item.imagen && (
                            <img 
                              src={item.imagen} 
                              alt={item.titulo || item.nombre} 
                              style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} 
                            />
                          )}
                          <span>{item.titulo || item.nombre}</span>
                        </div>
                      </td>
                      <td>${item.precio?.toLocaleString('es-CL')}</td>
                      <td>
                        <div className="d-flex align-items-center justify-content-center gap-1">
                          <Button 
                            size="sm" 
                            variant="outline-light" 
                            onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                          >
                            -
                          </Button>
                          <span className="px-2 fw-bold">{item.cantidad}</span>
                          <Button 
                            size="sm" 
                            variant="outline-light" 
                            onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </td>
                      <td className="gold-title fw-bold">
                        ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                      </td>
                      <td className="text-end">
                        <Button 
                          size="sm" 
                          variant="outline-danger" 
                          onClick={() => eliminarDelCarrito(item.id)}
                          title="Eliminar producto"
                        >
                          🗑️
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <div className="d-flex justify-content-between align-items-center fw-bold fs-5 mt-3 pt-2 border-top border-secondary">
              <span>Total:</span>
              <span className="gold-title">
                ${obtenerTotalPrecio().toLocaleString('es-CL')} CLP
              </span>
            </div>
          </>
        )}
      </Modal.Body>

      <Modal.Footer className="border-top border-secondary justify-content-between">
        <div>
          {carrito.length > 0 && (
            <Button variant="outline-secondary" size="sm" onClick={vaciarCarrito}>
              Vaciar Carrito
            </Button>
          )}
        </div>
        <div className="d-flex gap-2">
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          {carrito.length > 0 && (
            <Button variant="warning" className="fw-bold" onClick={handleIrAlPago}>
              Proceder al Pago
            </Button>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
};