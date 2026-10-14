import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { AdminSidebar } from '../components/AdminSidebar';

export const AdminProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Simulación de carga de productos desde la Base de Datos
    const obtenerProductosFalsos = () => {
      const dataProductos = [
        { id: 1, codigo: "PROD-001", nombre: "Polera Oficial The Reyes", categoria: "Ropa", precio: 25, stock: 45 },
        { id: 2, codigo: "PROD-002", nombre: "Vinilo Edición Coleccionista", categoria: "Música", precio: 40, stock: 4 },
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
    <div className="container-fluid bg-dark text-light min-vh-100 p-0 overflow-hidden">
      <div className="row g-0">
        {/* Barra lateral unificada */}
        <AdminSidebar />

        {/* Contenido Principal */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
          <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom border-secondary">
            <div>
              <h1 className="h3 text-warning fw-bold m-0">Catálogo de Productos</h1>
              <small className="text-white fs-6">Administra el inventario completo de la tienda</small>
            </div>
            <Link to="/admin/productos/nuevo" className="btn btn-warning fw-bold text-dark px-4 rounded-pill shadow-sm">
              <i className="bi bi-plus-lg me-1"></i> NUEVO PRODUCTO
            </Link>
          </div>

          <div className="bg-black p-4 rounded-3 border border-secondary shadow-lg">
            <Table responsive borderless hover variant="dark" align="middle" className="mb-0">
              <thead>
                <tr className="border-bottom border-secondary text-warning">
                  <th>CÓDIGO</th>
                  <th>PRODUCTO</th>
                  <th>CATEGORÍA</th>
                  <th>PRECIO</th>
                  <th>STOCK</th>
                  <th className="text-center">ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((prod) => (
                  <tr key={prod.id} className="border-bottom border-secondary">
                    <td>
                      <span className="badge bg-secondary text-white fw-bold">{prod.codigo}</span>
                    </td>
                    <td className="fw-semibold text-white">{prod.nombre}</td>
                    <td>
                      <span className="badge bg-dark border border-secondary text-white">{prod.categoria}</span>
                    </td>
                    <td className="text-warning fw-bold">${prod.precio} USD</td>
                    <td>
                      <span className={`badge ${prod.stock < 10 ? 'bg-danger text-white' : 'bg-success text-white'}`}>
                        {prod.stock} un. {prod.stock < 10 && '(Bajo)'}
                      </span>
                    </td>
                    <td className="text-center">
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleEliminarProducto(prod.id)}
                        title="Eliminar producto"
                      >
                        <i className="bi bi-trash me-1"></i> Eliminar
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