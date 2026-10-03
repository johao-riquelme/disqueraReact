import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const AdminNuevoProducto = () => {
  const navigate = useNavigate();

  // Estados locales para los campos del formulario
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [stockCritico, setStockCritico] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagen, setImagen] = useState('');
  const [mensaje, setMensaje] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    if (codigo.length < 3) {
      setMensaje({ texto: 'El código de producto debe tener al menos 3 caracteres.', tipo: 'danger' });
      return;
    }

    // Objeto del nuevo producto listo para enviar a la Base de Datos en el futuro
    const nuevoProducto = {
      codigo,
      nombre,
      descripcion,
      precio: parseFloat(precio),
      stock: parseInt(stock),
      stockCritico: stockCritico ? parseInt(stockCritico) : 0,
      categoria,
      imagen
    };

    console.log('Producto registrado con éxito:', nuevoProducto);
    setMensaje({ texto: '¡Producto guardado exitosamente!', tipo: 'success' });

    // Redirigir al listado de productos de administración tras 1.5 segundos
    setTimeout(() => {
      navigate('/admin/productos');
    }, 1500);
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
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom border-secondary">
            <h1 className="h2 gold-title fw-bold">Nuevo Producto</h1>
            <span className="text-warning fw-bold"><i className="bi bi-person-circle"></i> Administrador</span>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <div className="card rr text-light border-gold p-4 shadow-lg bg-black">
                <div className="card-body">
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3 text-start">
                      <label htmlFor="codigoProd" className="form-label text-warning">Código de Producto (Mínimo 3 caracteres)</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-light border-secondary" 
                        id="codigoProd" 
                        placeholder="Ej: PROD001" 
                        required 
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                      />
                    </div>

                    <div className="mb-3 text-start">
                      <label htmlFor="nombreProd" className="form-label text-warning">Nombre del Producto (Máx 100 caracteres)</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-light border-secondary" 
                        id="nombreProd" 
                        maxLength="100" 
                        placeholder="Ej: Micrófono Condensador Pro" 
                        required 
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>

                    <div className="mb-3 text-start">
                      <label htmlFor="descProd" className="form-label text-warning">Descripción (Opcional, Máx 500 caracteres)</label>
                      <textarea 
                        className="form-control bg-dark text-light border-secondary" 
                        id="descProd" 
                        rows="3" 
                        maxLength="500" 
                        placeholder="Detalles técnicos del producto..."
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3 text-start">
                        <label htmlFor="precioProd" className="form-label text-warning">Precio USD ($)</label>
                        <input 
                          type="number" 
                          step="0.01" 
                          min="0" 
                          className="form-control bg-dark text-light border-secondary" 
                          id="precioProd" 
                          placeholder="2999" 
                          required 
                          value={precio}
                          onChange={(e) => setPrecio(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 mb-3 text-start">
                        <label htmlFor="stockProd" className="form-label text-warning">Stock (Enteros &gt;= 0)</label>
                        <input 
                          type="number" 
                          step="1" 
                          min="0" 
                          className="form-control bg-dark text-light border-secondary" 
                          id="stockProd" 
                          placeholder="10" 
                          required 
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3 text-start">
                        <label htmlFor="stockCriticoProd" className="form-label text-warning">Stock Crítico (Alerta opcional)</label>
                        <input 
                          type="number" 
                          step="1" 
                          min="0" 
                          className="form-control bg-dark text-light border-secondary" 
                          id="stockCriticoProd" 
                          placeholder="3"
                          value={stockCritico}
                          onChange={(e) => setStockCritico(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 mb-3 text-start">
                        <label htmlFor="categoriaProd" className="form-label text-warning">Categoría</label>
                        <select 
                          className="form-select bg-dark text-light border-secondary" 
                          id="categoriaProd" 
                          required
                          value={categoria}
                          onChange={(e) => setCategoria(e.target.value)}
                        >
                          <option value="">Seleccione categoría...</option>
                          <option value="microfonos">Micrófonos</option>
                          <option value="interfaces">Interfaces</option>
                          <option value="planes">Planes de Estudio</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4 text-start">
                      <label htmlFor="imagenProd" className="form-label text-warning">Ruta de Imagen (Ej: img/interfaz1.jpg)</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-light border-secondary" 
                        id="imagenProd" 
                        placeholder="img/interfaz1.jpg"
                        value={imagen}
                        onChange={(e) => setImagen(e.target.value)}
                      />
                    </div>

                    {mensaje && (
                      <div className={`alert alert-${mensaje.tipo} py-2 mb-3 text-center`} role="alert">
                        {mensaje.texto}
                      </div>
                    )}

                    <div className="d-flex gap-3">
                      <button type="submit" className="btn btn-warning w-100 fw-bold py-2 text-dark">GUARDAR PRODUCTO</button>
                      <Link to="/admin/productos" className="btn btn-outline-secondary w-100 fw-bold py-2 text-decoration-none d-flex align-items-center justify-content-center">CANCELAR</Link>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};