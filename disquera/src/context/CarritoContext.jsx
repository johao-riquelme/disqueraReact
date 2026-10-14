import React, { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser utilizado dentro de un CarritoProvider');
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  // Inicialización directa en memoria (sin localStorage)
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito((prev) => {
      const existeIndex = prev.findIndex((item) => item.id === producto.id);
      if (existeIndex !== -1) {
        const nuevo = [...prev];
        nuevo[existeIndex].cantidad += cantidad;
        return nuevo;
      }
      return [...prev, { ...producto, cantidad }];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(id);
      return;
    }
    setCarrito((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cantidad: nuevaCantidad } : item))
    );
  };

  const vaciarCarrito = () => setCarrito([]);

  const obtenerTotalPrecio = () =>
    carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  const obtenerTotalItems = () =>
    carrito.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        actualizarCantidad,
        vaciarCarrito,
        obtenerTotalPrecio,
        obtenerTotalItems,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};