import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { AdminSidebar } from '../components/AdminSidebar';

export const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const dataUsuarios = [
      { id: 1, nombre: "Johao Riquelme", email: "admin@thereyesrecords.cl", rol: "Administrador" },
      { id: 2, nombre: "Carlos Torres", email: "carlos@ejemplo.cl", rol: "Cliente" },
      { id: 3, nombre: "Sofía Valenzuela", email: "sofia@ejemplo.cl", rol: "Cliente" }
    ];
    setUsuarios(dataUsuarios);
  }, []);

  const handleEliminarUsuario = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      setUsuarios(usuarios.filter(u => u.id !== id));
    }
  };

  return (
    <div className="container-fluid bg-dark text-light min-vh-100 p-0 overflow-hidden">
      <div className="row g-0">
        <AdminSidebar />

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
          <div className="pb-3 mb-4 border-bottom border-secondary">
            <h1 className="h3 text-warning fw-bold m-0">Listado de Usuarios Registrados</h1>
            <small className="text-muted">Administración de accesos y perfiles</small>
          </div>

          <div className="bg-black p-3 rounded-3 border border-secondary shadow">
            <Table responsive borderless hover variant="dark" align="middle" className="mb-0">
              <thead>
                <tr className="border-bottom border-secondary text-warning">
                  <th>USUARIO</th>
                  <th>CORREO ELECTRÓNICO</th>
                  <th>ROL / PERFIL</th>
                  <th className="text-center">ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((user) => (
                  <tr key={user.id} className="border-bottom border-secondary">
                    <td className="fw-semibold text-white">
                      <i className="bi bi-person-circle me-2 text-warning"></i>
                      {user.nombre}
                    </td>
                    <td className="text-light">{user.email}</td>
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
                        <i className="bi bi-trash"></i>
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