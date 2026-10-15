import React, {
  createContext,
  useContext,
  useState
} from 'react';

const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);

  if (!context) {
    throw new Error(
      'useCarrito debe ser utilizado dentro de un CarritoProvider'
    );
  }

  return context;
}

const obtenerTipoArticulo = (articulo) => {
  return articulo.tipo === 'plan'
    ? 'plan'
    : 'producto';
};
const crearClaveCarrito = (id, tipo = 'producto') => {
  return `${tipo}-${id}`;
};
export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const agregarAlCarrito = (articulo, cantidad = 1) => {

    if (!articulo || articulo.id == null) {
      return;
    }
    const cantidadAgregar = Number(cantidad);
    if (
      !Number.isInteger(cantidadAgregar) ||
      cantidadAgregar <= 0
    ) {
      return;
    }
    const tipo = obtenerTipoArticulo(articulo);
    const claveCarrito = crearClaveCarrito(
      articulo.id,
      tipo
    );
    setCarrito((prev) => {
      const existeIndex = prev.findIndex(
        (item) => item.claveCarrito === claveCarrito
      );
      if (existeIndex !== -1) {
        return prev.map((item, index) => {

          if (index === existeIndex) {
            return {
              ...item,
              cantidad: item.cantidad + cantidadAgregar
            };
          }

          return item;

        });

      }

      return [
        ...prev,
        {
          ...articulo,
          tipo,
          claveCarrito,
          cantidad: cantidadAgregar
        }
      ];

    });

  };

  const eliminarDelCarrito = (
    id,
    tipo = 'producto'
  ) => {
    const claveCarrito = crearClaveCarrito(id, tipo);
    setCarrito((prev) =>
      prev.filter(
        (item) => item.claveCarrito !== claveCarrito
      )
    );

  };
  const actualizarCantidad = (
    id,
    nuevaCantidad,
    tipo = 'producto'
  ) => {
    const cantidad = Number(nuevaCantidad);
    if (!Number.isInteger(cantidad)) {
      return;
    }
    if (cantidad <= 0) {
      eliminarDelCarrito(id, tipo);
      return;
    }
    const claveCarrito = crearClaveCarrito(id, tipo);
    setCarrito((prev) =>
      prev.map((item) =>
        item.claveCarrito === claveCarrito
          ? {
              ...item,
              cantidad
            }
          : item
      )
    );

  };
  const vaciarCarrito = () => {
    setCarrito([]);
  };
  const obtenerTotalPrecio = () => {

    return carrito.reduce(
      (total, item) =>
        total + Number(item.precio) * item.cantidad,
      0
    );

  };
  const obtenerTotalItems = () => {
    return carrito.reduce(
      (total, item) => total + item.cantidad,
      0
    );

  };
  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        actualizarCantidad,
        vaciarCarrito,
        obtenerTotalPrecio,
        obtenerTotalItems
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
