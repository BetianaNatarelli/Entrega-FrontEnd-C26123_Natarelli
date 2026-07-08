import { obtenerCarrito } from "./storage.js";
import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";
const renderizarCarrito = () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  const contenedor = document.getElementById("contenedor-carrito");
  const divAcciones = document.getElementById("acciones-carrito");

  contenedor.innerHTML = "";
  divAcciones.innerHTML = "";

  if (!carrito.length) {
    const mensaje = document.createElement("p");
    mensaje.classList.add("mensaje-carrito-vacio");
    mensaje.textContent = "Tu carrito esta vacio 😿​​";

    contenedor.appendChild(mensaje);
    return;
  }

  let totalCarrito = 0;

  carrito.forEach((producto, index) => {
    const cantidad = producto.cantidad || 1;
    const subtotal = producto.precio * cantidad;
    totalCarrito += subtotal;

    const fila = document.createElement("article");
    fila.classList.add("item-lista-carrito");

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info-producto");

    infoDiv.innerHTML = `
      <h3 style="margin: 0 0 5px 0;">${producto.nombre}</h3>
      <p style="margin: 0;">Precio: $${producto.precio} | Cantidad: ${cantidad} | <b>Subtotal: $${subtotal}</b></p>
    `;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-eliminar-carrito");
    btnEliminar.textContent = "Eliminar";

    btnEliminar.addEventListener("click", () => {
      eliminarProducto(index);
      renderizarCarrito();
    });

    fila.appendChild(infoDiv);
    fila.appendChild(btnEliminar);

    contenedor.appendChild(fila);
  });

  const contenedorTotal = document.createElement("div");
  contenedorTotal.classList.add("total-carrito");
  contenedorTotal.innerHTML = `<h3>Total a pagar: $${totalCarrito}</h3>`;

  const btnVaciar = document.createElement("button");
  btnVaciar.classList.add("btn", "btn-vaciar-carrito");
  btnVaciar.textContent = "Vaciar carrito";

  btnVaciar.addEventListener("click", () => {
    vaciarCarrito();
    renderizarCarrito();
  });

  divAcciones.appendChild(contenedorTotal);
  divAcciones.appendChild(btnVaciar);
};

document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();
});
