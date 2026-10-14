import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

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
import { DetalleBlog } from './view/DetalleBlog';
import { Blog } from './view/Blog';

// Vistas del flujo de compras
import { Checkout } from './view/Checkout';
import { PagoExitoso } from './view/PagoExitoso';

// NUEVA VISTA: HISTORIAL DE COMPRAS
import { MisCompras } from './view/MisCompras';

// Vistas administrativas
import { AdminHome } from './view/AdminHome';
import { AdminUsuarios } from './view/AdminUsuarios';
import { AdminProductos } from './view/AdminProductos';
import { AdminNuevoProducto } from './view/AdminNuevoProducto';
import { AdminEditarProducto } from './view/AdminEditarProducto';

function AppContent() {

  const [showCart, setShowCart] = useState(false);
  const location = useLocation();

  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);

  // Detectar las rutas administrativas
  const esAdmin = location.pathname.startsWith('/admin');

  return (
    <>

      {/* NAVBAR */}
      {!esAdmin && (
        <Navbar handleShowCart={handleShowCart} />
      )}

      <Routes>

        {/* VISTAS PUBLICAS */}
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

        {/* BLOG */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<DetalleBlog />} />

        {/* FLUJO DE COMPRA */}
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/pago-exitoso"
          element={<PagoExitoso />}
        />

        {/* HISTORIAL DE COMPRAS */}
        <Route
          path="/mis-compras"
          element={<MisCompras />}
        />

        {/* VISTAS ADMINISTRATIVAS */}
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
        <Route
          path="/admin/productos/editar/:id"
          element={<AdminEditarProducto />}
/>
      </Routes>
      {/* FOOTER */}
      {!esAdmin && <Footer />}
      {/* CARRITO */}
      {!esAdmin && (
        <ModalCarrito
          show={showCart}
          handleClose={handleCloseCart}
        />
      )}
    </>
  );
}
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
export default App;
