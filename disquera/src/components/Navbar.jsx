import { Link, useNavigate } from 'react-router-dom';

export const Navbar = ({ handleShowCart }) => {
  const navigate = useNavigate();
  
  // Obtenemos el usuario del localStorage
  const usuarioGuardado = JSON.parse(localStorage.getItem('user'));
  const isAdmin = usuarioGuardado && usuarioGuardado.role === 'admin';
  const isLogged = usuarioGuardado !== null;

  const handleCerrarSesion = () => {
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent py-3 fixed-top" style={{ backgroundColor: '#000 !important' }}>
      <div className="container-fluid px-4"> 
        <Link className="navbar-brand brand-title" to="/">THE REYES RECORDS</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/servicios">Servicios</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/albunes">Álbumes</Link></li>

            {/* CONDICIONAL: Solo si es Administrador ve este enlace */}
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link text-warning fw-bold" to="/admin">
                  <i className="bi bi-shield-lock-fill"></i> Administración
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3 ms-auto">
            {isLogged ? (
              <>
                <span className="text-light small">Hola, <b>{usuarioGuardado.email}</b></span>
                <button onClick={handleCerrarSesion} className="btn btn-outline-danger btn-sm">Cerrar Sesión</button>
              </>
            ) : (
              <>
                <Link className="nav-link text-warning fw-bold" to="/login"><i className="bi bi-person-circle"></i> Iniciar Sesión</Link>
                <Link className="nav-link text-light" to="/registro">Registrarse</Link>
              </>
            )}

            <button className="btn btn-outline-warning ms-2" onClick={handleShowCart}>
              🛒 Carrito (<span id="cart-count">0</span>)
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};