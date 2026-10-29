import { formatoPrecio } from '../utilidades/formatoPrecio.js';
import { urlConsulta } from '../utilidades/whatsapp.js';

const ETIQUETAS = { salida: 'Salida', corazon: 'Corazón', fondo: 'Fondo', acordes: 'Notas y acordes' };
const $ = (id) => document.getElementById(id);

export function mostrarDetalle(p) {
  $('detalle-img').src = p.imagen;
  $('detalle-img').alt = p.nombre;
  $('detalle-marca').textContent = `${p.marca} · ${p.coleccion}`;
  $('detalle-nombre').textContent = p.nombre;
  $('detalle-precio').textContent = formatoPrecio(p.precio);
  $('detalle-desc').textContent = p.descripcion ?? '';
  $('detalle-desc2').textContent = p.descripcionDetallada ?? '';
  $('detalle-nota-fuente').textContent = p.notas
    ? 'Notas contrastadas con fuentes especializadas y tiendas (no con el fabricante). Ver datos/fuentes-descripciones.md.'
    : 'Descripción del catálogo de Herrera Perfumes; las notas olfativas aún no se han verificado con el fabricante.';
  $('detalle-wa').href = urlConsulta(p);
  const dl = $('detalle-notas');
  dl.replaceChildren();
  for (const [clave, etiqueta] of Object.entries(ETIQUETAS)) {
    if (!p.notas?.[clave]) continue;
    const dt = document.createElement('dt'); dt.textContent = etiqueta;
    const dd = document.createElement('dd'); dd.textContent = p.notas[clave];
    dl.append(dt, dd);
  }
  $('detalle').showModal();
}
