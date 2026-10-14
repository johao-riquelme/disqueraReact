
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { AdminSidebar } from '../components/AdminSidebar';

import {
  obtenerProductosAPI,
  desactivarProductoAPI
} from '../services/api.js';

export const AdminProductos = () => {

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [productoProcesando, setProductoProcesando] = useState(null);

  // ==========================================
  // CONSULTAR PRODUCTOS DESDE NEON
  // ==========================================

  useEffect(() => {

    let activo = true;

    const cargarProductos = async () => {

      try {

        setCargando(true);
        setError('');

        const datos = await obtenerProductosAPI();

        if (activo) {
          setProductos(
            Array.isArray(datos) ? datos : []
          );
        }

      } catch (err) {

        if (activo) {
          setError(
            err.message ||
            'No se pudieron cargar los productos desde Neon.'
          );
        }

      } finally {

        if (activo) {
          setCargando(false);
        }

      }
    };

    cargarProductos();

    return () => {
      activo = false;
    };

  }, []);

  // ==========================================
  // FORMATEAR PRECIO EN PESOS CHILENOS
  // ==========================================

  const formatearPrecio = (precio) => {

    return `$${Number(precio || 0).toLocaleString('es-CL')} CLP`;

  };

  // ==========================================
  // MOSTRAR CATEGORIA
  // ==========================================

  const mostrarCategoria = (categoria) => {

    if (categoria === 'microfono') {
      return 'Micrófonos';
    }

    if (categoria === 'interfaz') {
      return 'Interfaces';
    }

    return categoria || 'Sin categoría';

  };

  // ==========================================
  // DESACTIVAR PRODUCTO EN NEON
  // ==========================================

  const handleEliminarProducto = async (id) => {

    if (productoProcesando !== null) {
      return;
    }

    const confirmar = window.confirm(
      '¿Estás seguro de que deseas desactivar este producto?\n\n' +
      'Dejará de aparecer en el catálogo, pero seguirá guardado en Neon.'
    );

    if (!confirmar) {
      return;
    }

    try {

      setProductoProcesando(id);
      setError('');
      setMensaje('');

      await desactivarProductoAPI(id);

      setProductos((anteriores) =>
        anteriores.filter((producto) => producto.id !== id)
      );

      setMensaje(
        'Producto desactivado correctamente en Neon.'
      );

    } catch (err) {

      setError(
        err.message ||
        'No se pudo desactivar el producto.'
      );

    } finally {

      setProductoProcesando(null);

    }

  };

  // ==========================================
  // PANEL ADMINISTRATIVO
  // ==========================================

  return (

    <div className="container-fluid bg-dark text-light min-vh-100 p-0 overflow-hidden">

      <div className="row g-0">

        <AdminSidebar />

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">

          <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom border-secondary">

            <div>

              <h1 className="h3 text-warning fw-bold m-0">
                Catálogo de Productos
              </h1>

              <small className="text-white fs-6">
                Administra el inventario completo de la tienda
              </small>

            </div>

            <Link
              to="/admin/productos/nuevo"
              className="btn btn-warning fw-bold text-dark px-4 rounded-pill shadow-sm"
            >
              <i className="bi bi-plus-lg me-1"></i>
              {' '}NUEVO PRODUCTO
            </Link>

          </div>

          {/* MENSAJE DE ERROR */}

          {error && (

            <div className="alert alert-danger" role="alert">
              {error}
            </div>

          )}

          {/* MENSAJE DE EXITO */}

          {mensaje && (

            <div className="alert alert-success" role="status">
              {mensaje}
            </div>

          )}

          <div className="bg-black p-4 rounded-3 border border-secondary shadow-lg">

            {/* CARGANDO */}

            {cargando ? (

              <div className="text-center py-4">

                <div
                  className="spinner-border text-warning"
                  role="status"
                ></div>

                <p className="text-light mt-3 mb-0">
                  Cargando productos desde Neon...
                </p>

              </div>

            ) : (

              <>

                {/* SIN PRODUCTOS */}

                {!error && productos.length === 0 && (

                  <div className="text-center py-4">

                    <p className="text-light mb-3">
                      No hay productos activos para mostrar.
                    </p>

                    <Link
                      to="/admin/productos/nuevo"
                      className="btn btn-warning fw-bold text-dark"
                    >
                      Agregar Producto
                    </Link>

                  </div>

                )}

                {/* TABLA DE PRODUCTOS */}

                {productos.length > 0 && (

                  <Table
                    responsive
                    borderless
                    hover
                    variant="dark"
                    align="middle"
                    className="mb-0"
                  >

                    <thead>

                      <tr className="border-bottom border-secondary text-warning">

                        <th>CÓDIGO</th>

                        <th>PRODUCTO</th>

                        <th>CATEGORÍA</th>

                        <th>PRECIO</th>

                        <th>STOCK</th>

                        <th className="text-center">
                          ACCIONES
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {productos.map((prod) => (

                        <tr
                          key={prod.id}
                          className="border-bottom border-secondary"
                        >

                          {/* CODIGO */}

                          <td>

                            <span className="badge bg-secondary text-white fw-bold">

                              {`ID-${String(prod.id).padStart(3, '0')}`}

                            </span>

                          </td>

                          {/* PRODUCTO */}

                          <td className="fw-semibold text-white">
                            {prod.nombre}
                          </td>

                          {/* CATEGORIA */}

                          <td>

                            <span className="badge bg-dark border border-secondary text-white">

                              {mostrarCategoria(prod.categoria)}

                            </span>

                          </td>

                          {/* PRECIO */}

                          <td className="text-warning fw-bold">
                            {formatearPrecio(prod.precio)}
                          </td>

                          {/* STOCK */}

                          <td>

                            <span
                              className={`badge ${
                                prod.stock < 10
                                  ? 'bg-danger text-white'
                                  : 'bg-success text-white'
                              }`}
                            >

                              {prod.stock} un.
                              {prod.stock < 10 && ' (Bajo)'}

                            </span>

                          </td>

                          {/* ACCIONES: EDITAR Y ELIMINAR */}

                          <td className="text-center">

                            <div className="d-flex gap-2 justify-content-center">

                              {/* BOTON EDITAR */}

                              <Link
                                to={`/admin/productos/editar/${prod.id}`}
                                className="btn btn-outline-warning btn-sm"
                                title="Editar producto"
                              >

                                <i className="bi bi-pencil-square me-1"></i>
                                {' '}Editar

                              </Link>

                              {/* BOTON ELIMINAR */}

                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() =>
                                  handleEliminarProducto(prod.id)
                                }
                                disabled={productoProcesando !== null}
                                title="Desactivar producto en Neon"
                              >

                                <i className="bi bi-trash me-1"></i>

                                {productoProcesando === prod.id
                                  ? 'Desactivando...'
                                  : 'Eliminar'}

                              </Button>

                            </div>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </Table>

                )}

              </>

            )}

          </div>

        </main>

      </div>

    </div>

  );
};
