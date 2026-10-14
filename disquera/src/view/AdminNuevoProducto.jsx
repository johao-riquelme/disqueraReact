import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AdminSidebar } from '../components/AdminSidebar';
import { crearProductoAPI } from '../services/api.js';

export const AdminNuevoProducto = () => {

  const navigate = useNavigate();

  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [stockCritico, setStockCritico] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagen, setImagen] = useState('');

  const [mensaje, setMensaje] = useState(null);
  const [guardando, setGuardando] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (guardando) {
      return;
    }

    setMensaje(null);

    if (codigo.trim().length < 3) {

      setMensaje({
        texto: 'El código de producto debe tener al menos 3 caracteres.',
        tipo: 'danger'
      });

      return;
    }

    if (!nombre.trim() || nombre.trim().length > 150) {

      setMensaje({
        texto: 'Ingresa un nombre válido para el producto.',
        tipo: 'danger'
      });

      return;
    }
    const precioNumero = Number(precio);
    const stockNumero = Number(stock);

    if (
      precio.trim() === '' ||
      !Number.isSafeInteger(precioNumero) ||
      precioNumero < 0 ||
      precioNumero > 2147483647
    ) {

      setMensaje({
        texto: 'El precio debe ser un número entero válido en pesos chilenos.',
        tipo: 'danger'
      });

      return;
    }

    if (
      stock.trim() === '' ||
      !Number.isSafeInteger(stockNumero) ||
      stockNumero < 0 ||
      stockNumero > 2147483647
    ) {

      setMensaje({
        texto: 'El stock debe ser un número entero mayor o igual a cero.',
        tipo: 'danger'
      });

      return;
    }

    if (stockCritico.trim() !== '') {

      const criticoNumero = Number(stockCritico);

      if (
        !Number.isSafeInteger(criticoNumero) ||
        criticoNumero < 0
      ) {

        setMensaje({
          texto: 'El stock crítico debe ser un número entero válido.',
          tipo: 'danger'
        });

        return;
      }
    }

    if (
      categoria !== 'microfono' &&
      categoria !== 'interfaz'
    ) {

      setMensaje({
        texto: 'Selecciona una categoría válida.',
        tipo: 'danger'
      });

      return;
    }
    const nuevoProducto = {

      nombre: nombre.trim(),

      descripcion: descripcion.trim(),

      precio: precioNumero,

      stock: stockNumero,

      categoria: categoria,

      imagen: imagen.trim(),

    };

    try {

      setGuardando(true);

      const productoGuardado =
        await crearProductoAPI(nuevoProducto);

      if (!productoGuardado?.id) {

        throw new Error(
          'Spring Boot no confirmó el registro del producto.'
        );
      }

      setMensaje({
        texto: `¡Producto guardado exitosamente en Neon! ID: ${productoGuardado.id}`,
        tipo: 'success'
      });
      navigate('/admin/productos', {
        replace: true
      });

    } catch (error) {

      console.error(
        'Error al registrar producto:',
        error
      );

      setMensaje({
        texto:
          error.message ||
          'No se pudo guardar el producto en Neon.',
        tipo: 'danger'
      });

    } finally {

      setGuardando(false);

    }
  };

  return (
    <div className="container-fluid bg-dark text-light min-vh-100">
      <div className="row">
        <AdminSidebar />

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">

          <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom border-secondary">

            <h1 className="h3 gold-title fw-bold m-0">
              Nuevo Producto
            </h1>

            <span className="text-warning fw-bold">
              <i className="bi bi-person-circle"></i>
              {' '}Administrador
            </span>

          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">

              <div className="card text-light border-secondary p-4 shadow-lg bg-black rounded-4">
                <div className="card-body">

                  <form onSubmit={handleSubmit}>

                    <div className="mb-3 text-start">

                      <label
                        htmlFor="codigoProd"
                        className="form-label text-warning"
                      >
                        Código de Producto (Mínimo 3 caracteres)
                      </label>

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

                      <label
                        htmlFor="nombreProd"
                        className="form-label text-warning"
                      >
                        Nombre del Producto (Máx 100 caracteres)
                      </label>

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

                      <label
                        htmlFor="descProd"
                        className="form-label text-warning"
                      >
                        Descripción (Opcional, Máx 500 caracteres)
                      </label>

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

                        <label
                          htmlFor="precioProd"
                          className="form-label text-warning"
                        >
                          Precio CLP ($)
                        </label>

                        <input
                          type="number"
                          step="1"
                          min="0"
                          className="form-control bg-dark text-light border-secondary"
                          id="precioProd"
                          placeholder="2999000"
                          required
                          value={precio}
                          onChange={(e) => setPrecio(e.target.value)}
                        />

                      </div>

                      <div className="col-md-6 mb-3 text-start">

                        <label
                          htmlFor="stockProd"
                          className="form-label text-warning"
                        >
                          Stock (Enteros &gt;= 0)
                        </label>

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

                        <label
                          htmlFor="stockCriticoProd"
                          className="form-label text-warning"
                        >
                          Stock Crítico (Alerta opcional)
                        </label>

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

                        <label
                          htmlFor="categoriaProd"
                          className="form-label text-warning"
                        >
                          Categoría
                        </label>

                        <select
                          className="form-select bg-dark text-light border-secondary"
                          id="categoriaProd"
                          required
                          value={categoria}
                          onChange={(e) => setCategoria(e.target.value)}
                        >

                          <option value="">
                            Seleccione categoría...
                          </option>

                          <option value="microfono">
                            Micrófonos
                          </option>

                          <option value="interfaz">
                            Interfaces
                          </option>

                          <option value="planes" disabled>
                            Planes de Estudio (Próximamente)
                          </option>

                        </select>

                      </div>

                    </div>

                    <div className="mb-4 text-start">

                      <label
                        htmlFor="imagenProd"
                        className="form-label text-warning"
                      >
                        Ruta de Imagen (Ej: /interfaces/interfaz1.jpg)
                      </label>

                      <input
                        type="text"
                        className="form-control bg-dark text-light border-secondary"
                        id="imagenProd"
                        placeholder="/interfaces/interfaz1.jpg"
                        value={imagen}
                        onChange={(e) => setImagen(e.target.value)}
                      />

                    </div>

                    {mensaje && (

                      <div
                        className={`alert alert-${mensaje.tipo} py-2 mb-3 text-center`}
                        role="alert"
                      >
                        {mensaje.texto}
                      </div>

                    )}

                    <div className="d-flex gap-3">

                      <button
                        type="submit"
                        className="btn btn-warning w-100 fw-bold py-2 text-dark rounded-3"
                        disabled={guardando}
                      >
                        {guardando
                          ? 'GUARDANDO...'
                          : 'GUARDAR PRODUCTO'}
                      </button>

                      <Link
                        to="/admin/productos"
                        className="btn btn-outline-secondary w-100 fw-bold py-2 text-decoration-none d-flex align-items-center justify-content-center rounded-3"
                      >
                        CANCELAR
                      </Link>

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
