import { Catalogo } from './modelo/catalogo.js';
import { iniciarNavegacion } from './controlador/controladorNavegacion.js';
import { iniciarDetalle } from './controlador/controladorDetalle.js';
import { iniciarCarrito } from './controlador/controladorCarrito.js';

const catalogo = new Catalogo();
try {
  await catalogo.cargar();
  iniciarCarrito(catalogo);
  iniciarDetalle(catalogo);
  await iniciarNavegacion(catalogo);
} catch (error) {
  console.error(error);
  document.getElementById('vista').textContent =
    'No se pudieron cargar los datos. Abre el sitio con un servidor local (ver README).';
}
