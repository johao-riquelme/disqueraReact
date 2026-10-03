import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

export const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Simulación de carga de usuarios desde la Base de Datos
    const obtenerUsuariosFalsos = () => {
      const dataUsuarios = [
        { id: 1, nombre: "Johao Riquelme", email: "admin@thereyesrecords.cl", rol: "Administrador" },
        { id: 2, nombre: "Carlos Torres", email: "carlos@ejemplo.cl", rol: "Cliente" },
        { id: 3, nombre: "Sofía Valenzuela", email: "sofia@ejemplo.cl", rol: "Cliente" }
      ];
      setUsuarios(dataUsuarios);
    };

    obtenerUsuariosFalsos();
  }, []);

  const handleEliminarUsuario = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      setUsuarios(usuarios.filter(u => u.id !== id));
    }
  };

  return (
    <div className="container-fluid bg-dark text-light min-vh-100">
      <div className="row">
        {/* SIDEBAR DE ADMINISTRACIÓN */}
        <nav className="col-md-3 col-lg-2 d-md-block bg-black sidebar collapse border-end border-secondary min-vh-100 p-3">
          <div className="position-sticky pt-3">
            <h4 className="gold-title fw-bold text-center py-3">THE REYES</h4>
            <ul className="nav flex-column gap-2">
              <li className="nav-item">
                <Link className="nav-link text-light" to="/admin">
                  <i className="bi bi-speedometer2 me-2"></i> Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/admin/productos">
                  <i className="bi bi-box-seam me-2"></i> Productos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-warning fw-bold" to="/admin/usuarios">
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
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-5">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom border-secondary">
            <h1 className="h2 gold-title fw-bold">Listado de Usuarios Registrados</h1>
          </div>

          <div className="table-responsive bg-black p-4 rounded border border-secondary shadow-lg">
            <Table dark striped hover responsive align="middle" className="mb-0">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo Electrónico</th>
                  <th>Rol / Perfil</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((user) => (
                  <tr key={user.id}>
                    <td className="fw-semibold">{user.nombre}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge ${user.rol === 'Administrador' ? 'bg-warning text-dark' : 'bg-secondary'}`}>
                        {user.rol}
                      </span>
                    </td>
                    <td className="text-center">
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleEliminarUsuario(user.id)}
                      >
                        <i className="bi bi-trash"></i> Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
};