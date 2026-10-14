import { AdminSidebar } from '../components/AdminSidebar';

export const AdminHome = () => {
  return (
    <div className="container-fluid bg-dark text-light min-vh-100">
      <div className="row">
        <AdminSidebar />

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
          <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom border-secondary">
            <h1 className="h3 gold-title fw-bold m-0">¡Bienvenido, Administrador!</h1>
            <span className="badge bg-outline-warning border border-warning text-warning px-3 py-2 rounded-pill">
              <i className="bi bi-person-circle me-1"></i> Admin Online
            </span>
          </div>

          {/* TARJETAS RESUMEN (KPIs) */}
          <div className="row g-4 mb-5">
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card bg-black text-light border-secondary shadow-sm rounded-4">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div>
                    <span className="text-muted fs-7">Ventas Totales</span>
                    <h3 className="gold-title fw-bold m-0">$12,450 USD</h3>
                  </div>
                  <div className="p-3 bg-warning bg-opacity-10 rounded-circle text-warning fs-3">
                    <i className="bi bi-currency-dollar"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card bg-black text-light border-secondary shadow-sm rounded-4">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div>
                    <span className="text-muted fs-7">Productos</span>
                    <h3 className="gold-title fw-bold m-0">24</h3>
                  </div>
                  <div className="p-3 bg-info bg-opacity-10 rounded-circle text-info fs-3">
                    <i className="bi bi-box-seam"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card bg-black text-light border-secondary shadow-sm rounded-4">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div>
                    <span className="text-muted fs-7">Usuarios</span>
                    <h3 className="gold-title fw-bold m-0">158</h3>
                  </div>
                  <div className="p-3 bg-success bg-opacity-10 rounded-circle text-success fs-3">
                    <i className="bi bi-people"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card bg-black text-light border-secondary shadow-sm rounded-4">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div>
                    <span className="text-muted fs-7">Órdenes Pendientes</span>
                    <h3 className="gold-title fw-bold m-0">5</h3>
                  </div>
                  <div className="p-3 bg-danger bg-opacity-10 rounded-circle text-danger fs-3">
                    <i className="bi bi-clock-history"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 bg-black rounded-4 border border-secondary text-center shadow">
            <i className="bi bi-music-note-beamed text-warning display-3 mb-3 d-block"></i>
            <h3 className="gold-title fw-bold">Panel de Control The Reyes Records</h3>
            <p className="text-muted max-w-md mx-auto">
              Gestiona el catálogo de productos, revisa las métricas de usuarios y mantén actualizado tu eCommerce desde este panel centralizado.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};