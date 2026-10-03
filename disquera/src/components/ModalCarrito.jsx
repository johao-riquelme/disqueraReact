import { Modal, Button } from 'react-bootstrap';

export const ModalCarrito = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} contentClassName="rr text-light border-gold">
      <Modal.Header closeButton closeVariant="white" className="border-bottom border-secondary">
        <Modal.Title className="gold-title">Tu Carrito de Compras</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul id="lista-carrito" className="list-group list-group-flush mb-3"></ul>
        <div className="d-flex justify-content-between fw-bold fs-5">
          <span>Total:</span>
          <span className="gold-title">$<span id="total-carrito">0.00</span> USD</span>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-top border-secondary">
        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
        <Button variant="warning" className="fw-bold" id="btn-pagar">Proceder al Pago</Button>
      </Modal.Footer>
    </Modal>
  );
};