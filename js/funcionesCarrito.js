import {
  guardarCarrito,
  obtenerCarrito,
  vaciarCarritoStorage,
} from "./storage.js";

import { actualizarContador, mostrarMensaje } from "./ui.js";

export const agregarAlCarrito = (producto) => {
  const carrito = obtenerCarrito();

  const productoExistente = carrito.find((item) => item.id === producto.id);

  if (productoExistente) {
    productoExistente.cantidad = (productoExistente.cantidad || 1) + 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito(carrito);
  actualizarContador(carrito);
  mostrarMensaje("Producto agregado 🐱​");
};

export const eliminarProducto = (indice) => {
  const carrito = obtenerCarrito();

  if (carrito[indice].cantidad > 1) {
    carrito[indice].cantidad -= 1;
    mostrarMensaje("Se eliminó una unidad del producto 📉");
  } else {
    carrito.splice(indice, 1);
    mostrarMensaje("Producto eliminado del carrito ✅");
  }

  guardarCarrito(carrito);
  actualizarContador(carrito);
};

export const vaciarCarrito = () => {
  vaciarCarritoStorage();
  actualizarContador([]);
  mostrarMensaje("Carrito vaciado ❎");
};
