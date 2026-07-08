export const actualizarContador = (carrito) => {
  const contador = document.getElementById("contador-carrito");

  if (contador) {
    const totalUnidades = carrito.reduce((acumulador, producto) => {
      return acumulador + (producto.cantidad || 1);
    }, 0);

    contador.textContent = totalUnidades;
  }
};

export const mostrarMensaje = (texto) => {
  alert(texto);
};
