import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext.jsx';
import { confirmarPagoWebpayAPI } from '../services/api.js';

export const WebpayRetorno = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { vaciarCarrito } = useCarrito();

  const [mensajeError, setMensajeError] = useState(null);
  const procesadoRef = useRef(false);

  useEffect(() => {
    if (procesadoRef.current) return;
    procesadoRef.current = true;

    const tokenWs = searchParams.get('token_ws');
    const tbkToken = searchParams.get('TBK_TOKEN');

    const validarTransaccion = async () => {
      try {
        const resultado = await confirmarPagoWebpayAPI({
          token_ws: tokenWs,
          TBK_TOKEN: tbkToken,
        });

        if (resultado.aprobado) {
          const clienteGuardado = JSON.parse(
            sessionStorage.getItem('clienteWebpay') || '{}'
          );
          sessionStorage.removeItem('clienteWebpay');

          const ordenConfirmada = {
            idOrden: resultado.idOrden,
            fecha: new Date().toLocaleDateString('es-CL'),
            cliente: clienteGuardado,
            total: Number(resultado.total),
            estado: resultado.estado,
            medioPago: resultado.medioPago || 'Webpay Plus',
            codigoAutorizacion: resultado.codigoAutorizacion,
          };

          vaciarCarrito();

          navigate('/pago-exitoso', {
            state: { orden: ordenConfirmada },
            replace: true,
          });
        } else {
          setMensajeError(
            resultado.mensaje || 'El pago no fue aprobado o fue anulado.'
          );
        }
      } catch (err) {
        setMensajeError(
          err.message || 'Ocurrió un error al verificar el pago con Transbank.'
        );
      }
    };

    validarTransaccion();
  }, [searchParams, navigate, vaciarCarrito]);

  return (
    <main className="fondo-hero min-vh-100 py-5 text-light d-flex align-items-center justify-content-center">
      <div className="container text-center pt-5">
        {!mensajeError ? (
          <div className="rr border-gold p-5 rounded-4 shadow-lg mx-auto" style={{ maxWidth: '500px' }}>
            <div className="spinner-border text-warning mb-3" role="status" />
            <h3 className="gold-title">Confirmando pago con Transbank...</h3>
            <p className="text-muted mb-0">
              Por favor no cierres ni recargues esta ventana.
            </p>
          </div>
        ) : (
          <div className="rr border-gold p-5 rounded-4 shadow-lg mx-auto" style={{ maxWidth: '550px' }}>
            <h3 className="text-danger fw-bold mb-3">Pago no completado</h3>
            <p className="text-light mb-4">{mensajeError}</p>
            <Link to="/checkout" className="btn btn-warning fw-bold text-dark">
              Volver al Checkout
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};