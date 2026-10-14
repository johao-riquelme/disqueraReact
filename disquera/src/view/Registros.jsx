import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { registrarClienteAPI } from '../services/api.js';

export const Registro = () => {
  const navigate = useNavigate();
  const { loginUsuario } = useAuth(); // Contexto de sesión en memoria

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mensaje, setMensaje] = useState(null);
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    
    if (password !== confirmPassword) {
      setMensaje({ texto: 'Las contraseñas no coinciden', tipo: 'danger' });
      return;
    }

    setCargando(true);

    try {
      // 1. Enviamos el registro directamente a la base de datos / backend
      const nuevoCliente = await registrarClienteAPI({
        nombre,
        email,
        password,
      });

      // 2. Iniciamos sesión en la memoria de la app
      loginUsuario(nuevoCliente);

      setMensaje({ texto: '¡Cuenta registrada con éxito!', tipo: 'success' });

      // 3. Redirigimos a la tienda de productos
      setTimeout(() => {
        navigate('/productos');
      }, 1000);

    } catch (error) {
      setMensaje({
        texto: error.message || 'Error al conectar con la base de datos.',
        tipo: 'danger',
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="fondo-hero d-flex align-items-center justify-content-center text-center py-5">
      <div className="container pt-5 my-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5">
            <div className="card rr text-light border-gold p-4 shadow-lg">
              <div className="card-body">
                <h2 className="gold-title fw-bold mb-3">Crear Cuenta</h2>
                <p className="subtitle mb-4">Únete a la familia de The Reyes Records</p>
                
                <form id="form-registro" onSubmit={handleSubmit}>
                  <div className="mb-3 text-start">
                    <label htmlFor="nombreRegistro" className="form-label text-warning">
                      Nombre / Nombre Artístico
                    </label>
                    <input 
                      type="text" 
                      className="form-control bg-dark text-light border-secondary" 
                      id="nombreRegistro" 
                      placeholder="Ej: Pablo Chill-E" 
                      required 
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>

                  <div className="mb-3 text-start">
                    <label htmlFor="emailRegistro" className="form-label text-warning">
                      Correo Electrónico
                    </label>
                    <input 
                      type="email" 
                      className="form-control bg-dark text-light border-secondary" 
                      id="emailRegistro" 
                      placeholder="tu@correo.com" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-3 text-start">
                    <label htmlFor="passRegistro" className="form-label text-warning">
                      Contraseña
                    </label>
                    <input 
                      type="password" 
                      className="form-control bg-dark text-light border-secondary" 
                      id="passRegistro" 
                      placeholder="••••••••" 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="mb-4 text-start">
                    <label htmlFor="confirmPassRegistro" className="form-label text-warning">
                      Confirmar Contraseña
                    </label>
                    <input 
                      type="password" 
                      className="form-control bg-dark text-light border-secondary" 
                      id="confirmPassRegistro" 
                      placeholder="••••••••" 
                      required 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  {mensaje && (
                    <div className={`alert alert-${mensaje.tipo} py-2 mb-3`} role="alert">
                      {mensaje.texto}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="btn btn-warning w-100 fw-bold py-2 mb-3 text-dark"
                    disabled={cargando}
                  >
                    {cargando ? 'REGISTRANDO EN BD...' : 'REGISTRARSE'}
                  </button>
                </form>

                <p className="mb-0 text-light small">
                  ¿Ya tienes cuenta?{' '}
                  <Link to="/login" className="text-warning fw-bold text-decoration-none">
                    Inicia sesión
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};