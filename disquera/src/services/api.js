const API_URL = "http://localhost:8081/api"

async function peticion(ruta, opciones = {}) {
  let respuesta;

  try {
    respuesta = await fetch(`${API_URL}${ruta}`, {
      ...opciones,

      credentials: "include",

      headers: {
        "Content-Type": "application/json",
        ...opciones.headers,
      },
    });
  } catch {
    throw new Error(
      "No se pudo conectar con Spring Boot. Revisa que el backend esté funcionando en el puerto 8081."
    );
  }

  const texto = await respuesta.text();

  let datos = null;

  if (texto) {
    try {
      datos = JSON.parse(texto);
    } catch {
      datos = texto;
    }
  }

  if (!respuesta.ok) {
    const mensaje =
      typeof datos === "object" && datos !== null
        ? datos.mensaje ||
          datos.detalle ||
          datos.detail ||
          datos.message ||
          datos.error
        : datos;

    const error = new Error(
      mensaje || `Error HTTP ${respuesta.status}`
    );

    error.status = respuesta.status;

    throw error;
  }

  return datos;
}

export const obtenerProductosAPI = async () => {
  return peticion("/productos");
};

export const obtenerProductoPorIdAPI = async (id) => {
  return peticion(`/productos/${id}`);
};

export const loginAPI = async (credenciales) => {
  return peticion("/usuarios/login", {
    method: "POST",

    body: JSON.stringify({
      correo: credenciales.correo ?? credenciales.email,

      contrasena:
        credenciales.contrasena ?? credenciales.password,
    }),
  });
};

export const registrarClienteAPI = async (cliente) => {
  return peticion("/usuarios/registro", {
    method: "POST",

    body: JSON.stringify({
      nombre: cliente.nombre,
      apellido: cliente.apellido,

      correo: cliente.correo ?? cliente.email,

      contrasena:
        cliente.contrasena ?? cliente.password,

      telefono: cliente.telefono ?? "",
      direccion: cliente.direccion ?? "",
    }),
  });
};

export const crearPedidoAPI = async (ordenData) => {
  return peticion("/pedidos", {
    method: "POST",
    body: JSON.stringify(ordenData),
  });
};

export const obtenerMisComprasAPI = async () => {
  return peticion("/pedidos/mis-compras");
};


export const obtenerSesionAPI = async () => {
  try {
    return await peticion("/usuarios/sesion");
  } catch (error) {
    if (error.status === 401 || error.status === 403) {
      return null;
    }

    throw error;
  }
};

export const cerrarSesionAPI = async () => {
  return peticion("/usuarios/logout", {
    method: "POST",
  });
};

export const obtenerCsrfAPI = async () => {
  const datos = await peticion("/csrf");

  if (!datos?.token || !datos?.headerName) {
    throw new Error(
      "Spring Boot no entregó un token CSRF válido."
    );
  }

  return datos;
};

async function peticionAdmin(ruta, metodo, datos = null) {

  const csrf = await obtenerCsrfAPI();

  const opciones = {
    method: metodo,

    headers: {
      [csrf.headerName]: csrf.token,
    },
  };

  if (datos !== null) {
    opciones.body = JSON.stringify(datos);
  }

  return peticion(ruta, opciones);
}


export const crearProductoAPI = async (producto) => {
  return peticionAdmin(
    "/productos",
    "POST",
    producto
  );
};

export const actualizarProductoAPI = async (
  id,
  producto
) => {
  return peticionAdmin(
    `/productos/${id}`,
    "PUT",
    producto
  );
};
export const desactivarProductoAPI = async (id) => {
  return peticionAdmin(
    `/productos/${id}`,
    "DELETE"
  );
};
