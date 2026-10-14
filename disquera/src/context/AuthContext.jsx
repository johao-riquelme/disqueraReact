import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import {
  obtenerSesionAPI,
  cerrarSesionAPI
} from '../services/api.js';
const AuthContext = createContext();
export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth debe ser utilizado dentro de un AuthProvider'
    );
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargandoSesion, setCargandoSesion] = useState(true);
  const [cerrandoSesion, setCerrandoSesion] = useState(false);
  const revisionSesion = useRef(0);

  useEffect(() => {

    let activo = true;

    const revisionActual = ++revisionSesion.current;

    const recuperarSesion = async () => {

      try {

        const datosUsuario = await obtenerSesionAPI();

        if (
          activo &&
          revisionActual === revisionSesion.current
        ) {
          setUsuario(datosUsuario || null);
        }

      } catch (error) {

        console.error(
          'No se pudo recuperar la sesion:',
          error.message
        );

        if (
          activo &&
          revisionActual === revisionSesion.current
        ) {
          setUsuario(null);
        }

      } finally {

        if (
          activo &&
          revisionActual === revisionSesion.current
        ) {
          setCargandoSesion(false);
        }

      }

    };

    recuperarSesion();

    return () => {
      activo = false;
    };

  }, []);

  const loginUsuario = (datosUsuario) => {
    revisionSesion.current += 1;

    setUsuario(datosUsuario);

    setCargandoSesion(false);

  };
  const logoutUsuario = async () => {

    if (cerrandoSesion) {
      return;
    }

    setCerrandoSesion(true);

    try {
      await cerrarSesionAPI();

      revisionSesion.current += 1;
      setUsuario(null);

      setCargandoSesion(false);

    } catch (error) {

      console.error(
        'Error al cerrar sesion:',
        error.message
      );
      throw error;

    } finally {

      setCerrandoSesion(false);

    }

  };
  const isLogged = !!usuario;

  const isAdmin =
    usuario?.role === 'admin' ||
    usuario?.rol === 'admin';
  return (

    <AuthContext.Provider
      value={{

        usuario,

        isLogged,

        isAdmin,

        cargandoSesion,

        cerrandoSesion,

        loginUsuario,

        logoutUsuario

      }}
    >

      {children}

    </AuthContext.Provider>
  );
};
