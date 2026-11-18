import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext.jsx';
import { loginAPI, loginConGoogleAPI } from '../services/api.js';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState(null);
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();
  const { loginUsuario } = useAuth();

  // Login tradicional con correo y contraseña
  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setCargando(true);

    try {
      const usuario = await loginAPI({
        correo: email.trim(),
        contrasena: password
      });

      loginUsuario(usuario);

      setMensaje({
        texto: '¡Inicio de sesión exitoso!',
        tipo: 'success'
      });

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

  // Login federado con Google OAuth
  const handleGoogleSuccess = async (credentialResponse) => {
    setMensaje(null);
    setCargando(true);

    try {
      const usuario = await loginConGoogleAPI(credentialResponse.credential);
      loginUsuario(usuario);

      setMensaje({
        texto: '¡Inicio de sesión con Google exitoso!',
        tipo: 'success'
      });

      if (usuario.rol === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      setMensaje({
        texto: error.message || 'Error al autenticar con Google.',
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
                
                {mensaje && (
                  <div className={`alert alert-${mensaje.tipo} py-2 mb-3`} role="alert">
                    {mensaje.texto}
                  </div>
                )}

                <form onSubmit={handleLogin}>
                  <div className="mb-3 text-start">
                    <label htmlFor="emailLogin" className="form-label text-warning">Correo Electrónico</label>
                    <input 
                      type="email" 
                      className="form-control bg-dark text-light border-secondary" 
                      id="emailLogin" 
                      placeholder="tu@correo.com (o admin@...)" 
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

                  <button
                    type="submit"
                    className="btn btn-warning w-100 fw-bold py-2 mb-3 text-dark"
                    disabled={cargando}
                  >
                    {cargando ? 'INGRESANDO...' : 'INGRESAR'}
                  </button>
                </form>

                {/* Separador visual */}
                <div className="my-3 d-flex align-items-center justify-content-center">
                  <hr className="w-100 border-secondary me-2" />
                  <span className="text-light small text-nowrap">O continúa con</span>
                  <hr className="w-100 border-secondary ms-2" />
                </div>

                {/* Botón oficial de Google OAuth */}
                <div className="d-flex justify-content-center mb-4">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() =>
                      setMensaje({
                        texto: 'Error al conectar con la cuenta de Google.',
                        tipo: 'danger'
                      })
                    }
                    theme="filled_black"
                    shape="pill"
                    text="signin_with"
                  />
                </div>

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