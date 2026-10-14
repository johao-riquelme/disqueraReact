// Arreglo inicial de usuarios de prueba en memoria
let usuarios = [
  {
    id: 1,
    nombre: 'Admin',
    apellido: 'Reyes',
    email: 'admin@reyes.cl',
    password: 'admin123',
    role: 'admin',
    direccion: 'Av. Vicuña Mackenna 4686',
    comuna: 'Macul',
    region: 'Región Metropolitana'
  },
  {
    id: 2,
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan@gmail.com',
    password: 'user123',
    role: 'cliente',
    direccion: 'Av. Providencia 1234',
    comuna: 'Providencia',
    region: 'Región Metropolitana'
  }
];

export const obtenerUsuarios = () => {
  return [...usuarios];
};

export const registrarUsuario = (nuevoUsuario) => {
  // Verificar si el correo ya existe en memoria
  const existe = usuarios.some(
    (u) => u.email.toLowerCase() === nuevoUsuario.email.toLowerCase()
  );
  if (existe) {
    throw new Error('El correo electrónico ya se encuentra registrado.');
  }

  const usuarioCreado = {
    id: Date.now(),
    role: nuevoUsuario.email.toLowerCase().includes('admin') ? 'admin' : 'cliente',
    ...nuevoUsuario
  };

  usuarios.push(usuarioCreado);
  return usuarioCreado;
};

export const autenticarUsuario = (email, password) => {
  const usuario = usuarios.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  return usuario || null;
};