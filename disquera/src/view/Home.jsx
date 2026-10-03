export const Home = () => {
  return (
    <div className="fondo-hero d-flex flex-column align-items-center justify-content-center text-center py-5">
      <div className="container pt-5">
        
        <div className="py-4">
          <h1 className="gold-title display-3 fw-bold mb-2">THE REYES RECORDS</h1>
          <p className="subtitle text-uppercase tracking-wider mb-4">DISQUERA Y DISTRIBUIDORA</p>
          <hr className="divider mx-auto my-4" />
        </div>

        <div className="row justify-content-center mb-5">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="card rr text-light border-gold p-4 shadow-lg">
              <p className="fs-5 mb-0 leading-relaxed">
                The Reyes Records. Unimos por la lealtad, el estilo y la fuerza musical con producciones de nivel profesional. Contamos con variedad de servicios tanto como disquera como distribuidora oficial reconocida tanto a nivel nacional como a nivel internacional.
              </p>
            </div>
          </div>
        </div>

        <div className="row g-4 justify-content-center">
          <div className="col-12 col-md-4">
            <div className="card rr text-light border-gold p-4 text-center h-100">
              <h2 className="gold-title display-4 fw-bold mb-2">+200</h2>
              <p className="subtitle text-uppercase fw-bold mb-0">ARTISTAS FORMADOS</p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card rr text-light border-gold p-4 text-center h-100">
              <h2 className="gold-title display-4 fw-bold mb-2">+150</h2>
              <p className="subtitle text-uppercase fw-bold mb-0">PLATAFORMAS MUSICALES</p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card rr text-light border-gold p-4 text-center h-100">
              <h2 className="gold-title display-4 fw-bold mb-2">100%</h2>
              <p className="subtitle text-uppercase fw-bold mb-0">DERECHOS Y REGALÍAS</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};