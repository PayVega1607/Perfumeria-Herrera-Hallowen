import { mostrarDetalle } from '../vista/vistaDetalle.js';

// Al pulsar la foto o el nombre de una tarjeta se abre su detalle (las tarjetas no cambian).
export function iniciarDetalle(catalogo) {
  document.getElementById('vista').addEventListener('click', (e) => {
    const tarjeta = e.target.closest('.tarjeta-foto, .tarjeta-nombre')?.closest('.tarjeta');
    const id = tarjeta?.querySelector('button[data-id]')?.dataset.id;
    if (id) mostrarDetalle(catalogo.porId(id));
  });
  const dlg = document.getElementById('detalle');
  document.getElementById('cerrar-detalle').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); }); // clic fuera
}
