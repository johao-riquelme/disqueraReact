import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="footer-reyes py-5 border-top border-secondary">
      <div className="container">
        <div className="row g-4 justify-content-center text-start">
          <div className="col-12 col-md-3">
            <h5 className="gold-title fw-bold mb-3">Sobre Nosotros</h5>
            <ul className="list-unstyled footer-links">
              <li className="mb-2"><Link to="/" className="text-light text-decoration-none">Nuestra Historia</Link></li>
              <li className="mb-2"><Link to="/servicios" className="text-light text-decoration-none">Servicios de Estudio</Link></li>
              <li className="mb-2"><Link to="/albunes" className="text-light text-decoration-none">Álbumes Liderados</Link></li>
            </ul>
          </div>

          <div className="col-12 col-md-2">
            <h5 className="gold-title fw-bold mb-3">Legal</h5>
            <ul className="list-unstyled footer-links">
              <li className="mb-2"><a href="https://digital.gob.cl/biblioteca/regulacion/ley-n-17336-de-propiedad-intelectual-derecho-de-autor/" target="_blank" rel="noreferrer" className="text-light text-decoration-none icono-hover">Derechos y Regalías</a></li>
              <li className="mb-2"><a href="https://sympathyforthelawyer.com/blog/contrato-discografico-aspectos-legales/" target="_blank" rel="noreferrer" className="text-light text-decoration-none icono-hover">Términos del Servicio</a></li>
              <li className="mb-2"><a href="https://www.sonymusic.com/privacy-policy/" target="_blank" rel="noreferrer" className="text-light text-decoration-none icono-hover">Políticas de Privacidad</a></li>
            </ul>
          </div>
          
          <div className="col-12 col-md-3">
            <h5 className="gold-title fw-bold mb-3">Contacto</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="https://maps.app.goo.gl/TSLvBQLCFAS3KNdf9" target="_blank" rel="noreferrer" className="text-light text-decoration-none icono-hover">
                  <i className="bi bi-geo-alt-fill text-warning me-2"></i> Santiago, Chile
                </a>
              </li>
              <li className="mb-2">
                <a href="mailto:joh.riquelme@duocuc.cl" className="text-light text-decoration-none icono-hover">
                  <i className="bi bi-envelope-fill text-warning me-2"></i> contacto@thereyesrecords.cl
                </a>
              </li>
              <li className="mb-2">
                <a href="https://wa.me/56957019068" target="_blank" rel="noreferrer" className="text-light text-decoration-none icono-hover">
                  <i className="bi bi-telephone-fill text-warning me-2"></i> +56 9 5701 9068
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="text-center text-secondary small">
          <p className="mb-0">&copy; 2026 The Reyes Records. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};