
import { useState } from "react";
import { Link } from "react-router-dom";
import { blogs } from "../data/blogs";


export function Blog() {
  const [categoria, setCategoria] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const categorias = [
    "Todos",
    "Noticias",
    "Estudios",
    "Tutoriales",
    "Guías"
  ];

  // Filtrar noticias por categoría y búsqueda
  const blogsFiltrados = blogs.filter((blog) => {
    const coincideCategoria =
      categoria === "Todos" ||
      blog.categoria === categoria;

    const coincideBusqueda =
      blog.titulo.toLowerCase().includes(
        busqueda.toLowerCase().trim()
      ) ||
      blog.descripcion.toLowerCase().includes(
        busqueda.toLowerCase().trim()
      );

    return coincideCategoria && coincideBusqueda;
  });

  return (
    <main className="fondo-hero blog-page">

      {/* ENCABEZADO DEL BLOG */}
      <section className="blog-hero">
        <div className="blog-hero-content">
          <span className="blog-subtitulo">
            BLOG OFICIAL
          </span>

          <h1 className="gold-title">
           NOVEDADES DE NUESTRA DISQUERA
            </h1>

          <p>
            Descubre las últimas noticias de The Reyes Records,
            novedades de nuestros estudios, guías y tutoriales
            para los amantes de la música.
          </p>

          <div className="blog-linea"></div>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <section className="blog-contenido container">

        {/* FILTROS Y BUSCADOR */}
        <div className="blog-herramientas">

          <div className="blog-categorias">
            {categorias.map((cat) => (
              <button
                key={cat}
                type="button"
                className={
                  categoria === cat ? "activo" : ""
                }
                onClick={() => setCategoria(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <input
            type="search"
            placeholder="Buscar publicaciones..."
            aria-label="Buscar publicaciones"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        {/* TARJETAS DE NOTICIAS */}
        <div className="row g-4">

          {blogsFiltrados.map((blog) => (
            <div
              className="col-12 col-md-6 col-lg-4"
              key={blog.id}
            >
              <article className="card blog-card content-box">

                <img
                  src={blog.imagen}
                  alt={blog.titulo}
                  className="blog-card-img"
                  loading="lazy"
                />

                <div className="blog-card-body">

                  <div className="blog-card-meta">
                    <span>{blog.categoria}</span>
                    <small>{blog.fecha}</small>
                  </div>

                 <h3 className="gold-title">
                  {blog.titulo}
                  </h3>

                  <p>{blog.descripcion}</p>

                  <Link
                    to={`/blog/${blog.id}`}
                    className="blog-leer-mas"
                  >
                    Leer más →
                  </Link>

                </div>
              </article>
            </div>
          ))}

          {/* MENSAJE SI NO HAY RESULTADOS */}
          {blogsFiltrados.length === 0 && (
            <div className="col-12">
              <p className="blog-sin-resultados">
                No se encontraron publicaciones.
                Intenta con otra búsqueda.
              </p>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}
