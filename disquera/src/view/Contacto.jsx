import { useState } from 'react';

export const Contacto = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensajeTexto, setMensajeTexto] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulación de envío del mensaje de contacto
    setStatus({ texto: '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.', tipo: 'success' });
    console.log('Mensaje de contacto recibido:', { nombre, email, mensajeTexto });

    // Limpiar formulario opcionalmente
    setNombre('');
    setEmail('');
    setMensajeTexto('');
  };

  return (
    <main className="fondo-hero d-flex align-items-center justify-content-center min-vh-100 py-5">
      <div className="container-fluid px-lg-5 mt-5">

        <div className="row justify-content-center align-items-center g-5 px-lg-4">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card text-white border-0 shadow-lg p-4 p-md-5 rounded-4 rr text-center">

              <h2 className="text-warning fw-bold mb-3 gold-title" style={{ fontFamily: 'Cinzel, serif' }}>THE REYES RECORDS</h2>
              <p className="text-light opacity-75 mb-5">¿Listo para llevar tu música al siguiente nivel? Ponte en contacto con nuestro equipo de producción para reservar tu hora en estudio.</p>

              <h3 className="fw-bold mb-4 text-center gold-title">ENVÍANOS UN MENSAJE</h3>
              
              <form className="text-start" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label text-white fw-semibold mb-2">Nombre completo</label>
                  <input 
                    type="text" 
                    className="form-control bg-dark border-secondary py-2" 
                    id="nombre" 
                    placeholder="Ej: juan torres" 
                    required 
                    style={{ '--bs-bg-opacity': '.6', color: '#ffffff', fontWeight: '500' }}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-white fw-semibold mb-2">Correo electrónico</label>
                  <input 
                    type="email" 
                    className="form-control bg-dark border-secondary py-2" 
                    id="email" 
                    placeholder="Ej: tucorreo@ejemplo.cl" 
                    required 
                    style={{ '--bs-bg-opacity': '.6', color: '#ffffff', fontWeight: '500' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="mensaje" className="form-label text-white fw-semibold mb-2">Mensaje o Consulta</label>
                  <textarea 
                    className="form-control bg-dark border-secondary" 
                    id="mensaje" 
                    rows="4" 
                    placeholder="Ej: Hola, quiero cotizar la grabación de un EP de 4 canciones..." 
                    required 
                    style={{ '--bs-bg-opacity': '.6', color: '#ffffff', fontWeight: '500' }}
                    value={mensajeTexto}
                    onChange={(e) => setMensajeTexto(e.target.value)}
                  ></textarea>
                </div>

                {status && (
                  <div className={`alert alert-${status.tipo} py-2 mb-3`} role="alert">
                    {status.texto}
                  </div>
                )}

                <button type="submit" className="btn btn-warning w-100 fw-bold py-2 shadow-sm text-uppercase text-dark">Enviar Mensaje</button>
              </form>

            </div>
          </div>
        </div>

      </div>
    </main>
  );
};