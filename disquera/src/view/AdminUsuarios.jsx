import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { AdminSidebar } from '../components/AdminSidebar';
import { obtenerUsuariosAPI } from '../services/api';

export const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const respuesta = await obtenerUsuariosAPI();
        setUsuarios(Array.isArray(respuesta) ? respuesta : []);
      } catch (err) {
        setError(err.message || 'No se pudo cargar la lista de usuarios.');
      } finally {
        setCargando(false);
      }
    };

    cargarUsuarios();
  }, []);

  return (
    <div className="container-fluid bg-dark text-light min-vh-100 p-0 overflow-hidden">
      <div className="row g-0">
        <AdminSidebar />


        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
          <div className="pb-3 mb-4 border-bottom border-secondary">
            <h1 className="h3 text-warning fw-bold m-0">Listado de Usuarios Registrados</h1>
            <small className="text-white fs-6">
              Gestión de accesos, cuentas activas y roles del sistema
              {!cargando && !error && ` · ${usuarios.length} en total`}
            </small>
          </div>

          <div className="bg-black p-4 rounded-3 border border-secondary shadow-lg">
            {cargando && <p className="text-white m-0">Cargando usuarios...</p>}

            {error && <p className="text-danger m-0">{error}</p>}

            {!cargando && !error && usuarios.length === 0 && (
              <p className="text-white-50 text-center py-4 m-0">
                No hay usuarios registrados en la base de datos.
              </p>
            )}

            {!cargando && !error && usuarios.length > 0 && (
              <Table responsive borderless hover variant="dark" align="middle" className="mb-0">
                <thead>
                  <tr className="border-bottom border-secondary text-warning">
                    <th>USUARIO</th>
                    <th>CORREO ELECTRÓNICO</th>
                    <th>ROL / PERFIL</th>
                    <th className="text-center">ESTADO</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((user) => {
                    const esAdmin = user.rol === 'admin';
                    return (
                      <tr key={user.id} className="border-bottom border-secondary">
                        <td className="fw-semibold text-white">
                          <i className="bi bi-person-circle me-2 text-warning"></i>
                          {`${user.nombre} ${user.apellido ?? ''}`.trim()}
                        </td>
                        <td className="text-white">{user.correo}</td>
                        <td>
                          <span className={`badge ${esAdmin ? 'bg-warning text-dark fw-bold' : 'bg-secondary text-white'}`}>
                            {esAdmin ? 'Administrador' : 'Cliente'}
                          </span>
                        </td>
                        <td className="text-center">
                          <span className={`badge ${user.activo ? 'bg-success' : 'bg-danger'}`}>
                            {user.activo ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};