export const Albunes = () => {
  const listaAlbunes = [
    {
      id: 1,
      titulo: "S.U.N.O",
      artista: "Pablo Chill-e",
      imagen: "/albunes/suno.jpg", // Asegúrate de que el nombre del archivo coincida en tu carpeta public/albunes
      enlaceYT: "https://www.youtube.com/watch?v=TqYkSMt_H6w&list=OLAK5uy_kAJWq69FKTHa6ZPkNYgubw688F3wmb_LY&index=2"
    },
    {
      id: 2,
      titulo: "Duende Verde",
      artista: "Pablo Chill-e",
      imagen: "/albunes/duende verde.jpg",
      enlaceYT: "https://www.youtube.com/playlist?list=OLAK5uy_lMB3kMPsPEkcgMNOLO5fHcSOxOuWfBFq0"
    },
    {
      id: 3,
      titulo: "Los Gángsters También Lloran",
      artista: "Pablo Chill-e",
      imagen: "/albunes/llora.jpg",
      enlaceYT: "https://www.youtube.com/watch?v=1XqKFBsyPZU&list=OLAK5uy_m4_q1yldKcZN2_k9L99Dv_LUnXdfq3GLo&index=2"
    }
  ];

  return (
    <div className="fondo-hero d-flex flex-column align-items-center justify-content-center text-center py-5 min-vh-100">
      <div className="container text-center pt-5 mt-4">
        <div className="py-4">
          <h1 className="gold-title display-4 fw-bold mb-2">Álbumes</h1>
          <p className="subtitle text-uppercase tracking-wider mb-4">TRABAJADOS POR THE REYES RECORDS</p>
          <hr className="divider mx-auto my-4" />
        </div>

        <div className="container text-center">
          <div className="row g-4 justify-content-center">
            {listaAlbunes.map((album) => (
              <div key={album.id} className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
                <div className="card text-white rr h-100 border-gold shadow-lg" style={{ width: '18rem' }}>
                  <div style={{ height: '260px', overflow: 'hidden' }} className="d-flex align-items-center justify-content-center bg-dark">
                    <img src={album.imagen} className="card-img-top" alt={album.titulo} style={{ height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title gold-title fw-bold">{album.titulo} <br /><span className="text-light fs-6">{album.artista}</span></h5>
                    <a target="_blank" rel="noopener noreferrer" href={album.enlaceYT} className="fs-3 icono-hover color-yt mt-auto text-danger">
                      <i className="bi bi-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};