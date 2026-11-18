import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminSidebar } from '../components/AdminSidebar';
import {
  obtenerVentasAPI,
  obtenerProductosAPI,
  obtenerUsuariosAPI,
  obtenerOrdenesPendientesAPI,
} from '../services/api';

export const AdminHome = () => {
  const [vistaActiva, setVistaActiva] = useState('ventas'); // 'ventas' | 'productos' | 'usuarios' | 'pendientes'
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [pendientes, setPendientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const cargarDatos = async () => {
    setCargando(true);
    setError('');
    try {
      const [resVentas, resProductos, resUsuarios, resPendientes] = await Promise.all([
        obtenerVentasAPI().catch(() => []),
        obtenerProductosAPI().catch(() => []),
        obtenerUsuariosAPI().catch(() => []),
        obtenerOrdenesPendientesAPI().catch(() => []),
      ]);

      setVentas(Array.isArray(resVentas) ? resVentas : resVentas?.pedidos || []);
      setProductos(Array.isArray(resProductos) ? resProductos : []);
      setUsuarios(Array.isArray(resUsuarios) ? resUsuarios : []);
      setPendientes(Array.isArray(resPendientes) ? resPendientes : []);
    } catch (err) {
      setError(err.message || 'Error al cargar métricas del panel');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // Total recaudado sumando todos los pedidos (o los no cancelados)
  const totalRecaudado = ventas.reduce((acc, v) => acc + Number(v.total || 0), 0);

  const formatearMoneda = (valor) =>
    new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0,
    }).format(valor || 0);

  const formatearFecha = (fecha) => {
    if (!fecha) return '-';
    return new Date(fecha).toLocaleString('es-CL', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  };

  return (
    <div className="container-fluid bg-dark text-light min-vh-100">
      <div className="row">
        <AdminSidebar />

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
          {/* ENCABEZADO SUPERIOR */}
          <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom border-secondary">
            <h1 className="h3 gold-title fw-bold m-0">¡Bienvenido, Administrador!</h1>

            <div className="d-flex align-items-center gap-2">
              <button
                onClick={cargarDatos}
                className="btn btn-sm btn-outline-secondary text-light"
                title="Actualizar datos"
              >
                <i className="bi bi-arrow-clockwise me-1"></i> Actualizar
              </button>
              <span className="badge bg-outline-warning border border-warning text-warning px-3 py-2 rounded-pill">
                <i className="bi bi-person-circle me-1"></i> Admin Online
              </span>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger py-2" role="alert">
              {error}
            </div>
          )}

          {/* TARJETAS RESUMEN CLICABLES (KPIs) */}
          <div className="row g-4 mb-4">
            {/* 1. VENTAS TOTALES */}
            <div className="col-12 col-sm-6 col-xl-3">
              <div
                role="button"
                onClick={() => setVistaActiva('ventas')}
                className={`card bg-black text-light shadow-sm rounded-4 h-100 transition ${
                  vistaActiva === 'ventas' ? 'border-warning border-2' : 'border-secondary'
                }`}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div>
                    <span className="text-white-50 fs-7 d-block">Ventas Totales</span>
                    <h3 className="gold-title fw-bold m-0">
                      {cargando ? '...' : formatearMoneda(totalRecaudado)}
                    </h3>
                    <small className="text-warning">{ventas.length} compras realizadas</small>
                  </div>
                  <div className="p-3 bg-warning bg-opacity-10 rounded-circle text-warning fs-3">
                    <i className="bi bi-currency-dollar"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. PRODUCTOS */}
            <div className="col-12 col-sm-6 col-xl-3">
              <div
                role="button"
                onClick={() => setVistaActiva('productos')}
                className={`card bg-black text-light shadow-sm rounded-4 h-100 ${
                  vistaActiva === 'productos' ? 'border-info border-2' : 'border-secondary'
                }`}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div>
                    <span className="text-white-50 fs-7 d-block">Productos</span>
                    <h3 className="gold-title fw-bold m-0">
                      {cargando ? '...' : productos.length}
                    </h3>
                    <small className="text-info">Ver catálogo</small>
                  </div>
                  <div className="p-3 bg-info bg-opacity-10 rounded-circle text-info fs-3">
                    <i className="bi bi-box-seam"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. USUARIOS */}
            <div className="col-12 col-sm-6 col-xl-3">
              <div
                role="button"
                onClick={() => setVistaActiva('usuarios')}
                className={`card bg-black text-light shadow-sm rounded-4 h-100 ${
                  vistaActiva === 'usuarios' ? 'border-success border-2' : 'border-secondary'
                }`}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div>
                    <span className="text-white-50 fs-7 d-block">Usuarios Registrados</span>
                    <h3 className="gold-title fw-bold m-0">
                      {cargando ? '...' : usuarios.length}
                    </h3>
                    <small className="text-success">Ver lista completa</small>
                  </div>
                  <div className="p-3 bg-success bg-opacity-10 rounded-circle text-success fs-3">
                    <i className="bi bi-people"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. ÓRDENES PENDIENTES */}
            <div className="col-12 col-sm-6 col-xl-3">
              <div
                role="button"
                onClick={() => setVistaActiva('pendientes')}
                className={`card bg-black text-light shadow-sm rounded-4 h-100 ${
                  vistaActiva === 'pendientes' ? 'border-danger border-2' : 'border-secondary'
                }`}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div>
                    <span className="text-white-50 fs-7 d-block">Órdenes Pendientes</span>
                    <h3 className="gold-title fw-bold m-0">
                      {cargando ? '...' : pendientes.length}
                    </h3>
                    <small className="text-danger">Revisar pendientes</small>
                  </div>
                  <div className="p-3 bg-danger bg-opacity-10 rounded-circle text-danger fs-3">
                    <i className="bi bi-clock-history"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PANEL DINÁMICO SEGÚN LA TARJETA SELECCIONADA */}
          <div className="p-4 bg-black rounded-4 border border-secondary shadow">
            {cargando ? (
              <div className="text-center py-5">
                <div className="spinner-border text-warning" role="status"></div>
                <p className="mt-2 text-white-50">Cargando información desde la base de datos...</p>
              </div>
            ) : (
              <>
                {/* VISTA 1: DETALLE DE VENTAS Y QUÉ COMPRARON */}
                {vistaActiva === 'ventas' && (
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="gold-title fw-bold m-0">
                        <i className="bi bi-receipt me-2"></i>
                        Desglose de Ventas ({ventas.length} órdenes — Total: {formatearMoneda(totalRecaudado)})
                      </h4>
                    </div>

                    {ventas.length === 0 ? (
                      <p className="text-white-50 text-center py-4 m-0">
                        Aún no se han registrado compras en la tienda.
                      </p>
                    ) : (
                      <div className="table-responsive">
                        <table className="table table-dark table-hover align-middle mb-0">
                          <thead>
                            <tr className="text-warning border-secondary">
                              <th># Pedido</th>
                              <th>Cliente</th>
                              <th>Fecha</th>
                              <th>Ítems Comprados</th>
                              <th>Estado</th>
                              <th className="text-end">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ventas.map((venta) => (
                              <tr key={venta.id} className="border-secondary">
                                <td className="fw-bold text-warning">#{venta.id}</td>
                                <td>
                                  <div>{venta.nombreCliente}</div>
                                  <small className="text-white-50">{venta.correoCliente}</small>
                                </td>
                                <td>{formatearFecha(venta.fechaPedido)}</td>
                                <td>
                                  {venta.items && venta.items.length > 0 ? (
                                    <ul className="list-unstyled mb-0 small">
                                      {venta.items.map((item, idx) => (
                                        <li key={idx}>
                                          <span className="badge bg-secondary me-1">{item.cantidad}x</span>
                                          {item.nombre}{' '}
                                          <span className="text-white-50">
                                            ({formatearMoneda(item.subtotal)})
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <span className="text-white-50 small">Sin detalle</span>
                                  )}
                                </td>
                                <td>
                                  <span
                                    className={`badge ${
                                      venta.estado === 'pendiente'
                                        ? 'bg-warning text-dark'
                                        : 'bg-success'
                                    }`}
                                  >
                                    {venta.estado}
                                  </span>
                                </td>
                                <td className="text-end fw-bold text-warning">
                                  {formatearMoneda(venta.total)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* VISTA 2: CATÁLOGO DE PRODUCTOS */}
                {vistaActiva === 'productos' && (
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="gold-title fw-bold m-0">
                        <i className="bi bi-box-seam me-2"></i>
                        Productos en Catálogo ({productos.length})
                      </h4>
                      <Link to="/admin/productos" className="btn btn-sm btn-warning fw-bold">
                        Gestionar Productos
                      </Link>
                    </div>

                    {productos.length === 0 ? (
                      <p className="text-white-50 text-center py-4 m-0">
                        No hay productos registrados todavía.
                      </p>
                    ) : (
                      <div className="table-responsive">
                        <table className="table table-dark table-hover align-middle mb-0">
                          <thead>
                            <tr className="text-info border-secondary">
                              <th>ID</th>
                              <th>Nombre</th>
                              <th>Categoría</th>
                              <th>Precio</th>
                              <th>Stock</th>
                              <th>Estado</th>
                            </tr>
                          </thead>
                          <tbody>
                            {productos.map((prod) => (
                              <tr key={prod.id} className="border-secondary">
                                <td>#{prod.id}</td>
                                <td className="fw-semibold">{prod.nombre}</td>
                                <td>
                                  <span className="badge bg-secondary">{prod.categoria}</span>
                                </td>
                                <td className="text-warning fw-bold">
                                  {formatearMoneda(prod.precio)}
                                </td>
                                <td>{prod.stock} un.</td>
                                <td>
                                  <span className={`badge ${prod.activo ? 'bg-success' : 'bg-danger'}`}>
                                    {prod.activo ? 'Activo' : 'Inactivo'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* VISTA 3: USUARIOS REGISTRADOS */}
                {vistaActiva === 'usuarios' && (
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="gold-title fw-bold m-0">
                        <i className="bi bi-people me-2"></i>
                        Usuarios Registrados ({usuarios.length} en total)
                      </h4>
                      <Link to="/admin/usuarios" className="btn btn-sm btn-outline-success">
                        Ir a Vista Usuarios
                      </Link>
                    </div>

                    {usuarios.length === 0 ? (
                      <p className="text-white-50 text-center py-4 m-0">
                        No hay usuarios registrados en la base de datos.
                      </p>
                    ) : (
                      <div className="table-responsive">
                        <table className="table table-dark table-hover align-middle mb-0">
                          <thead>
                            <tr className="text-success border-secondary">
                              <th>ID</th>
                              <th>Nombre</th>
                              <th>Correo</th>
                              <th>Teléfono</th>
                              <th>Rol</th>
                              <th>Estado</th>
                            </tr>
                          </thead>
                          <tbody>
                            {usuarios.map((u) => (
                              <tr key={u.id} className="border-secondary">
                                <td>#{u.id}</td>
                                <td className="fw-semibold">
                                  {u.nombre} {u.apellido}
                                </td>
                                <td>{u.correo}</td>
                                <td>{u.telefono || '-'}</td>
                                <td>
                                  <span
                                    className={`badge ${
                                      u.rol === 'admin' ? 'bg-warning text-dark' : 'bg-secondary'
                                    }`}
                                  >
                                    {u.rol}
                                  </span>
                                </td>
                                <td>
                                  <span className={`badge ${u.activo ? 'bg-success' : 'bg-danger'}`}>
                                    {u.activo ? 'Activo' : 'Inactivo'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* VISTA 4: ÓRDENES PENDIENTES */}
                {vistaActiva === 'pendientes' && (
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="gold-title fw-bold m-0">
                        <i className="bi bi-clock-history me-2"></i>
                        Órdenes Pendientes ({pendientes.length})
                      </h4>
                    </div>

                    {pendientes.length === 0 ? (
                      <p className="text-white-50 text-center py-4 m-0">
                        ¡Excelente! No hay órdenes pendientes por atender.
                      </p>
                    ) : (
                      <div className="table-responsive">
                        <table className="table table-dark table-hover align-middle mb-0">
                          <thead>
                            <tr className="text-danger border-secondary">
                              <th># Pedido</th>
                              <th>Cliente</th>
                              <th>Dirección Envío</th>
                              <th>Fecha</th>
                              <th>Detalle</th>
                              <th className="text-end">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pendientes.map((ord) => (
                              <tr key={ord.id} className="border-secondary">
                                <td className="fw-bold text-danger">#{ord.id}</td>
                                <td>
                                  <div>{ord.nombreCliente}</div>
                                  <small className="text-white-50">{ord.correoCliente}</small>
                                </td>
                                <td>{ord.direccionEnvio}</td>
                                <td>{formatearFecha(ord.fechaPedido)}</td>
                                <td>
                                  {ord.items && ord.items.length > 0 ? (
                                    <ul className="list-unstyled mb-0 small">
                                      {ord.items.map((item, idx) => (
                                        <li key={idx}>
                                          {item.cantidad}x {item.nombre}
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <span className="text-white-50 small">-</span>
                                  )}
                                </td>
                                <td className="text-end fw-bold text-warning">
                                  {formatearMoneda(ord.total)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};