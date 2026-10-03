import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulación: Si el correo incluye "admin", se le asigna el rol de administrador
    const esAdmin = email.toLowerCase().includes('admin');

    const usuarioLogueado = {
      email,
      role: esAdmin ? 'admin' : 'user'
    };

    // Guardamos en el almacenamiento local del navegador
    localStorage.setItem('user', JSON.stringify(usuarioLogueado));

    setMensaje({ texto: '¡Inicio de sesión exitoso!', tipo: 'success' });

    // Redirigir según el rol o al home
    setTimeout(() => {
      if (esAdmin) {
        navigate('/admin'); // Redirigirá al panel de administración
      } else {
        navigate('/'); // Redirigirá al home normal
      }
      window.location.reload(); // Recarga para actualizar el Navbar
    }, 1000);
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

                  <button type="submit" className="btn btn-warning w-100 fw-bold py-2 mb-3 text-dark">INGRESAR</button>
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