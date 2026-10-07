import { Link, useParams } from 'react-router-dom';

const productos = [
  {
    id: 1,
    nombre: 'Neumann U 87 Ai',
    categoria: 'Micrófonos',
    precio: 3750,
    imagen: '/micro/micro1.jpg',
    descripcion:
      'Micrófono de estudio para voces principales, locución e instrumentos. Cuenta con tres patrones polares: cardioide, omnidireccional y figura de ocho.',
  },
  {
    id: 2,
    nombre: 'AKG C414 XLII',
    categoria: 'Micrófonos',
    precio: 1299,
    imagen: '/micro/micro2.jpg',
    descripcion:
      'Micrófono multipatrón para grabación de pianos, guitarras acústicas, coros y baterías.',
  },
  {
    id: 3,
    nombre: 'Telefunken TF51',
    categoria: 'Micrófonos',
    precio: 1895,
    imagen: '/micro/micro3.jpg',
    descripcion:
      'Micrófono para grabación de voces principales, guitarras acústicas, mandolinas y baterías.',
  },
  {
    id: 4,
    nombre: 'Manley Reference Cardioid',
    categoria: 'Micrófonos',
    precio: 2999,
    imagen: '/micro/micro4.jpg',
    descripcion:
      'Micrófono para voces principales en producciones de pop, R&B, rap y música urbana.',
  },
  {
    id: 5,
    nombre: 'Apollo Twin X Gen 2',
    categoria: 'Interfaces de audio',
    precio: 2899,
    imagen: '/interfaces/interfaz1.jpg',
    descripcion:
      'Interfaz de audio de escritorio para grabación y producción musical.',
  },
  {
    id: 6,
    nombre: 'Apogee Symphony Desktop',
    categoria: 'Interfaces de audio',
    precio: 1499,
    imagen: '/interfaces/interfaz2.jpg',
    descripcion:
      'Interfaz de audio que combina conversión de sonido de alta calidad con un formato de escritorio.',
  },
];

export const DetalleProducto = () => {
  const { id } = useParams();

  const producto = productos.find(
    (item) => item.id === Number(id)
  );

  if (!producto) {
    return (
      <main className="fondo-hero min-vh-100 py-5">
        <div className="container pt-5 mt-4 text-center">
          <h1 className="gold-title fw-bold">
            Producto no encontrado
          </h1>

          <p className="text-light">
            El producto que buscas no está disponible en el catálogo.
          </p>

          <Link to="/productos" className="btn btn-warning fw-bold">
            Volver a productos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="fondo-hero min-vh-100 py-5">
      <div className="container pt-5 mt-4">
        <nav aria-label="Ruta de navegación" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-warning">
                Inicio
              </Link>
            </li>

            <li className="breadcrumb-item">
              <Link to="/productos" className="text-warning">
                Productos
              </Link>
            </li>

            <li
              className="breadcrumb-item active text-light"
              aria-current="page"
            >
              {producto.nombre}
            </li>
          </ol>
        </nav>

        <div className="rr rounded-4 border-gold p-3 p-md-5 shadow-lg">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-md-6">
              <div
                className="bg-white rounded-4 p-4 d-flex
                           align-items-center justify-content-center"
                style={{ minHeight: '300px' }}
              >
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="img-fluid"
                  style={{
                    maxHeight: '380px',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </div>

            <div className="col-12 col-md-6 text-light">
              <span className="badge bg-warning text-dark mb-3">
                {producto.categoria}
              </span>

              <h1 className="gold-title fw-bold mb-3">
                {producto.nombre}
              </h1>

              <p className="fs-5 mb-4">
                {producto.descripcion}
              </p>

              <p className="gold-title fs-2 fw-bold mb-4">
                {new Intl.NumberFormat('es-CL', {
                  style: 'currency',
                  currency: 'USD',
                  currencyDisplay: 'code',
                }).format(producto.precio)}
              </p>

              <div className="d-flex flex-column gap-3">
                <button
                  type="button"
                  className="btn btn-warning fw-bold py-3"
                  disabled
                  aria-describedby="aviso-carrito"
                >
                  <i className="bi bi-cart-plus me-2"></i>
                  Agregar al carrito
                </button>

                <small id="aviso-carrito" className="text-light">
                  La compra estará disponible próximamente.
                </small>

                <Link
                  to="/productos"
                  className="btn btn-outline-light"
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Volver al catálogo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};