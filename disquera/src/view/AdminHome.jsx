import { Link } from 'react-router-dom';

export const AdminHome = () => {
  return (
    <div className="container-fluid bg-dark text-light min-vh-100">
      <div className="row">
        {/* SIDEBAR DE ADMINISTRACIÓN */}
        <nav className="col-md-3 col-lg-2 d-md-block bg-black sidebar collapse border-end border-secondary min-vh-100 p-3">
          <div className="position-sticky pt-3">
            <h4 className="gold-title fw-bold text-center py-3">THE REYES</h4>
            <ul className="nav flex-column gap-2">
              <li className="nav-item">
                <Link className="nav-link text-warning fw-bold" to="/admin">
                  <i className="bi bi-speedometer2 me-2"></i> Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/admin/productos">
                  <i className="bi bi-box-seam me-2"></i> Productos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/admin/usuarios">
                  <i className="bi bi-people me-2"></i> Usuarios
                </Link>
              </li>
              <hr className="border-secondary" />
              <li className="nav-item">
                <Link className="nav-link text-danger" to="/">
                  <i className="bi bi-box-arrow-left me-2"></i> Salir al Sitio
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* CONTENIDO PRINCIPAL */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-5 d-flex align-items-center justify-content-center min-vh-100">
          <div className="text-center">
            <h1 className="display-4 gold-title fw-bold">¡HOLA Administrador!</h1>
            <p className="text-muted gold-title mt-2">Bienvenido al panel de control de The Reyes Records.</p>
          </div>
        </main>
      </div>
    </div>
  );
};