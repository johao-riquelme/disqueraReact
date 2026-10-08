
export const blogs = [
  {
    id: 1,
    titulo: "Se vienen nuevos lanzamientos",
    categoria: "Noticias",
    fecha: "08 de octubre de 2026",
    imagen: "/blog/lanzamientos.jpg",
    descripcion:
      "Descubre los próximos proyectos musicales de The Reyes Records.",
    contenido: [
      "En The Reyes Records estamos preparando nuevos proyectos musicales para nuestra comunidad.",
      "Muy pronto compartiremos información sobre lanzamientos, artistas y novedades de nuestra disquera."
    ],
    video: "",
    infografia: ""
  },
  {
    id: 2,
    titulo: "Mejoras en nuestros estudios de grabación",
    categoria: "Estudios",
    fecha: "06 de octubre de 2026",
    imagen: "/blog/estudio.jpg",
    descripcion:
      "Conoce las novedades y mejoras que estamos preparando en nuestros estudios.",
    contenido: [
      "En The Reyes Records buscamos entregar una experiencia de calidad a nuestros artistas.",
      "Estamos trabajando en mejoras para nuestros espacios y equipos de grabación."
    ],
    video: "",
    infografia: ""
  },
  {
    id: 3,
    titulo: "Cómo grabar tu primera canción desde casa",
    categoria: "Tutoriales",
    fecha: "04 de octubre de 2026",
    imagen: "/blog/tutorial.jpg",
    descripcion:
      "Aprende los pasos básicos para comenzar a grabar música desde casa.",
    contenido: [
      "Para comenzar necesitas un micrófono, audífonos y un programa de grabación.",
      "Busca un lugar tranquilo para grabar y realiza pruebas antes de comenzar.",
      "Cuando termines, escucha tu grabación y realiza los ajustes necesarios."
    ],
    video: "",
    infografia: ""
  },
  {
    id: 4,
    titulo: "Guía básica de producción musical",
    categoria: "Guías",
    fecha: "02 de octubre de 2026",
    imagen: "/blog/produccion.jpg",
    descripcion:
      "Conoce las herramientas esenciales para comenzar a producir música.",
    contenido: [
      "La producción musical incluye diferentes etapas como grabación, edición, mezcla y masterización.",
      "Para comenzar puedes utilizar un computador, audífonos y un programa de producción musical."
    ],
    video: "",
    infografia: ""
  }
];

export const obtenerBlogs = () => blogs;

export const obtenerBlogPorId = (id) =>
  blogs.find((blog) => blog.id === Number(id));
