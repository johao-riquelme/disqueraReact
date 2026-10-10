import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { obtenerBlogPorId } from "../data/blogs";

// Obtener comentarios de una publicación
function cargarComentarios(id) {
  try {
    const guardados = localStorage.getItem(
      `comentarios-blog-${id}`
    );

    const datos = guardados ? JSON.parse(guardados) : [];
    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

export function DetalleBlog() {
  const { id } = useParams();

  return (
    <main className="fondo-hero detalle-blog-page">
      <DetalleContenido key={id} id={id} />
    </main>
  );
}

function DetalleContenido({ id }) {
  const blog = obtenerBlogPorId(id);

  const [comentarios, setComentarios] = useState(() =>
    cargarComentarios(id)
  );

  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  // Publicar comentario
  const publicarComentario = (e) => {
    e.preventDefault();

    const nombreLimpio = nombre.trim();
    const mensajeLimpio = mensaje.trim();

    if (!nombreLimpio || !mensajeLimpio) {
      setError("Completa tu nombre y comentario.");
      return;
    }

    const nuevoComentario = {
      id: crypto.randomUUID(),
      nombre: nombreLimpio,
      mensaje: mensajeLimpio,
      fecha: new Date().toLocaleDateString("es-CL")
    };

    const actualizados = [
      ...cargarComentarios(id),
      nuevoComentario
    ];

    try {
      localStorage.setItem(
        `comentarios-blog-${id}`,
        JSON.stringify(actualizados)
      );

      setComentarios(actualizados);
      setNombre("");
      setMensaje("");
      setError("");
    } catch {
      setError("No se pudo guardar el comentario.");
    }
  };

  // Publicación no encontrada
  if (!blog) {
    return (
      <div className="container py-5 text-center">
        <h2 className="gold-title">
          Publicación no encontrada
        </h2>

        <p>La noticia que buscas no está disponible.</p>

        <Link to="/blog" className="btn btn-warning fw-bold mt-3">
          ← Volver al Blog
        </Link>
      </div>
    );
  }

 return (
  <div className="container pt-5 pb-5">

    {/* BOTÓN VOLVER AL BLOG */}
    <div className="mt-5 mb-4">
      <Link
        to="/blog"
        className="btn btn-warning fw-bold"
      >
        ← Volver al Blog
      </Link>
    </div>

      {/* ENCABEZADO */}
      <header className="detalle-encabezado">

        <span className="detalle-categoria">
          {blog.categoria}
        </span>

        <h1 className="gold-title">
          {blog.titulo}
        </h1>

        <p className="detalle-fecha">
          Publicado el {blog.fecha}
        </p>

      </header>

      {/* IMAGEN PRINCIPAL */}
      {blog.imagen && (
        <img
          src={blog.imagen}
          alt={blog.titulo}
          className="detalle-imagen"
        />
      )}

      {/* CONTENIDO DE LA PUBLICACIÓN */}
      <article
        className="detalle-contenido card content-box p-4"
        style={{ backgroundColor: "rgba(35, 35, 35, 0.85)" }}
      >

        {blog.descripcion && (
          <p className="detalle-descripcion">
            {blog.descripcion}
          </p>
        )}

        {Array.isArray(blog.contenido) &&
          blog.contenido.map((parrafo, index) => (
            <p key={index}>
              {parrafo}
            </p>
          ))
        }

        {/* VIDEO OPCIONAL */}
        {blog.video && (
          <section className="detalle-multimedia">

            <h2 className="gold-title">
              Video del tutorial
            </h2>

            <div className="ratio ratio-16x9">
              <iframe
                src={blog.video}
                title={`Video: ${blog.titulo}`}
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              />
            </div>

          </section>
        )}

        {/* INFOGRAFÍA OPCIONAL */}
        {blog.infografia && (
          <section className="detalle-multimedia">

            <h2 className="gold-title">
              Infografía
            </h2>

            <img
              src={blog.infografia}
              alt={`Infografía de ${blog.titulo}`}
              className="img-fluid rounded"
              loading="lazy"
            />

          </section>
        )}

      </article>

      {/* SECCIÓN DE COMENTARIOS */}
      <section
        className="detalle-comentarios card content-box p-4"
        style={{ backgroundColor: "rgba(35, 35, 35, 0.85)" }}
      >

        <h2 className="gold-title">
          Comentarios ({comentarios.length})
        </h2>

        {comentarios.length === 0 ? (
          <p className="detalle-sin-comentarios">
            Todavía no hay comentarios.
            ¡Sé el primero en participar!
          </p>
        ) : (
          <div className="detalle-lista-comentarios">

            {comentarios.map((comentario) => (
              <div
                key={comentario.id}
                className="detalle-comentario content-box"
              >

                <div className="detalle-comentario-info">
                  <strong>{comentario.nombre}</strong>
                  <small>{comentario.fecha}</small>
                </div>

                <p>{comentario.mensaje}</p>

              </div>
            ))}

          </div>
        )}

        {/* FORMULARIO DE COMENTARIOS */}
        <form
          onSubmit={publicarComentario}
          className="detalle-formulario content-box"
        >

          <h3 className="gold-title">
            Deja tu comentario
          </h3>

          <input
            type="text"
            placeholder="Tu nombre"
            aria-label="Tu nombre"
            maxLength={60}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <textarea
            placeholder="Escribe tu comentario..."
            aria-label="Escribe tu comentario"
            rows={4}
            maxLength={1000}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            required
          />

          {error && (
            <p role="alert" className="detalle-error">
              {error}
            </p>
          )}

          <button type="submit">
            Publicar comentario
          </button>

        </form>

      </section>

    </div>
  );
}
