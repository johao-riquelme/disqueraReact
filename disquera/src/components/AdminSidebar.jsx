import { Link, useLocation } from 'react-router-dom';

export const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="col-md-3 col-lg-2 d-md-block bg-black sidebar border-end border-secondary min-vh-100 p-3 shadow">
      <div className="position-sticky pt-3">
        <div className="text-center py-3 border-bottom border-dark mb-3">
          <h4 className="gold-title fw-bold m-0 tracking-wide">THE REYES</h4>
          <small className="text-muted fs-7">PANEL ADMIN</small>
        </div>
        <ul className="nav flex-column gap-2">
          <li className="nav-item">
            <Link 
              className={`nav-link rounded-3 px-3 py-2 transition-all ${isActive('/admin') ? 'bg-warning text-dark fw-bold' : 'text-light bg-hover-dark'}`} 
              to="/admin"
            >
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              className={`nav-link rounded-3 px-3 py-2 transition-all ${isActive('/admin/productos') || isActive('/admin/productos/nuevo') ? 'bg-warning text-dark fw-bold' : 'text-light bg-hover-dark'}`} 
              to="/admin/productos"
            >
              <i className="bi bi-box-seam me-2"></i> Productos
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              className={`nav-link rounded-3 px-3 py-2 transition-all ${isActive('/admin/usuarios') ? 'bg-warning text-dark fw-bold' : 'text-light bg-hover-dark'}`} 
              to="/admin/usuarios"
            >
              <i className="bi bi-people me-2"></i> Usuarios
            </Link>
          </li>
          <hr className="border-secondary my-3" />
          <li className="nav-item">
            <Link className="nav-link text-danger rounded-3 px-3 py-2" to="/">
              <i className="bi bi-box-arrow-left me-2"></i> Salir al Sitio
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};