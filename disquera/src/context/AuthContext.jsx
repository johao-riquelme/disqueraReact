import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const loginUsuario = (datosUsuario) => {
    setUsuario(datosUsuario);
  };

  const logoutUsuario = () => {
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        isLogged: !!usuario,
        isAdmin: usuario?.role === 'admin' || usuario?.rol === 'admin',
        loginUsuario,
        logoutUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};