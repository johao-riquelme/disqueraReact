import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { loginAPI } from '../services/api.js';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState(null);
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();
  const { loginUsuario } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setCargando(true);

    try {
      // Comprobar correo y contraseña en Spring Boot
      const usuario = await loginAPI({
        correo: email.trim(),
        contrasena: password
      });

      // Actualizar los datos del usuario en React
      loginUsuario(usuario);

      setMensaje({
        texto: '¡Inicio de sesión exitoso!',
        tipo: 'success'
      });

      // Redirigir según el rol recibido del backend
      if (usuario.rol === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }

    } catch (error) {
      setMensaje({
        texto: error.message || 'Correo o contraseña incorrectos',
        tipo: 'danger'
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="fondo-hero d-flex align-items-center justify-content-center text-center py-5 min-vh-100">
      <div className="container pt-5 my-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5">
            <div className="card rr text-light border-gold p-4 shadow-lg">
              <div className="card-body">
                <h2 className="gold-title fw-bold mb-3">Iniciar Sesión</h2>
                <p className="subtitle mb-4">Accede a tu cuenta de The Reyes Records</p>
                
                <form onSubmit={handleLogin}>
                  <div className="mb-3 text-start">
                    <label htmlFor="emailLogin" className="form-label text-warning">Correo Electrónico</label>
                    <input 
                      type="email" 
                      className="form-control bg-dark text-light border-secondary" 
                      id="emailLogin" 
                      placeholder="tu@correo.com (o admin@...) " 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-4 text-start">
                    <label htmlFor="passLogin" className="form-label text-warning">Contraseña</label>
                    <input 
                      type="password" 
                      className="form-control bg-dark text-light border-secondary" 
                      id="passLogin" 
                      placeholder="••••••••" 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                    {cargando ? 'INGRESANDO...' : 'INGRESAR'}
                  </button>
                </form>

                <p className="mb-0 text-light small">
                  ¿No tienes cuenta? <Link to="/registro" className="text-warning fw-bold text-decoration-none">Regístrate aquí</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
