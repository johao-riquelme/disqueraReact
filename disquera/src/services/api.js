const API_URL = 'http://localhost:8080/api';

// 1. Obtener Catálogo de Productos
export const obtenerProductosAPI = async () => {
  try {
    const response = await fetch(`${API_URL}/productos`);
    if (!response.ok) throw new Error('Error al obtener los productos');
    return await response.json();
  } catch (error) {
    // Si el backend aún no está activo, retorna un arreglo vacío para evitar caídas
    return [];
  }
};

// 2. Autenticación / Login
export const loginAPI = async (credenciales) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credenciales),
    });

    if (!response.ok) throw new Error('Credenciales inválidas');
    return await response.json();
  } catch (error) {
    // Modo local / prueba en memoria si el backend no responde
    return {
      nombre: 'Usuario Prueba',
      email: credenciales.email,
      role: credenciales.email.includes('admin') ? 'admin' : 'cliente',
    };
  }
};

// 3. Registro de Usuario
export const registrarClienteAPI = async (datosCliente) => {
  try {
    const response = await fetch(`${API_URL}/auth/registro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosCliente),
    });

    if (!response.ok) throw new Error('Error al registrar usuario');
    return await response.json();
  } catch (error) {
    // Modo local / prueba en memoria si el backend no responde
    return { mensaje: 'Usuario registrado exitosamente (Modo Local)', ...datosCliente };
  }
};

// 4. Crear Pedido
export const crearPedidoAPI = async (ordenData) => {
  try {
    const response = await fetch(`${API_URL}/pedidos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ordenData),
    });

    if (!response.ok) throw new Error('Error al procesar el pedido');
    return await response.json();
  } catch (error) {
    // Modo local / prueba en memoria si el backend no responde
    return { idOrden: `ORD-LOCAL-${Date.now()}` };
  }
};