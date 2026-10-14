import { Link, useLocation } from 'react-router-dom';

export const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="col-md-3 col-lg-2 d-md-block bg-black sidebar border-end border-secondary min-vh-100 p-3 shadow">
      <div className="position-sticky pt-3">
        {/* LOGO Y SUBTÍTULO EN BLANCO Y DORADO BRILANTE */}
        <div className="text-center py-3 border-bottom border-dark mb-3">
          <h4 className="gold-title fw-bold m-0 tracking-wide">THE REYES</h4>
          <small className="text-white fw-semibold fs-7 tracking-wider">PANEL ADMIN</small>
        </div>

        {/* MENÚ DE NAVEGACIÓN */}
        <ul className="nav flex-column gap-2">
          <li className="nav-item">
            <Link 
              className={`nav-link rounded-3 px-3 py-2 transition-all ${
                isActive('/admin') ? 'bg-warning text-dark fw-bold' : 'text-white bg-hover-dark'
              }`} 
              to="/admin"
            >
              <i className="bi bi-speedometer2 me-2 text-warning"></i> Dashboard
            </Link>
          </li>

          <li className="nav-item">
            <Link 
              className={`nav-link rounded-3 px-3 py-2 transition-all ${
                isActive('/admin/productos') || isActive('/admin/productos/nuevo') 
                  ? 'bg-warning text-dark fw-bold' 
                  : 'text-white bg-hover-dark'
              }`} 
              to="/admin/productos"
            >
              <i className="bi bi-box-seam me-2 text-warning"></i> Productos
            </Link>
          </li>

          <li className="nav-item">
            <Link 
              className={`nav-link rounded-3 px-3 py-2 transition-all ${
                isActive('/admin/usuarios') ? 'bg-warning text-dark fw-bold' : 'text-white bg-hover-dark'
              }`} 
              to="/admin/usuarios"
            >
              <i className="bi bi-people me-2 text-warning"></i> Usuarios
            </Link>
          </li>

          <hr className="border-secondary my-3" />

          {/* BOTÓN REGRESAR A LA VISTA PÚBLICA */}
          <li className="nav-item">
            <Link 
              className="btn btn-outline-warning w-100 fw-bold d-flex align-items-center justify-content-center gap-2 py-2 rounded-3 shadow-sm" 
              to="/"
            >
              <i className="bi bi-shop fs-5"></i>
              <span>Ir a Vista Usuario</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};