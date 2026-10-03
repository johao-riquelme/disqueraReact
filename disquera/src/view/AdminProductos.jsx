import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

export const AdminProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Simulación de carga de productos desde la Base de Datos
    const obtenerProductosFalsos = () => {
      const dataProductos = [
        { id: 1, codigo: "PROD-001", nombre: "Polera Oficial The Reyes", categoria: "Ropa", precio: 25, stock: 45 },
        { id: 2, codigo: "PROD-002", nombre: "Vinilo Edición Coleccionista", categoria: "Música", precio: 40, stock: 12 },
        { id: 3, codigo: "PROD-003", nombre: "Gorra Snapback Bordada", categoria: "Accesorios", precio: 20, stock: 30 }
      ];
      setProductos(dataProductos);
    };

    obtenerProductosFalsos();
  }, []);

  const handleEliminarProducto = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      setProductos(productos.filter(p => p.id !== id));
    }
  };

  return (
    <div className="container-fluid bg-dark text-light min-vh-100">
      <div className="row">
        {/* BARRA LATERAL DE ADMINISTRACIÓN */}
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
                <Link className="nav-link text-warning fw-bold" to="/admin/productos">
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
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-5">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom border-secondary">
            <h1 className="h2 gold-title fw-bold">Listado de Productos</h1>
            <Link to="/admin/productos/nuevo" className="btn btn-warning fw-bold text-dark">
              <i className="bi bi-plus-circle me-1"></i> NUEVO PRODUCTO
            </Link>
          </div>

          <div className="table-responsive bg-black p-4 rounded border border-secondary shadow-lg">
            <Table dark striped hover responsive align="middle" className="mb-0">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((prod) => (
                  <tr key={prod.id}>
                    <td><code>{prod.codigo}</code></td>
                    <td className="fw-semibold">{prod.nombre}</td>
                    <td>{prod.categoria}</td>
                    <td className="text-warning">${prod.precio} USD</td>
                    <td>{prod.stock} un.</td>
                    <td className="text-center">
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleEliminarProducto(prod.id)}
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