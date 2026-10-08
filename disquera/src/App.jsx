import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ModalCarrito } from './components/ModalCarrito';

import { Home } from './view/Home';
import { Login } from './view/Login';
import { Productos } from './view/Productos';
import { DetalleProducto } from './view/DetalleProducto';
import { Registro } from './view/Registros';
import { Servicios } from './view/Servicios';
import { Contacto } from './view/Contacto';
import { Albunes } from './view/Albunes';
import { Nosotros } from './view/Nosotros';

import { AdminHome } from './view/AdminHome';
import { AdminUsuarios } from './view/AdminUsuarios';
import { AdminProductos } from './view/AdminProductos';
import { AdminNuevoProducto } from './view/AdminNuevoProducto';

function App() {
  const [showCart, setShowCart] = useState(false);

  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);

  return (
    <Router>
      <Navbar handleShowCart={handleShowCart} />

      <Routes>
        {/* Vistas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/productos" element={<Productos />} />
        <Route
          path="/productos/:id"
          element={<DetalleProducto />}
        />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/albunes" element={<Albunes />} />
        <Route path="/nosotros" element={<Nosotros />} />

        {/* Vistas administrativas */}
        <Route path="/admin" element={<AdminHome />} />
        <Route
          path="/admin/usuarios"
          element={<AdminUsuarios />}
        />
        <Route
          path="/admin/productos"
          element={<AdminProductos />}
        />
        <Route
          path="/admin/productos/nuevo"
          element={<AdminNuevoProducto />}
        />
      </Routes>

      <Footer />

      <ModalCarrito
        show={showCart}
        handleClose={handleCloseCart}
      />
    </Router>
  );
}

export default App;